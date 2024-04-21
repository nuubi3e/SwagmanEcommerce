'use server'
import { cookies } from 'next/headers'
import { Log } from '../logs'
import {
  ProductOrderInfo,
  ReviewPayload,
  UserSession,
} from '../types/global.types'

type ActionResponse<Response> = {
  status: 'success' | 'fail' | 'error'
  statusCode: number
  message: string
  ok: boolean
  data?: Response
}

// Action to get session
export const getSession: () => Promise<UserSession | null> = async () => {
  try {
    const session = cookies().get('session')?.value

    if (!session) throw new Error('Session not found')

    const res = await fetch(`${process.env.API_URL}api/verify`, {
      headers: { Authorization: session || '' },
    })

    if (!res.ok) {
      const text = JSON.parse(await res.text())

      throw new Error(text.message)
    }

    const data = await res.json()

    return data?.data?.user || null
  } catch (err) {
    return null
  }
}

export const logOutAction = async () => {
  cookies().delete('session')
  cookies().delete('order')
}

// Action to add a review
export const newReviewAction: (
  review: ReviewPayload
) => Promise<ActionResponse<undefined>> = async (review) => {
  try {
    const session = cookies().get('session')?.value

    const res = await fetch(`${process.env.API_URL}api/product/review`, {
      body: JSON.stringify(review),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: session || '',
      },
    })

    if (!res.ok) {
      const text = JSON.parse(await res.text())

      throw new Error(text.message)
    }

    const data = await res.json()

    return data
  } catch (err: any) {
    return {
      ok: false,
      message: err.message,
    }
  }
}

// Action to start login with email
export const loginAction: (
  email: string
) => Promise<ActionResponse<{ key: string }>> = async (email) => {
  try {
    const res = await fetch(`${process.env.API_URL}api/login`, {
      body: JSON.stringify({ email }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      const text = JSON.parse(await res.text())

      throw new Error(text.message)
    }

    const data = await res.json()

    return data
  } catch (err: any) {
    Log.error(err)
    return {
      ok: false,
      message: err.message,
    } // if otp send failed
  }
}

// Action to verify OTP
export const verifyOtpAction: (obj: {
  otp: number
  key: string
}) => Promise<ActionResponse<undefined>> = async ({ otp, key }) => {
  try {
    const res = await fetch(`${process.env.API_URL}api/login`, {
      method: 'PUT',
      body: JSON.stringify({ otp }),
      headers: {
        'Content-Type': 'application/json',
        'X-Key': key,
      },
    })

    if (!res.ok) {
      const text = JSON.parse(await res.text())

      throw new Error(text.message)
    }

    const data = await res.json()

    // setting auth token in http only cookie
    cookies().set('session', data.data.token, {
      expires: new Date(data.data.expiresTime),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      priority: 'high',
    })

    if (data.data?.orderId)
      // setting auth token in http only cookie
      cookies().set('order', data.data.orderId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        priority: 'high',
      })

    return data
  } catch (err: any) {
    return {
      ok: false,
      message: err.message,
      status: 'error',
      statusCode: 200,
    }
  }
}

interface OrderPayload {
  products: {
    id: string
    size: string
    quantity: number
    price: number
  }[]
  orderId: string
}

interface CartProducts {
  products: ProductOrderInfo[]
  totalAmount: number
}

export const addToCartAction: (
  order: CartProducts
) => Promise<ActionResponse<undefined>> = async (order) => {
  try {
    const session = cookies().get('session')?.value
    const orderId = cookies().get('order')?.value || undefined

    if (!session) throw new Error('User not found')

    Log.log(order)

    const res = await fetch(`${process.env.API_URL}api/orders`, {
      method: 'POST',
      body: JSON.stringify({ ...order, orderId }),
      headers: {
        Authorization: session,
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    cookies().set('order', data.data.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      priority: 'high',
    })
    return data
  } catch (err: any) {
    return {
      ok: false,
      status: 'fail',
      message: err.message,
    }
  }
}
