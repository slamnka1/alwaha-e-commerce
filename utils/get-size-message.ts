import { ProductFullData } from '@/@types/product'

export function getSizeMessage(
  product: ProductFullData['sizes'],
  selectedSize: string,
  locale: 'en' | 'ar' = 'ar'
): string {
  const recommendedSize = product.find(
    (size) => size.user_size?.id?.toString() === selectedSize
  )

  if (!recommendedSize) {
    return locale === 'ar'
      ? 'لم يتم العثور على مقاس مُوصى به بناءً على قياساتك الحالية. يرجى التحقق من إعدادات المقاس.'
      : 'No recommended size found based on your current measurements. Please check your size settings.'
  }

  const sizeName = recommendedSize.size_code

  return locale === 'ar'
    ? `بناءً على قياساتك، المقاس المُوصى به هو: ${sizeName}`
    : `Based on your measurements, the recommended size is: ${sizeName}`
}
