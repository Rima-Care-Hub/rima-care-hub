import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'

export function useCreatePayoutRequest(ownerType, ownerId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createPayoutRequest', ownerType, ownerId],
    mutationFn: async ({ amountMinor }) => {
      const res = await apiClient(`/wallets/${ownerType}/${ownerId}/payouts`, {
        method: 'POST',
        body: { amountMinor },
      })
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet', ownerType, ownerId] })
    },
  })
}
