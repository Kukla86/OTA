import Redis from 'ioredis'

let redisClient: Redis | null = null

export function getRedis(): Redis | null {
  if (!process.env.REDIS_URL) return null
  if (!redisClient) {
    redisClient = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 2,
      enableReadyCheck: true,
      lazyConnect: false,
    })
  }
  return redisClient
}

export async function getCached<T = unknown>(key: string): Promise<T | null> {
  const client = getRedis()
  if (!client) return null
  const raw = await client.get(key)
  return raw ? (JSON.parse(raw) as T) : null
}

export async function setCached(key: string, value: unknown, ttlSeconds = 300) {
  const client = getRedis()
  if (!client) return
  await client.set(key, JSON.stringify(value), 'EX', ttlSeconds)
}
