import Link from "next/link"
import { getCart } from "@/lib/medusa/cart"
export const dynamic = "force-dynamic"
export const metadata = { robots: { index: false, follow: false } }
type CartItemView = { id: string; title: string; quantity: number }
export default async function Cart() {
  const cart = await getCart()
  const items = (cart?.items || []) as CartItemView[]
  return (
    <section className="section container">
      <h1>Your cart</h1>
      {items.length ? (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.title} × {item.quantity}
              </li>
            ))}
          </ul>
          <Link className="button" href="/checkout">
            Continue to checkout
          </Link>
        </>
      ) : (
        <>
          <p>Your cart is empty.</p>
          <Link className="button" href="/shop">
            Start shopping
          </Link>
        </>
      )}
    </section>
  )
}
