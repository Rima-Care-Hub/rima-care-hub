import { useQuery } from '@tanstack/react-query'

async function fetchShifts() {
  return [
    {
      id: 1,
      title: 'Evening shift · Lagos',
      detail: '4pm - 10pm · RN · Pending dispatch',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Overnight · Abuja',
      detail: '8pm - 6am · CNA · Confirmed',
      status: 'confirmed',
    },
    {
      id: 3,
      title: 'Post-op check · Remote',
      detail: 'Telehealth · Scheduled',
      status: 'scheduled',
    },
  ]
}

export function useShifts() {
  return useQuery({
    queryKey: ['shifts'],
    queryFn: fetchShifts,
    staleTime: 1000 * 60,
  })
}
