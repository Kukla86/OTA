# OTA Business Class

Премиальная платформа для бронирования бизнес и первого класса рейсов.

## 🚀 Технологии

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes (Serverless)
- **База данных**: PostgreSQL + Prisma ORM
- **Кэш**: Redis
- **Платежи**: Stripe
- **GDS**: Amadeus, Sabre
- **Деплой**: Vercel

## 📁 Структура проекта

```
frontend/                 # Next.js приложение
├── src/
│   ├── app/             # App Router
│   │   ├── api/         # API Routes
│   │   ├── search/      # Страница поиска
│   │   ├── results/     # Результаты поиска
│   │   ├── checkout/    # Оформление заказа
│   │   └── profile/     # Профиль пользователя
│   ├── components/      # UI компоненты
│   ├── lib/            # Утилиты и конфигурация
│   └── gds/            # GDS интеграции
├── prisma/             # Prisma схема
└── package.json
```

## 🛠️ Установка

1. **Клонировать репозиторий:**
```bash
git clone <repository-url>
cd frontend
```

2. **Установить зависимости:**
```bash
npm install
```

3. **Настроить переменные окружения:**
```bash
cp .env.example .env.local
# Заполнить .env.local с реальными ключами
```

4. **Настроить базу данных:**
```bash
npx prisma generate
npx prisma migrate dev
```

5. **Запустить dev сервер:**
```bash
npm run dev
```

## 🔑 Переменные окружения

### Обязательные:
- `DATABASE_URL` - PostgreSQL подключение
- `REDIS_URL` - Redis подключение
- `STRIPE_SECRET_KEY` - Stripe секретный ключ
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe публичный ключ
- `AMADEUS_CLIENT_ID` - Amadeus API ключ
- `AMADEUS_CLIENT_SECRET` - Amadeus API секрет

### Опциональные:
- `SABRE_CLIENT_ID` - Sabre API ключ
- `SABRE_CLIENT_SECRET` - Sabre API секрет
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook секрет

## 🚀 Деплой на Vercel

1. **Подключить GitHub репозиторий к Vercel**
2. **Добавить переменные окружения в Vercel Dashboard**
3. **Настроить GitHub Secrets:**
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID` 
   - `VERCEL_PROJECT_ID`

## 📋 API Endpoints

- `GET /api/search/flights` - Поиск рейсов
- `POST /api/checkout` - Создание Payment Intent
- `POST /api/stripe/webhook` - Stripe webhook
- `GET /api/user` - Данные пользователя

## 🧪 Тестирование

```bash
npm run test        # Запуск тестов
npm run test:run    # Запуск тестов без UI
```

## 📝 Скрипты

```bash
npm run dev              # Dev сервер
npm run build           # Сборка
npm run start           # Production сервер
npm run prisma:generate # Генерация Prisma клиента
npm run prisma:migrate  # Миграции БД
npm run prisma:studio   # Prisma Studio
```