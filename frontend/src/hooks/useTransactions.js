import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'

export function useTransactions(options = {}) {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await apiClient('/transactions?limit=10', {
        method: 'GET',
      })
      return res
    },
    ...options,
  })
}
