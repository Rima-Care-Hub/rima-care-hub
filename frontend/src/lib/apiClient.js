const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

function getSession() {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem('rc-session')
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function clearSessionAndRedirect() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem('rc-session')
  window.location.href = '/login'
}

export async function apiClient(path, options = {}) {
  const { method = 'GET', headers, body, ...rest } = options

  const baseUrl = API_BASE_URL
  const url = path.startsWith('http') ? path : new URL(path, baseUrl).toString()

  const session = getSession()
  const authHeader =
    session && session.token ? { Authorization: `Bearer ${session.token}` } : {}

  const finalHeaders = {
    Accept: 'application/json',
    ...(body ? { 'Content-Type': 'application/json' } : {}),
    ...headers,
    ...authHeader,
  }

  let finalBody = body
  if (
    body &&
    typeof body === 'object' &&
    !(body instanceof FormData)
  ) {
    finalBody = JSON.stringify(body)
  }

  const response = await fetch(url, {
    method,
    headers: finalHeaders,
    body: finalBody,
    ...rest,
  })

  if (response.status === 401) {
    clearSessionAndRedirect()
    throw new Error('Unauthorized')
  }

  const contentType = response.headers.get('content-type') || ''

  let data
  if (contentType.includes('application/json')) {
    data = await response.json()
  } else {
    data = await response.text()
  }

  if (!response.ok) {
    const error = new Error('Request failed')
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}
