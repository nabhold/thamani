import type { Metadata } from "next"
import "./globals.css"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
export const metadata: Metadata = {
  title: { default: "Thamani | Everyday value, thoughtfully selected", template: "%s | Thamani" },
  description:
    "A consumer retail destination for considered products across categories and markets.",
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
