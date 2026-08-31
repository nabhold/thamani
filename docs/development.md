# Local development

Use Node 24 LTS and pnpm 11.24, or open the repository in Codespaces using `baobab-dev:1.2.6-frontend`. Copy `.env.example` to `.env.local`, configure a Baobab Trade Store API endpoint, publishable key and region, then run `pnpm dev`.

The frontend does not require PostgreSQL or Redis. Those are Baobab Trade runtime concerns. Browser testing uses the separate `frontend-e2e` development image in CI.
