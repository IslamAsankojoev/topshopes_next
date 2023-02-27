FROM node:alpine as base
WORKDIR /frontend
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Установка pnpm вместо
RUN npm install -g pnpm

# Копирование зависимостей и установка их с помощью pnpm
RUN pnpm install --frozen-lockfile

# Копирование остальных файлов
# COPY . .
COPY ./build /frontend/build

# Запуск сборки приложения
# RUN pnpm run build

FROM node:alpine as prod
WORKDIR /frontend

# COPY ./node_modules /frontend/node_modules
COPY ./public /frontend/public
# COPY --from=base /frontend/public ./public
COPY --from=base /frontend/node_modules ./node_modules
CMD ["node_modules/.bin/next", "start"]