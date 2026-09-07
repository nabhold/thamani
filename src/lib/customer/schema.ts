import { z } from "zod"

export const registerCustomerSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters."),
  firstName: z.string().min(1, "Enter your first name."),
  lastName: z.string().min(1, "Enter your last name."),
})
export type RegisterCustomerInput = z.infer<typeof registerCustomerSchema>

export const loginCustomerSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
})
export type LoginCustomerInput = z.infer<typeof loginCustomerSchema>
