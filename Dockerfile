FROM node:18-alpine AS base


FROM base AS builder
WORKDIR /frontend
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm install -g pnpm
# RUN pnpm install --frozen-lockfile


FROM node:18-alpine AS runner
WORKDIR /frontend
COPY ./public ./public
COPY ./build ./build
CMD ["node_modules/.bin/next", "start"]