import { useQuery } from '@tanstack/react-query'

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
  if (!session) return null

  return {
    ...session.user,
    token: session.token,
  }
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    staleTime: Infinity,
  })
}
