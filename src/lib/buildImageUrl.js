export function buildImageUrl(base, path) {
  // Prefer an explicit API URL env var but allow fallbacks
  const baseUrl =
    base ||
    process.env.NEXT_PUBLIC_STRAPI_API_URL ||
    process.env.NEXT_PUBLIC_STRAPI_API ||
    process.env.NEXT_PUBLIC_STRAPI ||
    ''
  if (!path) return baseUrl
  try {
    // new URL normalizes and correctly joins base + path, avoiding double-protocols
    return new URL(path, baseUrl).toString()
  } catch (e) {
    // fallback safe join
    return baseUrl.replace(/\/+$/, '') + '/' + String(path).replace(/^\/+/, '')
  }
}

// Before (legacy):
// <Image src="/1.jpg" layout="fill" objectFit="cover" alt="..." />

// After (modern):
// <Image src="/1.jpg" fill style={{ objectFit: 'cover' }} alt="..." />