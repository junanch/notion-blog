import React from 'react'
import tw, { styled } from 'twin.macro'

const MY_NAME = process.env.NEXT_PUBLIC_MY_NAME

const Foot = styled.footer`
  ${tw`w-full p-4 text-center text-gray-400 border-t`}
`
const Link = styled.a`
  ${tw`hover:text-gray-500`}
`

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear()

  return (
    <Foot>
      <div className="container mx-auto">
        <div>
          Powered by <Link href="https://nextjs.org/">Next.js</Link>,{' '}
          <Link href="https://tailwindcss.com/">Tailwind CSS</Link>,{' '}
          <Link href="https://notion.so">Notion</Link>.{' '}
        </div>
        <div>
          {MY_NAME} © 2020-{currentYear}
        </div>
      </div>
    </Foot>
  )
}

export default Footer
