# Architecture

Thamani is exclusively a Digital Estate. Server Components call application-level adapters in `src/lib/medusa`; React components never call the Medusa SDK directly. Marketing content is cacheable, catalogue data is revalidated, price/availability are region-sensitive, and cart/customer/checkout data are dynamic and never placed in shared caches.

The B2C information architecture grows by complete vertical slices. Empty routes are not committed. Cross-estate reuse with Zuribeans requires an explicit package governed through `nabhold/shared`, not source imports between repositories.

## Current contract findings

The pinned Shared registry correctly identifies `THAMANI-GLOBAL` as B2C and `ZURIBEANS` as B2B, matching the approved estate architecture. Thamani does not alter or duplicate the canonical registry locally. `contracts.lock.yaml` still records one open gap: Shared has not published a canonical commerce Store API package, so Thamani integrates against Baobab Trade's Medusa v2 Store API directly rather than a Baobab-owned contract.
