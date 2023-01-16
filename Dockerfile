FROM node:16-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /frontend

COPY package.json ./

RUN npm install -g npm@9.2.0

RUN npm install --force

FROM node:16-alpine

WORKDIR /frontend

COPY --from=builder /frontend/node_modules ./node_modules
COPY --from=builder /frontend/package.json ./package.json

COPY . .

RUN npm run build