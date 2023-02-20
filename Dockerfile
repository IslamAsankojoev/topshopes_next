# FROM node:alpine as base
# WORKDIR /frontend
# COPY package*.json ./
# COPY yarn.lock ./

# FROM base as pre-prod
# COPY . .
# RUN yarn install --forzen-lockfile
# # RUN yarn build

# FROM node:alpine as prod


# WORKDIR /frontend
# COPY --from=pre-prod /frontend/public ./public
# # COPY --from=pre-prod /frontend/build ./build
# COPY --from=pre-prod /frontend/node_modules ./node_modules
# CMD ["node_modules/.bin/next", "start"]

FROM node:alpine as base
WORKDIR /frontend
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Установка pnpm вместо yarn
RUN npm install -g pnpm

# Копирование зависимостей и установка их с помощью pnpm
RUN pnpm install --frozen-lockfile

# Копирование остальных файлов
COPY . .

# Запуск сборки приложения
# RUN pnpm run build

FROM node:alpine as prod
WORKDIR /frontend
COPY --from=base /frontend/public ./public
COPY --from=base /frontend/node_modules ./node_modules
CMD ["node_modules/.bin/next", "start"]