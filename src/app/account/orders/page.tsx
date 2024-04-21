import { Log } from '@/lib/logs'
import { ProductOrderInfo } from '@/lib/types/global.types'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import CourierGif from '@/assets/gifs/courier.gif'
import React from 'react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Swagman | Orders',
  description: '',
}

interface OrderDetails {
  _id: string
  products: ProductOrderInfo[]
  totalAmount: number
}

const UserOrderPage = async () => {
  const sessionCookie = cookies().get('session').value
  let orders: OrderDetails[] = []
  let orderCount = 0
  try {
    Log.log('I AM HERE')
    const res = await fetch(`${process.env.API_URL}api/orders`, {
      method: 'GET',
      headers: {
        Authorization: sessionCookie,
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      const text = JSON.parse(await res.text())

      throw new Error(text.message)
    }

    const data = await res.json()

    Log.log(data)
    orders = data?.data?.items || []
    orderCount = data?.data?.length || 0
  } catch (err) {}

  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-center font-bold text-4xl'>Orders</h1>
      <ul className='grid grid-cols-2 gap-3'>
        {orderCount === 0 && (
          <li className='col-span-2 text-center mt-5 flex flex-col gap-2 items-center'>
            <Image
              src={CourierGif}
              alt='No order Found'
              width={150}
              height={150}
            />
            <span className='text-xl font-medium'>No Order Found !!</span>
          </li>
        )}
        {orders.map((order) => (
          <li
            key={order._id}
            className='shadow rounded border border-charcoal-grey border-opacity-20 p-5'>
            <p>Order Id: {order._id}</p>
            <p>Products</p>
            {order.products.map((prd) => (
              <div key={prd.id}>
                <p>{prd.name}</p>
                <p>{prd.price}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserOrderPage
