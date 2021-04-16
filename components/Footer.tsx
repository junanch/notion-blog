import React from 'react'
import tw, { styled } from 'twin.macro'
import { HeartIcon } from '@heroicons/react/solid'

const MY_NAME = process.env.NEXT_PUBLIC_MY_NAME

const Foot = styled.footer`
  ${tw`w-full p-4 text-center text-gray-400 border-t`}
`

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear()

  return (
    <Foot>
      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          {MY_NAME}
          <HeartIcon className="w-5 h-5 mx-1" />
          2020-{currentYear}
        </div>
      </div>
    </Foot>
  )
}

export default Footer
