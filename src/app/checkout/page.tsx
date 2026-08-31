export const metadata = { robots: { index: false, follow: false } }
export default function Checkout() {
  return (
    <section className="section container">
      <h1>Checkout</h1>
      <p className="notice">
        Checkout UI is intentionally gated until Baobab Trade publishes the configured shipping,
        payment-provider, and order-completion contract. Thamani will not invent those backend
        capabilities.
      </p>
    </section>
  )
}
