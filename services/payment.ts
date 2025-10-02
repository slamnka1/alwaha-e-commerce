import apiClient from './axios'

export const paymentService = {
  async Payment() {
    const response = await apiClient.post(`/checkout/process-payment`, {
      shipping_address: 'aaa',
      billing_address: 'aaa',
    })
    return response.data
  },
}
