import Link from "next/link"
export default function Home() {
  return (
    <>
      <section className="hero container">
        <div>
          <p className="eyebrow">Thamani consumer retail</p>
          <h1>Useful. Beautiful. Worth it.</h1>
          <p>
            Discover a changing selection of products chosen for real life—not one fixed category,
            season, or market.
          </p>
          <Link className="button" href="/shop">
            Explore the shop
          </Link>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Built for discovery</p>
            <h2>One destination, many possibilities</h2>
          </div>
        </div>
        <p>
          Categories, collections, regional availability, pricing, and promotions come from Baobab
          Trade. Thamani shapes them into a fast, accessible consumer experience.
        </p>
      </section>
    </>
  )
}
