'use client'

import { CircleX, Loader2, Minus, Plus } from 'lucide-react'

import { useState } from 'react'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useRemoveCartItem, useUpdateCartItemQuantity } from '@/hooks/use-cart'
import { cn } from '@/lib/utils'

// Cart item interface
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  color: string
  size: string
}

interface CartItemsProps {
  items: CartItem[]
}

export function CartItems({ items }: CartItemsProps) {
  const t = useTranslations('cart')
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  const updateQuantityMutation = useUpdateCartItemQuantity()
  const removeItemMutation = useRemoveCartItem()

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    updateQuantityMutation.mutate({ itemId: id, quantity: newQuantity })
  }

  const handleRemoveItem = (id: number) => {
    removeItemMutation.mutate(id)
    setItemToDelete(null)
  }

  const openDeleteDialog = (id: string) => {
    setItemToDelete(id)
  }

  const closeDeleteDialog = () => {
    setItemToDelete(null)
  }

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ${t('currancy')}`
  }

  const calculateTotal = (price: number, quantity: number) => {
    return price * quantity
  }

  if (items.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground text-lg">{t('table.noItems')}</p>
      </Card>
    )
  }

  return (
    <div className="w-full">
      {/* Desktop Table Version */}
      <div className="hidden overflow-hidden rounded-lg border lg:block">
        {/* Table Header */}
        <div className="bg-border grid grid-cols-11 gap-4 p-4">
          <div className="col-span-5 font-semibold">{t('table.item')}</div>
          <div className="col-span-2 text-center font-semibold">
            {t('table.price')}
          </div>
          <div className="col-span-2 text-center font-semibold">
            {t('table.quantity')}
          </div>
          <div className="col-span-2 text-center font-semibold">
            {t('table.total')}
          </div>
        </div>

        {/* Table Body */}
        <div className="space-y-4">
          {items.map((item) => {
            const isUpdating =
              updateQuantityMutation.isPending &&
              updateQuantityMutation.variables?.itemId === Number(item.id)
            const isRemoving =
              removeItemMutation.isPending &&
              removeItemMutation.variables === Number(item.id)

            return (
              <div
                key={item.id}
                className={`grid grid-cols-11 items-center gap-4 p-2 transition-opacity ${
                  isRemoving ? 'opacity-50' : ''
                }`}
              >
                {/* Item Details */}
                <div className="col-span-5">
                  <div className="flex items-center gap-3">
                    {/* Remove Button */}
                    <div className="col-span-1 flex justify-center">
                      <AlertDialog onOpenChange={closeDeleteDialog}>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-9"
                            disabled={removeItemMutation.isPending}
                          >
                            {isRemoving ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <CircleX className="size-8" strokeWidth={1} />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {t('deleteConfirm.title')}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {t('deleteConfirm.description', {
                                itemName: item.name,
                              })}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="px-6 font-medium">
                              {t('deleteConfirm.cancel')}
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive hover:bg-destructive/90 px-6 font-medium"
                              onClick={() => handleRemoveItem(Number(item.id))}
                            >
                              {t('deleteConfirm.confirm')}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <div className="bg-muted relative aspect-square h-18 w-18 overflow-hidden rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-xs text-[#A97C50]">
                        {t('table.color')}: {item.color} | {t('table.size')}:{' '}
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center text-sm font-medium">
                  {formatPrice(item.price)}
                </div>

                {/* Quantity Controls */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="flex items-center overflow-hidden rounded-lg border bg-white">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none border-l"
                      onClick={() =>
                        handleQuantityChange(Number(item.id), item.quantity - 1)
                      }
                      disabled={
                        item.quantity <= 1 || updateQuantityMutation.isPending
                      }
                    >
                      {isUpdating ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Minus className="h-3 w-3" />
                      )}
                    </Button>
                    <Input
                      readOnly
                      type="number"
                      value={item.quantity}
                      className="h-8 w-fit rounded-none border-0 px-1 text-center shadow-none focus-visible:ring-0"
                      min="1"
                      disabled={updateQuantityMutation.isPending}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none border-r"
                      onClick={() =>
                        handleQuantityChange(Number(item.id), item.quantity + 1)
                      }
                      disabled={updateQuantityMutation.isPending}
                    >
                      {isUpdating ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Plus className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-2 text-center text-sm font-medium">
                  {formatPrice(calculateTotal(item.price, item.quantity))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile Compact Version */}
      <div className="overflow-hidden rounded-lg border lg:hidden">
        {/* Table Header */}
        <div className="bg-border p-3">
          <div className="font-semibold">{t('table.shopping-cart')}</div>
        </div>

        <div className="">
          {items.map((item) => {
            const isUpdating =
              updateQuantityMutation.isPending &&
              updateQuantityMutation.variables?.itemId === Number(item.id)
            const isRemoving =
              removeItemMutation.isPending &&
              removeItemMutation.variables === Number(item.id)

            return (
              <Card
                key={item.id}
                className={cn(
                  `border-none p-3 shadow-none transition-opacity`,
                  isRemoving ? 'opacity-50' : ''
                )}
              >
                <div className="flex items-center gap-1">
                  <AlertDialog onOpenChange={closeDeleteDialog}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-full"
                        disabled={removeItemMutation.isPending}
                      >
                        {isRemoving ? (
                          <Loader2 className="size-5 animate-spin" />
                        ) : (
                          <CircleX className="size-5" strokeWidth={1} />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {t('deleteConfirm.title')}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('deleteConfirm.description', {
                            itemName: item.name,
                          })}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="px-6 font-medium">
                          {t('deleteConfirm.cancel')}
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive hover:bg-destructive/90 px-6 font-medium"
                          onClick={() => handleRemoveItem(Number(item.id))}
                        >
                          {t('deleteConfirm.confirm')}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  {/* Product Image */}
                  <div className="bg-muted relative aspect-square h-22 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="min-w-0 flex-1 ps-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1 text-sm leading-tight font-medium">
                          {item.name}
                        </h3>
                        <p className="text-muted-foreground mb-2 text-xs">
                          {t('table.color')}: {item.color} | {t('table.size')}:{' '}
                          {item.size}
                        </p>

                        {/* Quantity Controls */}
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center overflow-hidden rounded-lg border bg-white">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-none border-l"
                              onClick={() =>
                                handleQuantityChange(
                                  Number(item.id),
                                  item.quantity - 1
                                )
                              }
                              disabled={
                                item.quantity <= 1 ||
                                updateQuantityMutation.isPending
                              }
                            >
                              {isUpdating ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Minus className="h-3 w-3" />
                              )}
                            </Button>
                            <Input
                              readOnly
                              type="number"
                              value={item.quantity}
                              className="h-7 w-12 rounded-none border-0 px-1 text-center text-sm shadow-none focus-visible:ring-0"
                              min="1"
                              disabled={updateQuantityMutation.isPending}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-none border-r"
                              onClick={() =>
                                handleQuantityChange(
                                  Number(item.id),
                                  item.quantity + 1
                                )
                              }
                              disabled={updateQuantityMutation.isPending}
                            >
                              {isUpdating ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Plus className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Price and Remove Button */}

                      <div className="text-sm font-medium">
                        {formatPrice(calculateTotal(item.price, item.quantity))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
