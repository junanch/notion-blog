import React from 'react'
import NextHead from 'next/head'
import tw, { styled } from 'twin.macro'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PostItem, { PostCard } from '../components/PostItem'
import { IPost } from './[year]/[month]/[slug]'

const NOTION_BLOG_ID = process.env.NEXT_PUBLIC_NOTION_BLOG_ID
const MY_NAME = process.env.NEXT_PUBLIC_MY_NAME

interface IStaticProps {
  props: {
    posts: IPost[]
  }
  revalidate?: number
}

export const getAllPosts = async (): Promise<IPost[]> => {
  return await fetch(`https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`).then(res =>
    res.json()
  )
}

export const getStaticProps = async (): Promise<IStaticProps> => {
  const posts = (await getAllPosts()).filter(post => post.published)
  return {
    props: { posts },
    revalidate: 1
  }
}

const PostWrapper = styled.ul`
  ${tw`grid gap-1 mx-auto divide-gray-100`}
`

const Main = styled.main`
  ${tw`container sm:px-6 flex-grow justify-center 2xl:max-w-5xl xl:max-w-5xl lg:max-w-4xl mx-auto my-10 px-4!`}
`

const HomePages: React.FC<{ posts: IPost[] }> = ({ posts }: { posts: IPost[] }) => {
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
                  <PostCard key={post.id}>
                    <PostItem post={post} />
                  </PostCard>
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
