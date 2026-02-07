import { useQuery } from '@tanstack/react-query'

async function fetchShifts() {
  return []
}

export function useShifts() {
  return useQuery({
    queryKey: ['shifts'],
    queryFn: fetchShifts,
    staleTime: 1000 * 60,
  })
}
