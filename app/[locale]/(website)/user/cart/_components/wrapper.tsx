'use client'

import { useTranslations } from 'next-intl'

import { Card } from '@/components/ui/card'
import { useCartItems } from '@/hooks/use-cart'

import { CartItems } from './cart-items'
import { CartSummary } from './cart-summary'

type Props = {}

const Wrapper = (props: Props) => {
  const t = useTranslations('cart')
  const { data, isLoading, error } = useCartItems()

  // Map API response to UI cart items shape
  const items = (data?.items ?? []).map((item) => ({
    id: String(item.item_id),
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    availableQuantity: item.product.selected_size.quantity,
    image: item.product.image_url,
    color: item.product.selected_color.color_name,
    size: item.product.selected_size.size_code,
    isDisabled: item.product.selected_size.quantity <= 0,
  }))

  if (isLoading) {
    return (
      <section>
        <div className="container">
          <div className="flex gap-8 pb-20">
            <div className="flex-1">
              <div className="w-full overflow-hidden rounded-lg border p-8 text-center">
                <p className="text-muted-foreground text-lg">
                  {t('operations.loading')}
                </p>
              </div>
            </div>
            <div className="w-80">
              <div className="rounded-lg border p-6">
                <p className="text-muted-foreground text-center">
                  {t('operations.loading')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <div className="container">
          <div className="flex gap-8 pb-20">
            <div className="flex-1">
              <div className="w-full overflow-hidden rounded-lg border p-8 text-center">
                <p className="text-lg text-red-500">{t('operations.error')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="container">
        <div className="flex flex-col gap-4 pb-20 md:flex-row">
          <div className="flex-1">
            <CartItems items={items} />
          </div>
          {items.length > 0 ? (
            <CartSummary />
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground text-lg">
                {t('table.noItems')}
              </p>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}

export default Wrapper
