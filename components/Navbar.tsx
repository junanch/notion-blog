import Link from 'next/link'
import Image from 'next/image'
import tw, { styled } from 'twin.macro'
import React from 'react'

const Nav = styled.nav`
  ${tw`container flex items-center justify-between p-4 max-w-3xl mx-auto sticky top-0 bg-white`}
`

const LinkWrapper = styled.a`
  ${tw`flex items-center mr-3 hover:text-gray-700 md:mr-5`}
`

const ImageWrapper = styled.div`
  ${tw`inline-block shadow-lg rounded-full w-10 h-10 mr-3`}
`

const menu = [
  { title: 'Blog', href: '/' },
  { title: 'Product', href: '/' },
  { title: 'About', href: '/' },
]

const Navbar = () => {
  return (
    <Nav>
      <Link href="/">
        <LinkWrapper href="/">
          <ImageWrapper>
            <Image
              tw="rounded-full"
              src="/images/avatar.png"
              alt="avatar"
              width="100%"
              height="100%"
            />
          </ImageWrapper>
          Juan
        </LinkWrapper>
      </Link>
      <div tw="flex  mt-1 text-gray-600">
        {menu.map(item => (
          <Link href={item.href}>
            <LinkWrapper href={item.href}>{item.title}</LinkWrapper>
          </Link>
        ))}
      </div>
    </Nav>
  )
}

export default Navbar
