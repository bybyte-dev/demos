# 1. Стадия зависимостей
FROM node:20-alpine AS deps
WORKDIR /app

# Ставим yarn если вдруг его нет
RUN apk add --no-cache libc6-compat

# Копируем файлы для установки зависимостей
COPY package.json yarn.lock ./

# Ставим зависимости
RUN yarn install --frozen-lockfile 

# 2. Стадия билда
FROM node:20-alpine AS builder
WORKDIR /app

# Копируем зависимости и исходники
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Билдим приложение
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn build

# 3. Финальная стадия
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Создаем нового юзера
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем только нужные файлы
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Переключаемся на созданного юзера
USER nextjs

# Открываем порт
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
