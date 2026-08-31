# Baobab Trade integration

`src/lib/medusa` is the anti-corruption layer around `@medusajs/js-sdk`. Catalogue retrieval and cart mutations are server-only. Cart identity is kept in a secure, HTTP-only, same-site cookie; no administrative credential enters the browser.

The currently proven surface is Medusa v2 product listing/retrieval and cart creation/line items. Shipping selection, payment sessions, order completion, customer authentication, reorder, wishlist, reviews and recommendations require explicit Baobab Trade configuration or contracts before corresponding UI is enabled.
