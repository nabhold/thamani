import Image from "next/image"
import { notFound } from "next/navigation"
import { addToCart } from "@/lib/medusa/cart"
import { retrieveProduct } from "@/lib/medusa/products"
import { formatMoney } from "@/lib/format"
import { getPublicEnvironment } from "@/lib/configuration/environment"
export const dynamic = "force-dynamic"
export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const product = await retrieveProduct(handle)
  if (!product) notFound()
  const { NEXT_PUBLIC_SITE_URL } = getPublicEnvironment()
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || undefined,
    image: product.thumbnail || undefined,
    url: `${NEXT_PUBLIC_SITE_URL}/products/${product.handle}`,
    offers: product.price
      ? {
          "@type": "Offer",
          price: product.price.amount,
          priceCurrency: product.price.currencyCode.toUpperCase(),
          availability: "https://schema.org/InStock",
        }
      : undefined,
  }
  return (
    <article className="product-detail container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <div className="product-media">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt=""
            fill
            sizes="(max-width: 720px) 100vw, 55vw"
            priority
          />
        ) : (
          <span aria-hidden="true">TH</span>
        )}
      </div>
      <div className="stack">
        <p className="eyebrow">{product.subtitle || "Thamani selection"}</p>
        <h1>{product.title}</h1>
        <p>{formatMoney(product.price)}</p>
        {product.description && <p>{product.description}</p>}
        <form action={addToCart} className="stack sticky-buy">
          <label className="field">
            Option
            <select name="variantId" required>
              {product.variants.map((v) => (
                <option value={v.id} key={v.id}>
                  {v.title} — {formatMoney(v.price)}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            Quantity
            <input
              name="quantity"
              type="number"
              min="1"
              max="20"
              defaultValue="1"
              inputMode="numeric"
            />
          </label>
          <button className="button" type="submit" disabled={!product.variants.length}>
            Add to cart
          </button>
        </form>
      </div>
    </article>
  )
}
