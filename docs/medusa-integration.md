# Baobab Trade integration

`src/lib/medusa` is the anti-corruption layer around `@medusajs/js-sdk`. Catalogue retrieval and cart mutations are server-only. Cart identity is kept in a secure, HTTP-only, same-site cookie; no administrative credential enters the browser.

The currently proven surface is Medusa v2 product listing/retrieval, cart creation/line items, and customer register/login/retrieve (`emailpass` provider) — see ADR-0003 for how customer identity was verified. Shipping selection, payment sessions, order completion, password reset, MFA, third-party login, reorder, wishlist, reviews and recommendations still require explicit Baobab Trade configuration or contracts before corresponding UI is enabled.
