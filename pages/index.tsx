import React from 'react'
import tw, { styled } from 'twin.macro'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PostCard from '../components/PostCard'

const NOTION_BLOG_ID = process.env.NOTION_BLOG_ID || '661514f8aa7a48ae9f554186a440ff99'

export interface Author {
  id: string
  firstName: string
  lastName: string
  fullName: string
  profilePhoto: string
}

export interface Post {
  id: string
  name: string
  tag: string
  published: boolean
  date: string
  slug: string
  author: Author[]
  preview: string
}

export const getAllPosts = async (): Promise<Post[]> => {
  return await fetch(`https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`).then(res =>
    res.json()
  )
}

export const getStaticProps = async (): Promise<{ props: { posts: Post[] } }> => {
  const posts = await getAllPosts()
  return {
    props: { posts }
  }
}

const PostWrapper = styled.section`
  ${tw`grid gap-4 mx-auto divide-gray-100`}
`

const Main = styled.main`
  ${tw`container mx-auto px-4 sm:px-6 justify-center flex-grow max-w-3xl! my-10`}
`

const HomePages: React.FC<{ posts: Post[] }> = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="relative flex flex-col min-h-screen bg-white">
      <Navbar />
      <Main>
        <PostWrapper>
          {posts.map(post => post.published && <PostCard key={post.id} post={post} />)}
        </PostWrapper>
      </Main>
      <Footer />
    </div>
  )
}

export default HomePages
