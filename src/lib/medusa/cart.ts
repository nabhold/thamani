"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createMedusaClient } from "./client"
const input = z.object({
  variantId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(20),
})
export async function addToCart(formData: FormData) {
  const value = input.parse({
    variantId: formData.get("variantId"),
    quantity: formData.get("quantity"),
  })
  const jar = await cookies()
  let cartId = jar.get("thamani_cart_id")?.value
  const sdk = createMedusaClient()
  if (!cartId) {
    const result = await sdk.store.cart.create({
      region_id: process.env.NEXT_PUBLIC_DEFAULT_REGION_ID || undefined,
    })
    const createdCartId = result.cart.id
    if (!createdCartId) throw new Error("Baobab Trade returned a cart without an identifier")
    cartId = createdCartId
    jar.set("thamani_cart_id", createdCartId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    })
  }
  if (!cartId) throw new Error("Cart identifier could not be resolved")
  await sdk.store.cart.createLineItem(cartId, {
    variant_id: value.variantId,
    quantity: value.quantity,
  })
  redirect("/cart")
}
export async function getCart() {
  const cartId = (await cookies()).get("thamani_cart_id")?.value
  if (!cartId) return null
  try {
    return (await createMedusaClient().store.cart.retrieve(cartId)).cart
  } catch {
    return null
  }
}
