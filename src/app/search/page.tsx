import { ProductCard } from "@/components/commerce/product-card"
import { listProducts } from "@/lib/medusa/products"
import type { ProductCardModel } from "@/lib/medusa/types"
export const dynamic = "force-dynamic"
export default async function Search({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = (await searchParams).q?.trim() || ""
  let products: ProductCardModel[] = []
  if (q) {
    try {
      products = await listProducts(q)
    } catch {
      products = []
    }
  }
  return (
    <section className="section container">
      <h1>Search</h1>
      <form className="stack" role="search">
        <label className="field">
          Search products
          <input type="search" name="q" defaultValue={q} autoComplete="off" />
        </label>
        <button className="button" type="submit">
          Search
        </button>
      </form>
      {q && (
        <p aria-live="polite">
          {products.length} result{products.length === 1 ? "" : "s"} for “{q}”
        </p>
      )}
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
