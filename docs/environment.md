# Environment variables

| Variable                             | Exposure         | Purpose                                                   |
| ------------------------------------ | ---------------- | --------------------------------------------------------- |
| `MEDUSA_BACKEND_URL`                 | Server only      | Baobab Trade Store API origin                             |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Public by design | Storefront-scoped Medusa key; never an admin secret       |
| `NEXT_PUBLIC_SITE_URL`               | Public           | Canonical SEO origin                                      |
| `NEXT_PUBLIC_MARKET`                 | Public           | Market hint, not authoritative tenant identity            |
| `NEXT_PUBLIC_DEFAULT_REGION_ID`      | Public           | Medusa region used for catalogue prices and cart creation |

Only values explicitly listed as public may use `NEXT_PUBLIC_*`.
