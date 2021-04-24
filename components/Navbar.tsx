import React from 'react'
import NextLink from 'next/link'
import tw, { styled } from 'twin.macro'

export interface IGithubInfo {
  name: string
  [propName: string]: string
}

interface IProps {
  githubInfo: IGithubInfo
}

// config
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME
const menu = [
  { title: 'Blog', href: '/' },
  { title: 'Notes', href: '/notes' },
  { title: 'About', href: '/about' }
]

export const getGithubInfo = async (): Promise<IGithubInfo> => {
  return await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}`
  ).then(res => res.json())
}

// style
const Nav = styled.nav`
  ${tw`sticky top-0 bg-white z-10 shadow`}
`

const Container = styled.div`
  ${tw`container 2xl:max-w-5xl xl:max-w-5xl lg:max-w-4xl mx-auto flex items-center justify-between py-4 pl-12 pr-8`}
`

const Link = styled.a`
  ${tw`flex items-center font-medium`}
  &:hover {
    color: #0e7490;
    box-shadow: inset 0 -0.125em 0 0 #fff,
      inset 0 -0.375em 0 0 rgba(165, 243, 252, 0.4);
  }
`

const Image = styled.img`
  ${tw`inline-block shadow-lg rounded-full w-10 h-10`}
`

const MenuWrap = styled.ul`
  ${tw`flex text-gray-600 space-x-5 sm:space-x-10`}
`

const Navbar: React.FC<IProps> = ({ githubInfo }: IProps) => {
  return (
    <Nav>
      <Container>
        <NextLink href="/">
          <Link tw="hover:shadow-none" href="/">
            <Image src={githubInfo?.avatar} alt="avatar" />
          </Link>
        </NextLink>
        <MenuWrap>
          {menu.map((item, index) => (
            <li key={index}>
              <NextLink href={item.href}>
                <Link href={item.href}>{item.title}</Link>
              </NextLink>
            </li>
          ))}
        </MenuWrap>
      </Container>
    </Nav>
  )
}

export default Navbar
