import { describe, expect, it } from "vitest"
import { loginCustomerSchema, registerCustomerSchema } from "./schema"

describe("registerCustomerSchema", () => {
  it("accepts a valid registration input", () => {
    const result = registerCustomerSchema.parse({
      email: "supplier-applicant@example.test",
      password: "supersecret123",
      firstName: "Highland",
      lastName: "Produce",
    })
    expect(result.email).toBe("supplier-applicant@example.test")
  })

  it("rejects an invalid email", () => {
    expect(() =>
      registerCustomerSchema.parse({
        email: "not-an-email",
        password: "supersecret123",
        firstName: "Highland",
        lastName: "Produce",
      }),
    ).toThrow()
  })

  it("rejects a password shorter than 8 characters", () => {
    expect(() =>
      registerCustomerSchema.parse({
        email: "supplier-applicant@example.test",
        password: "short",
        firstName: "Highland",
        lastName: "Produce",
      }),
    ).toThrow()
  })
})

describe("loginCustomerSchema", () => {
  it("accepts a valid login input", () => {
    const result = loginCustomerSchema.parse({
      email: "supplier-applicant@example.test",
      password: "anything",
    })
    expect(result.email).toBe("supplier-applicant@example.test")
  })

  it("rejects an empty password", () => {
    expect(() =>
      loginCustomerSchema.parse({ email: "supplier-applicant@example.test", password: "" }),
    ).toThrow()
  })
})
