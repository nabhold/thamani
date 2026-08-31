export type Money = { amount: number; currencyCode: string }
export type ProductCardModel = {
  id: string
  handle: string
  title: string
  subtitle: string | null
  thumbnail: string | null
  price: Money | null
}
export type ProductDetailModel = ProductCardModel & {
  description: string | null
  variants: Array<{ id: string; title: string; price: Money | null }>
}
