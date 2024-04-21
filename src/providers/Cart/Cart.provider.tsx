'use client'
import { Log } from '@/lib/logs'
import { ProductBrief } from '@/lib/types/client.types'
import React, {
  createContext,
  ReactNode,
  useReducer,
  useRef,
  useState,
} from 'react'

type ProductState = ProductBrief & { quantity: number }

type CartContextT = {
  products: ProductState[]
  addToCart: (product: ProductBrief) => void
  removeFromCart: (productId: string) => void
  totalQuantity: number
  totalPrice: number
  cartIsVisible: boolean
  showCart: () => void
  hideCart: () => void
  deleteItemFromCart: (productId: string) => void
  reset: () => void
}

type CartState = {
  products: ProductState[]
  totalQuantity: number
  totalPrice: number
}

type CartReducerFn = (
  state: CartState,
  action: {
    payload: ProductBrief | string | ExistingCart[]
    type: 'add' | 'remove' | 'deleteItem' | 'hydrateCart' | 'reset'
  }
) => CartState

export const CartContext = createContext<CartContextT>({
  products: [],
  addToCart: (prd) => {},
  removeFromCart: (_id) => {},
  totalQuantity: 0,
  totalPrice: 0,
  cartIsVisible: false,
  hideCart: () => {},
  showCart: () => {},
  deleteItemFromCart: (prdId) => {},
  reset: () => {},
})

const init: CartState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
}

const cartReducer: CartReducerFn = (state, action) => {
  const { payload, type } = action

  const products = JSON.parse(JSON.stringify(state.products)) as ProductState[] // creating a deep copy of products to avoid multiple renders
  let totalPrice = state.totalPrice // total price
  let totalQuantity = state.totalQuantity // total quantity

  if (type === 'add') {
    const prdIndex = products.findIndex(
      (p) => p._id === (payload as ProductBrief)._id
    ) // finding product index
    totalPrice = totalPrice + (payload as ProductBrief).price // incrementing total price
    totalQuantity++ // incrementing total quantity

    if (prdIndex === -1) {
      products.push({ ...(payload as ProductBrief), quantity: 1 }) // adding product
    } else {
      products[prdIndex].quantity++ // updating quantity
    }
  }

  if (type === 'remove') {
    const prdIndex = products.findIndex((p) => p._id === (payload as string))
    const product = products[prdIndex]
    totalQuantity-- // decreasing quantity
    totalPrice = totalPrice - product.price // decreasing price

    if (prdIndex > -1) {
      if (product.quantity > 1) {
        products[prdIndex].quantity-- // decreasing product quantity
      } else {
        products.splice(prdIndex, 1) // removing product
      }
    }
  }

  if (type === 'deleteItem') {
    const prdIndex = products.findIndex((p) => p._id === (payload as string))
    if (prdIndex > -1) {
      const product = products[prdIndex]
      totalQuantity = totalQuantity - product.quantity // decreasing quantity by product quantity
      totalPrice = totalPrice - product.price * product.quantity // decreasing price by product price * its quantity

      products.splice(prdIndex, 1) // removing product
    }
  }

  if (type === 'hydrateCart') {
    ;(payload as ExistingCart[]).forEach((prd) => {
      products.push({ ...prd, _id: prd.id })

      totalQuantity += prd.quantity
      totalPrice = totalPrice + prd.quantity * prd.price
    })
  }

  if (type === 'reset') {
    return init
  }

  return {
    ...state.products,
    products,
    totalPrice,
    totalQuantity,
  }
}

interface ExistingCart {
  id: string
  size: string
  price: number
  quantity: number
  name: string
}

const CartProvider = ({
  children,
  existingCart,
}: {
  children: ReactNode
  existingCart?: string
}) => {
  const isInitialized = useRef(false)
  const [cart, cartDispatch] = useReducer(cartReducer, init)
  const [cartIsVisible, setCartIsVisible] = useState(false)

  if (!isInitialized.current) {
    const userCart: ExistingCart[] = existingCart
      ? JSON.parse(existingCart)
      : []

    cartDispatch({ payload: userCart, type: 'hydrateCart' })

    isInitialized.current = true
  }

  const addToCart = (product: ProductBrief) => {
    cartDispatch({ payload: product, type: 'add' })
  }

  const removeFromCart = (productId: string) => {
    cartDispatch({ payload: productId, type: 'remove' })
  }

  const deleteItemFromCart = (productId: string) => {
    cartDispatch({ payload: productId, type: 'deleteItem' })
  }

  const reset = () => cartDispatch({ payload: '', type: 'reset' })

  const showCart = () => setCartIsVisible(true)
  const hideCart = () => setCartIsVisible(false)

  return (
    <CartContext.Provider
      value={{
        ...cart,
        addToCart,
        removeFromCart,
        cartIsVisible,
        showCart,
        hideCart,
        reset,
        deleteItemFromCart,
      }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
