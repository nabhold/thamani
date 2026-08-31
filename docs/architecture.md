# Architecture

Thamani is exclusively a Digital Estate. Server Components call application-level adapters in `src/lib/medusa`; React components never call the Medusa SDK directly. Marketing content is cacheable, catalogue data is revalidated, price/availability are region-sensitive, and cart/customer/checkout data are dynamic and never placed in shared caches.

The B2C information architecture grows by complete vertical slices. Empty routes are not committed. Cross-estate reuse with Zuribeans requires an explicit package governed through `nabhold/shared`, not source imports between repositories.

## Current contract findings

The pinned Shared registry correctly identifies `THAMANI-GLOBAL`, but currently labels Thamani B2B and Zuribeans B2C. The approved direction is the reverse. `contracts.lock.yaml` records this correction dependency. Thamani does not alter or duplicate the canonical registry locally.
