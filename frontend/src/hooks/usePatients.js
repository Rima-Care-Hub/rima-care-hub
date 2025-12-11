import { useQuery } from '@tanstack/react-query'

async function fetchPatients() {
  return [
    { id: 1, name: 'Adaeze N.', status: 'Stable · Vitals clean' },
    { id: 2, name: 'Michael T.', status: 'Needs wound review' },
    { id: 3, name: 'Ngozi K.', status: 'Discharge follow-up in 24h' },
  ]
}

export function usePatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
    staleTime: 1000 * 60,
  })
}
