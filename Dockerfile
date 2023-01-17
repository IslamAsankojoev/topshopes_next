FROM node:alpine as base
WORKDIR /frontend
COPY package*.json ./
COPY yarn.lock ./

FROM base as pre-prod
COPY . .
RUN yarn install --forzen-lockfile
RUN yarn build

FROM node:alpine as prod

WORKDIR /frontend
COPY --from=pre-prod /frontend/public ./public
COPY --from=pre-prod /frontend/build ./build
COPY --from=pre-prod /frontend/node_modules ./node_modules
CMD ["node_modules/.bin/next", "start"]