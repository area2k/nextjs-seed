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

# App code with dependencies layer
FROM node:16-alpine AS app_context

WORKDIR /app
COPY --from=package_cache /app/node_modules ./node_modules
COPY . .

# Build output layer
FROM app_context AS nextjs_builder

ARG GRAPHQL_ENDPOINT
ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT=$GRAPHQL_ENDPOINT

ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN

ARG SENTRY_DSN
ENV SENTRY_DSN=$SENTRY_DSN

ARG PUBLIC_SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_DSN=$PUBLIC_SENTRY_DSN

RUN yarn build && rm -rf node_modules && rm -rf .yarn

# NextJS server image
FROM node:16-alpine AS nextjs_server

WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=nextjs_builder /app/next.config.js ./
COPY --from=nextjs_builder /app/public ./public
COPY --from=nextjs_builder /app/package.json ./package.json

COPY --from=nextjs_builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=nextjs_builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

CMD ["node", "server.js"]

# Storybook builder layer
FROM app_context AS storybook_builder

RUN yarn build-storybook && rm -rf node_modules && rm -rf .yarn

# Storybook server image
FROM httpd:2.4-alpine AS storybook

COPY --from=storybook_builder /app/storybook-static/ /usr/local/apache2/htdocs/
