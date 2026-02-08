import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'

function readSession() {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem('rc-session')
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

async function fetchCurrentUser() {
  const session = readSession()
  if (!session?.token) return null
  try {
    const profile = await apiClient('/auth/profile')
    return {
      ...session.user,
      ...profile,
      token: session.token,
    }
  } catch {
    return { ...session.user, token: session.token }
  }
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60,
  })
}
