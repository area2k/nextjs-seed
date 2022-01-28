# NPM package cache layer
FROM node:16-alpine AS package_cache

# Alpine musl seems sufficient for most things. Uncomment if getting install errors.
# RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./

RUN mkdir .yarn
COPY .yarn/releases ./.yarn/releases
COPY .yarn/plugins ./.yarn/plugins

RUN yarn install --immutable --inline-builds && yarn cache clean --all

# Build output layer
FROM node:16-alpine AS builder

ARG GRAPHQL_ENDPOINT
ARG SENTRY_DSN

ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT=${GRAPHQL_ENDPOINT}
ENV NEXT_PUBLIC_SENTRY_DSN=${SENTRY_DSN}

ENV SENTRY_DSN=${SENTRY_DSN}

WORKDIR /app
COPY --from=package_cache /app/node_modules ./node_modules
COPY . .

RUN yarn build && rm -rf node_modules && rm -rf .yarn

# NextJS server image
FROM node:16-alpine AS nextjs_server

WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

CMD ["node", "server.js"]
