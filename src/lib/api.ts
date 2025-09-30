export function apiUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL
  if (!base) return path
  if (path.startsWith('http')) return path
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`
}


