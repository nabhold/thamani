import "server-only"
import { createMedusaClient } from "./client"
import type { Money, ProductCardModel, ProductDetailModel } from "./types"
type Variant = {
  id: string
  title: string
  calculated_price?: { calculated_amount?: number | null; currency_code?: string | null } | null
}
type Product = {
  id: string
  handle?: string | null
  title: string
  subtitle?: string | null
  description?: string | null
  thumbnail?: string | null
  variants?: Variant[] | null
}
const money = (variant?: Variant): Money | null => {
  const p = variant?.calculated_price
  if (typeof p?.calculated_amount !== "number" || !p.currency_code) return null
  return { amount: p.calculated_amount, currencyCode: p.currency_code }
}
const card = (p: Product): ProductCardModel => ({
  id: p.id,
  handle: p.handle || p.id,
  title: p.title,
  subtitle: p.subtitle || null,
  thumbnail: p.thumbnail || null,
  price: money(p.variants?.[0]),
})
const region = () => process.env.NEXT_PUBLIC_DEFAULT_REGION_ID || undefined
export async function listProducts(query?: string): Promise<ProductCardModel[]> {
  const sdk = createMedusaClient()
  const { products } = await sdk.store.product.list({ limit: 24, q: query, region_id: region() })
  return (products as Product[]).map(card)
}
export async function retrieveProduct(handle: string): Promise<ProductDetailModel | null> {
  const sdk = createMedusaClient()
  const { products } = await sdk.store.product.list({ handle, limit: 1, region_id: region() })
  const p = (products as Product[])[0]
  if (!p) return null
  return {
    ...card(p),
    description: p.description || null,
    variants: p.variants?.map((v) => ({ id: v.id, title: v.title, price: money(v) })) || [],
  }
}
