FROM node:20-alpine AS deps
WORKDIR /app
COPY backend/package.json backend/package-lock.json* ./
RUN npm ci --no-audit --no-fund

FROM node:20-alpine AS builder
WORKDIR /app
COPY backend ./backend
COPY prisma ./prisma
WORKDIR /app/backend
RUN npm ci --no-audit --no-fund
RUN npx prisma generate --schema ../prisma/schema.prisma
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app/backend
ENV NODE_ENV=production
COPY --from=builder /app/backend/package*.json ./
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/dist ./dist
EXPOSE 8080
CMD ["node","dist/index.js"]
