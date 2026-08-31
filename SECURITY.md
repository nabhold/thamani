# Security

Report vulnerabilities privately to `security@nabhold.com`; do not open a public issue. Never commit secrets or Medusa administrative credentials.

Thamani uses server-only commerce adapters, HTTP-only cart cookies, strict environment validation, CSP and baseline browser security headers. Account and checkout routes must remain non-indexable. OIDC/platform federation, payment handling and customer-data retention are governed by their owning engines and explicit contracts. Production CSP must be narrowed to the actual payment and media origins before checkout release.
