'use client'
import { addToCartAction } from '@/lib/actions/actions'
import { CartContext } from '@/providers/Cart/Cart.provider'
import React, { useContext } from 'react'

const Test = () => {
  const cartState = useContext(CartContext)
  return (
    <button
      type='button'
      onClick={() => {
        addToCartAction({
          products: cartState.products.map((prd) => ({ ...prd, id: prd._id })),
          totalAmount: cartState.totalPrice,
        }).then((data) => console.log(data))
      }}>
      check
    </button>
  )
}

export default Test
