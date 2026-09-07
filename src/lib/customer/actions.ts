"use server"
import { cookies } from "next/headers"
import { createMedusaClient } from "@/lib/medusa/client"
import { loginCustomerSchema, registerCustomerSchema } from "./schema"

/**
 * Session token cookie for the Medusa customer identity. This is the same
 * identity mechanism nabhold/zuribeans reuses as its supplier applicant
 * login (see thamani docs/adr/0003-customer-identity-for-supplier-onboarding.md) —
 * not a bespoke auth system. httpOnly/secure/sameSite, matching the
 * thamani_cart_id cookie convention in src/lib/medusa/cart.ts.
 */
const CUSTOMER_TOKEN_COOKIE = "thamani_customer_token"

const setCustomerTokenCookie = async (token: string) => {
  const jar = await cookies()
  jar.set(CUSTOMER_TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
}

export async function registerCustomer(formData: FormData) {
  const value = registerCustomerSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  })
  const sdk = createMedusaClient()

  const registrationToken = await sdk.auth.register("customer", "emailpass", {
    email: value.email,
    password: value.password,
  })
  if (typeof registrationToken !== "string") {
    throw new Error("Baobab Trade returned an unexpected registration response")
  }

  const { customer } = await sdk.store.customer.create(
    { email: value.email, first_name: value.firstName, last_name: value.lastName },
    {},
    { Authorization: `Bearer ${registrationToken}` },
  )

  const sessionToken = await sdk.auth.login("customer", "emailpass", {
    email: value.email,
    password: value.password,
  })
  if (typeof sessionToken !== "string") {
    throw new Error("Baobab Trade returned an unexpected login response")
  }
  await setCustomerTokenCookie(sessionToken)

  return { id: customer.id, email: customer.email }
}

export async function loginCustomer(formData: FormData) {
  const value = loginCustomerSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  })
  const sdk = createMedusaClient()

  const sessionToken = await sdk.auth.login("customer", "emailpass", {
    email: value.email,
    password: value.password,
  })
  if (typeof sessionToken !== "string") {
    throw new Error("Baobab Trade returned an unexpected login response")
  }
  await setCustomerTokenCookie(sessionToken)

  const { customer } = await sdk.store.customer.retrieve(
    {},
    { Authorization: `Bearer ${sessionToken}` },
  )
  return { id: customer.id, email: customer.email }
}

export async function logoutCustomer() {
  const jar = await cookies()
  jar.delete(CUSTOMER_TOKEN_COOKIE)
}

export async function getCurrentCustomer() {
  const token = (await cookies()).get(CUSTOMER_TOKEN_COOKIE)?.value
  if (!token) return null
  try {
    const { customer } = await createMedusaClient().store.customer.retrieve(
      {},
      { Authorization: `Bearer ${token}` },
    )
    return customer
  } catch {
    return null
  }
}
