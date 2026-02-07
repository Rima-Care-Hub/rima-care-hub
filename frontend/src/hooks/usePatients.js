import { useQuery } from '@tanstack/react-query'

async function fetchPatients() {
  return []
}

export function usePatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
    staleTime: 1000 * 60,
  })
}
