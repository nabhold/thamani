import Link from "next/link"
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>Thamani — considered goods for everyday life.</p>
      <nav aria-label="Footer">
        <Link href="/delivery">Delivery</Link>
        <Link href="/returns">Returns</Link>
        <Link href="/legal">Legal</Link>
      </nav>
    </footer>
  )
}
