import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Create Redis instance
// Safe fallback if not set during build/development
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || 'https://fake.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || 'fake-token',
})

// Cache for ratelimit instances
const limiters = new Map<string, Ratelimit>()

/**
 * @param identifier  Unique string, e.g. IP address or userId
 * @param action      Bucket label to namespace limits per endpoint
 * @param limit       Max allowed requests per window
 * @param windowSecs  Window size in seconds
 */
export async function rateLimit(
  identifier: string,
  action: string,
  limit: number,
  windowSecs: number
): Promise<{ success: boolean; remaining: number }> {
  // If UPSTASH_REDIS_REST_URL isn't set (e.g., local dev), allow traffic
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    return { success: true, remaining: 10 }
  }

  const limiterKey = `${action}:${limit}:${windowSecs}`
  
  let ratelimit = limiters.get(limiterKey)
  if (!ratelimit) {
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, `${windowSecs} s` as any),
      analytics: true,
      prefix: `@upstash/ratelimit/${action}`,
    })
    limiters.set(limiterKey, ratelimit)
  }

  try {
    const { success, remaining } = await ratelimit.limit(identifier)
    return { success, remaining }
  } catch (error) {
    console.error('Upstash Ratelimit error:', error)
    // Fallback if Redis fails
    return { success: true, remaining: 1 }
  }
}

/** Extract the client IP from Next.js request headers */
export function getIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0].trim() ?? '127.0.0.1'
}
