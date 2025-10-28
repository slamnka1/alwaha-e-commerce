import apiClient from './axios'

export const paymentService = {
  async Payment({
    shipping_address,
    cart_id,
  }: {
    shipping_address: string
    cart_id: string | number
  }) {
    const response = await apiClient.post<{
      status: string
      message: string
      payment_link: string
    }>(`/checkout/${cart_id}/generate-payment-link`, {
      shipping_address: shipping_address,
    })
    return response.data.payment_link
  },
}
