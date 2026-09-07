# ADR-0003: Customer identity for supplier onboarding

**Status:** Accepted

ADR-0002 left one open question unresolved: Thamani has no authentication
system at all, and a supplier applicant needs to log in to something before
`@nabhold/supplier-domain`'s `applicantIdentityRef` join point means
anything. This ADR resolves it, and records the verification that unblocks
building on it.

## Decision

Thamani reuses Baobab Trade's Medusa Store API customer identity
(`emailpass` provider, actor type `customer`) as the supplier applicant's
login — the same mechanism `nabhold/zuribeans` ADR-0006 already reuses for
its own supplier applicants ("Reuse the Medusa customer identity already
built for buyers... as the supplier's login too"). Thamani does not build a
bespoke authentication system, and does not wait for a platform-wide
identity provider (`nabhold/shared`'s ERP system-of-record names
`identity-provider`/OIDC as the eventual canonical owner of the `User`
concept, but nothing implements that anywhere in this ecosystem yet).

This is also the same identity a future B2C customer account feature would
need — building it once serves both, rather than Thamani inventing two
separate identity systems.

`SupplierOrganisation.applicantIdentityRef` (see
`docs/supplier-onboarding/domain-model.md`) is populated as
`customer:<medusa_customer_id>` once the domain layer exists (Phase 2,
not yet built).

## Why this was blocked, and what changed

`docs/medusa-integration.md` explicitly listed "customer authentication" as
requiring "explicit Baobab Trade configuration or contracts" before
corresponding UI is enabled — the same evidence-before-UI rule that gates
checkout. That gate is about proof, not permission: nothing in Baobab
Trade's own code or docs said customer auth was unsupported, only that
nobody had verified it against a real instance.

It has now been verified. A local Baobab Trade instance was brought up
(Postgres 16 + Redis, `medusa db:migrate`, `medusa develop`) and exercised
through `@medusajs/js-sdk` with the exact call sequence
`src/lib/customer/actions.ts` uses:

1. `sdk.auth.register("customer", "emailpass", { email, password })` →
   registration token
2. `sdk.store.customer.create({ email, first_name, last_name }, {}, { Authorization: "Bearer <registration token>" })`
   → customer created
3. `sdk.auth.login("customer", "emailpass", { email, password })` →
   session token
4. `sdk.store.customer.retrieve({}, { Authorization: "Bearer <session token>" })`
   → retrieved customer matches what was created
5. Login with the wrong password was rejected, as expected

All five steps passed. This lifts the evidence-before-UI gate specifically
for **register / login / retrieve** — nothing wider. Password reset, MFA,
third-party (OAuth) login, address management, and order history remain
unverified and ungated by this ADR; `docs/medusa-integration.md` is updated
to reflect exactly this narrower scope, not "customer auth" as a whole.

## Implementation

`src/lib/customer/schema.ts` (Zod input validation) and
`src/lib/customer/actions.ts` (`registerCustomer`, `loginCustomer`,
`logoutCustomer`, `getCurrentCustomer`) follow the same conventions as
`src/lib/medusa/cart.ts`: server-only, Zod-validated `FormData` input, and
an httpOnly/secure/`sameSite=lax` cookie (`thamani_customer_token`) — no
credential or session token ever reaches the browser directly.

Unlike `addToCart`, these actions do not redirect internally: register and
login are reusable primitives a future supplier-registration page and a
future B2C account page both call, so navigation stays the caller's
decision rather than being baked into the primitive.

## Consequences

- Phase 2's supplier registration flow (`docs/supplier-onboarding/registration-flow.md`)
  can now build on `getCurrentCustomer()` the same way `getCart()` is
  already built on a proven Medusa primitive — no further identity decision
  is needed first.
- A future B2C "Account" feature (currently gated per README's
  evidence-before-UI rule) can reuse this same module rather than
  re-deriving it.
- Password reset, MFA, and third-party login remain explicitly unverified.
  A future ADR should extend this one if any of those become necessary for
  supplier onboarding specifically, rather than assuming this ADR already
  covers them.
