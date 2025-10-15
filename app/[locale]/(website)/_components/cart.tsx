'use client'

import React from 'react'

import { useCartItems } from '@/hooks/use-cart'
import { Link } from '@/lib/i18n/navigation'
import { cn } from '@/lib/utils'

type Props = {}

const FloatingCart = (props: Props) => {
  const { data } = useCartItems()
  const count = React.useMemo(
    () =>
      (data?.items ?? []).reduce((sum, item) => sum + (item.quantity ?? 0), 0),
    [data]
  )

  const [isShaking, setIsShaking] = React.useState(false)
  const prevCountRef = React.useRef<number>(count)

  React.useEffect(() => {
    if (prevCountRef.current !== count) {
      setIsShaking(true)
      const timer = setTimeout(() => setIsShaking(false), 400)
      prevCountRef.current = count
      return () => clearTimeout(timer)
    }
  }, [count])

  return (
    <div
      className={cn(
        'fixed start-6 bottom-6 z-50',
        isShaking ? 'cart-shake' : ''
      )}
    >
      <Link href={`/user/cart`} className="cursor-pointer">
        <div
          className={`bg-primary relative rounded-full border-[3px] border-white p-2.5 shadow-lg`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 31"
            fill="none"
            className="size-7"
          >
            <path
              d="M30.2175 5.26613C29.8542 4.83011 29.3993 4.47944 28.8852 4.23901C28.3711 3.99859 27.8103 3.87431 27.2428 3.875H6.35913L6.30488 3.42162C6.19386 2.47925 5.74092 1.61036 5.03193 0.9797C4.32294 0.349038 3.40719 0.000441483 2.4583 0L2.17155 0C1.82898 0 1.50044 0.136086 1.2582 0.37832C1.01597 0.620555 0.879883 0.949095 0.879883 1.29167C0.879883 1.63424 1.01597 1.96278 1.2582 2.20501C1.50044 2.44725 1.82898 2.58333 2.17155 2.58333H2.4583C2.77467 2.58337 3.08003 2.69953 3.31645 2.90976C3.55287 3.11999 3.70391 3.40968 3.74092 3.72387L5.51826 18.8364C5.70278 20.4081 6.45792 21.8573 7.64035 22.909C8.82278 23.9607 10.3502 24.5417 11.9327 24.5417H25.4215C25.7641 24.5417 26.0927 24.4056 26.3349 24.1633C26.5771 23.9211 26.7132 23.5926 26.7132 23.25C26.7132 22.9074 26.5771 22.5789 26.3349 22.3367C26.0927 22.0944 25.7641 21.9583 25.4215 21.9583H11.9327C11.1332 21.9561 10.354 21.7066 9.70188 21.2441C9.04977 20.7816 8.55666 20.1287 8.29017 19.375H23.6868C25.201 19.3751 26.6672 18.8431 27.829 17.8721C28.9908 16.901 29.7745 15.5526 30.0431 14.0624L31.0571 8.43846C31.1583 7.88047 31.1356 7.30704 30.9905 6.75882C30.8454 6.2106 30.5815 5.701 30.2175 5.26613ZM28.5215 7.97992L27.5063 13.6038C27.345 14.499 26.874 15.3088 26.1757 15.8916C25.4774 16.4744 24.5964 16.793 23.6868 16.7917H7.87942L6.66397 6.45833H27.2428C27.4325 6.4572 27.6202 6.49788 27.7924 6.5775C27.9647 6.65711 28.1173 6.77369 28.2394 6.91895C28.3614 7.06421 28.45 7.23459 28.4988 7.41796C28.5476 7.60133 28.5553 7.7932 28.5215 7.97992Z"
              fill="#FFFCF9"
            />
            <path
              d="M9.92122 30.9987C11.348 30.9987 12.5046 29.8421 12.5046 28.4154C12.5046 26.9886 11.348 25.832 9.92122 25.832C8.49449 25.832 7.33789 26.9886 7.33789 28.4154C7.33789 29.8421 8.49449 30.9987 9.92122 30.9987Z"
              fill="#FFFCF9"
            />
            <path
              d="M22.8382 30.9987C24.265 30.9987 25.4215 29.8421 25.4215 28.4154C25.4215 26.9886 24.265 25.832 22.8382 25.832C21.4115 25.832 20.2549 26.9886 20.2549 28.4154C20.2549 29.8421 21.4115 30.9987 22.8382 30.9987Z"
              fill="#FFFCF9"
            />
          </svg>
          {count > 0 && (
            <span className="absolute -end-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border border-white bg-red-600 px-1 text-xs font-medium text-white shadow">
              {count}
            </span>
          )}
        </div>
      </Link>
    </div>
  )
}

export default FloatingCart
