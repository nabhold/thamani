import "server-only"
import Medusa from "@medusajs/js-sdk"
import { getServerEnvironment } from "@/lib/configuration/environment"
export const createMedusaClient = () => {
  const env = getServerEnvironment()
  return new Medusa({
    baseUrl: env.MEDUSA_BACKEND_URL,
    publishableKey: env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
    debug: process.env.NODE_ENV === "development",
  })
}
