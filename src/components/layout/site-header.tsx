import Link from "next/link"
export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Thamani home">
        THAMANI
      </Link>
      <nav aria-label="Primary">
        <Link href="/shop">Shop</Link>
        <Link href="/search">Search</Link>
        <Link href="/cart">Cart</Link>
      </nav>
    </header>
  )
}
