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
  ${tw`container 2xl:max-w-5xl xl:max-w-5xl lg:max-w-4xl mx-auto flex items-center justify-between py-4 px-8`}
`

const Link = styled.a`
  ${tw`flex items-center mr-3 hover:text-gray-700 md:mr-5 font-medium`}
`

const Image = styled.img`
  ${tw`inline-block shadow-lg rounded-full w-10 h-10 mr-3`}
`

const UserName = styled.div`
  ${tw`font-normal text-gray-600 text-xl flex items-center h-10`}
`

const Navbar: React.FC<IProps> = ({ githubInfo }: IProps) => {
  return (
    <Nav>
      <Container>
        <NextLink href="/">
          <Link href="/">
            <Image src={githubInfo.avatar} alt="avatar" />
            <UserName>Home</UserName>
          </Link>
        </NextLink>
        <ul tw="flex mt-1 text-gray-600">
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
