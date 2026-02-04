import { useMutation } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'

export function useCreatePaymentSession() {
  return useMutation({
    mutationKey: ['createPaymentSession'],
    mutationFn: async (payload) => {
      // payload: { amount_minor, sellerType, sellerId, metadata? }
      const res = await apiClient('/payments/session', {
        method: 'POST',
        body: payload,
      })
      return res
    },
  })
}
