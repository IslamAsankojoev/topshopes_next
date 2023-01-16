FROM node:16-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /frontend

COPY package.json ./

RUN yarn install

FROM node:16-alpine

WORKDIR /frontend

COPY --from=builder /frontend/node_modules ./node_modules
COPY --from=builder /frontend/package.json ./

COPY . .

RUN yarn build