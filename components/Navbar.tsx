import tw, { styled } from 'twin.macro'

const Nav = styled.nav`
  ${tw`container flex items-center justify-between pt-4 px-4 max-w-3xl mx-auto`}
`

const Link = styled.a`
  ${tw`mr-3 hover:text-gray-700 md:mr-5`}
`

const menu = [
  { title: 'Blog', href: '' },
  { title: 'Product', href: '/product' },
  { title: 'About', href: '/about' },
]

const Navbar = () => {
  return (
    <Nav>
      <Link title="Home" href="/">
        Home
      </Link>
      <div tw="flex  mt-1 text-gray-600">
        {menu.map(item => (
          <Link title={item.title} href={item.href}>
            {item.title}
          </Link>
        ))}
      </div>
    </Nav>
  )
}

export default Navbar
