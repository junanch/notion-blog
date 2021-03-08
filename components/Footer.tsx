import tw, { styled } from 'twin.macro'

const Foot = styled.footer`
  ${tw`w-full p-4 text-center text-gray-400 border-t`}
`
const Link = styled.a`
  ${tw`hover:text-gray-500`}
`

const Footer = () => {
  const currentYear: number = new Date().getFullYear()

  return (
    <Foot>
      <div className="container mx-auto">
        <div>
          Powered by <Link href="https://nextjs.org/">Next.js</Link>,{' '}
          <Link href="https://tailwindcss.com/">Tailwind CSS</Link>,{' '}
          <Link href="https://notion.so">Notion</Link>.{' '}
        </div>
        <div>Juan © 2020-{currentYear}</div>
      </div>
    </Foot>
  )
}

export default Footer
