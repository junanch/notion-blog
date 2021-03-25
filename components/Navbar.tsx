import React from 'react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import tw, { styled } from 'twin.macro'

const MY_NAME = process.env.NEXT_PUBLIC_MY_NAME

const Nav = styled.nav`
  ${tw`sticky top-0 bg-white z-10 shadow`}
`

const Container = styled.div`
  ${tw`container 2xl:max-w-5xl xl:max-w-5xl lg:max-w-4xl mx-auto flex items-center justify-between p-4`}
`

const Link = styled.a`
  ${tw`flex items-center mr-3 hover:text-gray-700 md:mr-5`}
`

const Image = styled.div`
  ${tw`inline-block shadow-lg rounded-full w-10 h-10 mr-3`}
`

const UserName = styled.div`
  ${tw`font-medium text-3xl flex items-center h-10`}
`

const menu = [
  { title: 'Blog', href: '/' },
  { title: 'Projects', href: '/' },
  { title: 'About', href: '/' }
]

const Navbar: React.FC = () => {
  return (
    <Nav>
      <Container>
        <NextLink href="/">
          <Link href="/">
            <Image>
              <NextImage
                tw="rounded-full"
                src="/images/avatar.png"
                alt="avatar"
                width="100%"
                height="100%"
              />
            </Image>
            <UserName>{MY_NAME}</UserName>
          </Link>
        </NextLink>
        <ul tw="flex  mt-1 text-gray-600">
          {menu.map((item, index) => (
            <li key={index}>
              <NextLink href={item.href}>
                <Link href={item.href}>{item.title}</Link>
              </NextLink>
            </li>
          ))}
        </ul>
      </Container>
    </Nav>
  )
}

export default Navbar
