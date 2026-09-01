import type { Metadata } from "next"
import { ProductCard } from "@/components/commerce/product-card"
import { listProducts } from "@/lib/medusa/products"
export const metadata: Metadata = { title: "Shop" }
export const dynamic = "force-dynamic"
export default async function Shop() {
  const catalogue = await listProducts()
    .then((products) => ({ products, unavailable: false }))
    .catch(() => ({ products: [], unavailable: true }))

  if (catalogue.unavailable) {
    return (
      <section className="section container">
        <h1>Shop</h1>
        <p className="notice" role="status">
          The catalogue is temporarily unavailable. Please try again shortly.
        </p>
      </section>
    )
  }

  return (
    <section className="section container">
      <p className="eyebrow">Catalogue</p>
      <h1>Shop all</h1>
      {catalogue.products.length ? (
        <div className="product-grid">
          {catalogue.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="notice">
          No products are currently published to this sales channel and region.
        </p>
      )}
    </section>
  )
}
