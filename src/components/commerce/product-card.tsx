import Image from "next/image"
import Link from "next/link"
import { formatMoney } from "@/lib/format"
import type { ProductCardModel } from "@/lib/medusa/types"
export function ProductCard({ product }: { product: ProductCardModel }) {
  return (
    <article className="product-card">
      <Link href={`/products/${product.handle}`}>
        <div className="product-media">
          {product.thumbnail ? (
            <Image src={product.thumbnail} alt="" fill sizes="(max-width: 720px) 50vw, 25vw" />
          ) : (
            <span aria-hidden="true">TH</span>
          )}
        </div>
        <p className="eyebrow">{product.subtitle || "Thamani selection"}</p>
        <h2>{product.title}</h2>
        <p>{formatMoney(product.price)}</p>
      </Link>
    </article>
  )
}
