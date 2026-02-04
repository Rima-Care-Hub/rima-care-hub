import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'

export function useWallet(ownerType, ownerId, options = {}) {
  return useQuery({
    queryKey: ['wallet', ownerType, ownerId],
    enabled: Boolean(ownerType && ownerId),
    queryFn: async () => {
      const res = await apiClient(`/wallets/${ownerType}/${ownerId}`, {
        method: 'GET',
      })
      return res
    },
    ...options,
  })
}
