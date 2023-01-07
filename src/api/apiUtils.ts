
export function getApiUrl(): string {
  return process.env.SSR_HOST || process.env.NEXT_PUBLIC_API_HOST || ''
}

function withoutLeadingSlash(path: string): string {
  return path.replace(/^\//, '')
}

export function apiUrl(path: string): string {
  return `${getApiUrl()}/${withoutLeadingSlash(path)}`
}

export function imgUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_IMAGE_HOST}/${withoutLeadingSlash(path)}`
}
