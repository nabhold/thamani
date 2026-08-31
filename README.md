# Thamani

Thamani is Nabhold's independently deployable, consumer-first B2C digital estate. It owns retail presentation, discovery, merchandising, cart and checkout experience, customer-facing content, accessibility, SEO and frontend behaviour. It is not a commerce engine.

It sits in an eleven-repository ecosystem: the platform foundation (`baobab-cp`, `shared`, `infrastructure`, `baobab-dev`), Baobab engines (`baobab-trade`, `baobab-erp`, `baobab-pulse`), and independently deployed digital estates (`nabhold`, `zuribeans`, `thamani`, `equator-estate`). Thamani shares contracts and APIs with these repositories, never their source trees or databases.

## Architectural boundary

| Authority           | Repository               | Thamani relationship                                                                       |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------ |
| Commerce            | `nabhold/baobab-trade`   | Consume Medusa v2 Store API; never reproduce or query commerce data directly               |
| Platform context    | `nabhold/baobab-cp`      | Consume authoritative tenant and entitlement context when its shared contract is published |
| Canonical contracts | `nabhold/shared`         | Pin identifiers and organisational standards; do not redefine them                         |
| ERP                 | `nabhold/baobab-erp`     | No browser or direct integration; Trade mediates business workflows                        |
| Intelligence        | `nabhold/baobab-pulse`   | Future explicit recommendation/merchandising APIs only                                     |
| Infrastructure      | `nabhold/infrastructure` | Owns cloud, DNS, networks, deployment and observability infrastructure                     |
| Development image   | `nabhold/baobab-dev`     | Supplies the pinned frontend and frontend-e2e profiles                                     |
| B2B estate          | `nabhold/zuribeans`      | Sibling Trade consumer; no source-code dependency                                          |
| Corporate estate    | `nabhold/nabhold`        | Owns corporate and executive presentation                                                  |
| Property estate     | `nabhold/equator-estate` | Independent sibling estate                                                                 |

Legal entity is the default tenant boundary but is not synonymous with tenant. The estate does not assume one storefront permanently equals one tenant or entity.

## Foundation vertical slice

The current slice provides home, live catalogue, product detail, server-side add-to-cart, cart, search, health, SEO controls and a deliberate checkout gate. Checkout is not fabricated: Baobab Trade must first publish configured shipping, payment and order-completion contracts. Account, wishlist, reviews, recommendations and reorder follow the same evidence-before-UI rule.

## Development

```bash
cp .env.example .env.local
pnpm install --frozen-lockfile
pnpm dev
```

Quality gates: `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`.

See `docs/architecture.md`, `docs/development.md`, `docs/environment.md`, `docs/medusa-integration.md`, `docs/testing.md`, `docs/deployment.md`, and `SECURITY.md`.

## Foundation 4

Codespaces uses `ghcr.io/nabhold/baobab-dev:1.2.6-frontend`. The SHA-pinned
Foundation gate validates contract compatibility and reproducibility and scans
source, dependencies, secrets, configuration, and the deployable image.
