import tw, { styled } from 'twin.macro'

const Foot = styled.footer`
  ${tw`w-full p-4 text-center text-gray-400 bg-gray-800`}
`
const Link = styled.a`
  ${tw`hover:text-white`}
`

const Footer = () => {
  const currentYear: number = new Date().getFullYear()

  return (
    <Foot>
      <div className="container mx-auto">
        <div>
          Powered by <Link href="https://nextjs.org/">Next.js</Link>,{' '}
          <Link href="https://tailwindcss.com/">Tailwind CSS</Link>,{' '}
          <Link href="https://notion.so">Notion</Link>,{' '}
          <Link href="https://www.typescriptlang.org/">TypeScript.</Link>
        </div>
        <div>Spencer © 2020-{currentYear}</div>
      </div>
    </Foot>
  )
}

export default Footer
