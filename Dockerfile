FROM node:24.20.0-bookworm-slim AS dependencies
WORKDIR /app
RUN npm install --global pnpm@11.24.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile
FROM dependencies AS build
COPY . .
ARG MEDUSA_BACKEND_URL=http://localhost:9000
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_build_only
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_MARKET=za
ARG NEXT_PUBLIC_DEFAULT_REGION_ID=reg_build_only
ENV MEDUSA_BACKEND_URL=$MEDUSA_BACKEND_URL NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL NEXT_PUBLIC_MARKET=$NEXT_PUBLIC_MARKET NEXT_PUBLIC_DEFAULT_REGION_ID=$NEXT_PUBLIC_DEFAULT_REGION_ID
RUN pnpm build
FROM node:24.20.0-alpine3.23 AS runtime
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000
WORKDIR /app
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
CMD ["node","server.js"]
