FROM node:17.7.2-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /topshopes_next
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /topshopes_next
COPY . .
COPY --from=deps /topshopes_next/node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /topshopes_next

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /topshopes_next/next.config.js ./
COPY --from=builder /topshopes_next/public ./public
COPY --from=builder --chown=nextjs:nodejs /topshopes_next/build ./build
COPY --from=builder /topshopes_next/node_modules ./node_modules
COPY --from=builder /topshopes_next/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /topshopes_next/build/static ./build/static

USER nextjs

EXPOSE 3000

CMD ["yarn", "run", "dev"]