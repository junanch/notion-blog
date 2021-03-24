import React from 'react'
import NextHead from 'next/head'
import tw, { styled } from 'twin.macro'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PostCard, { PostItem } from '../components/PostCard'

const NOTION_BLOG_ID = process.env.NEXT_PUBLIC_NOTION_BLOG_ID
const MY_NAME = process.env.NEXT_PUBLIC_MY_NAME

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

interface IStaticProps {
  props: {
    posts: Post[]
  }
  revalidate?: number
}

export const getAllPosts = async (): Promise<Post[]> => {
  return await fetch(`https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`).then(res =>
    res.json()
  )
}

export const getStaticProps = async (): Promise<IStaticProps> => {
  const posts = await getAllPosts()
  return {
    props: { posts },
    revalidate: 1
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
    <>
      <NextHead>
        <title>{MY_NAME} Blog</title>
      </NextHead>
      <div className="relative flex flex-col min-h-screen bg-white">
        <Navbar />
        <Main>
          <PostWrapper>
            {posts.map(
              post =>
                post.published && (
                  <PostItem key={post.id}>
                    <PostCard post={post} />
                  </PostItem>
                )
            )}
          </PostWrapper>
        </Main>
        <Footer />
      </div>
    </>
  )
}

export default HomePages
