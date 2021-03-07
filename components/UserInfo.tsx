import Image from 'next/image'
import React from 'react'
import tw from 'twin.macro'

const UserInfo = () => {
  return (
    <section tw="mb-12">
      <div tw="inline-block shadow-lg rounded-full w-20 h-20">
        <Image
          tw="rounded-full"
          src="/images/avatar.png"
          alt="avatar"
          width="100%"
          height="100%"
        />
      </div>
      <div tw="mt-8 text-2xl font-bold">Juan Chen Blog</div>
      <div tw="mt-2 text-gray-400">
        Check out{' '}
        <a tw="text-purple-400 hover:bg-purple-100 p-1 rounded">Friends & Guestbook</a>
        if you want to drop by and say hello!
      </div>
    </section>
  )
}

export default UserInfo
