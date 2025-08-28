'use client'

import React from 'react'

import { CartSummary } from './cart-summary'

type Props = {}

const Wrapper = (props: Props) => {
  const dummyData = {
    itemCount: 3,
    subtotal: 150,
    purchase: 150,
    purchaseTax: 15,
    deliveryPrice: 20,
    discountPercentage: 10,
    total: 175,
  }
  return (
    <section>
      <div className="container">
        <div className="flex">
          <div></div>
          <div>
            <CartSummary
              data={dummyData}
              onConfirmOrder={() => {
                console.log('Confirm order clicked')
              }}
              onPolicyClick={() => {
                console.log('Policy clicked')
              }}
              className=""
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Wrapper
