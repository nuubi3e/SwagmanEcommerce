import { getSession } from '@/lib/actions/actions'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import ProfileLink from './Link'
import { LogoutButton } from '@/components/Buttons/Buttons'

const profileLinks = [
  {
    href: 'orders',
    name: 'My Orders',
  },
  {
    href: 'profile',
    name: 'Acoount Details',
  },
]

const ProfileLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getSession()

  if (!session) return redirect('/')
  return (
    <section className='flex gap-5 max-md:flex-col'>
      <ul className='flex flex-col w-[313px] select-none max-md:w-full'>
        {profileLinks.map((link) => (
          <ProfileLink key={link.href} href={'/account/' + link.href}>
            {link.name}
          </ProfileLink>
        ))}
        <LogoutButton />
      </ul>
      <div className='flex-1'>{children}</div>
    </section>
  )
}

export default ProfileLayout
