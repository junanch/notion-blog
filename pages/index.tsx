import React from 'react'
import NextHead from 'next/head'
import tw, { styled } from 'twin.macro'
import Navbar, { IGithubInfo, getGithubInfo } from '../components/Navbar'
import Footer from '../components/Footer'
import PostItem, { PostCard } from '../components/PostItem'
import { IPost } from './[year]/[month]/[slug]'

const NOTION_BLOG_ID = process.env.NEXT_PUBLIC_NOTION_BLOG_ID
const MY_NAME = process.env.NEXT_PUBLIC_MY_NAME

interface IProps {
  posts: IPost[]
  githubInfo: IGithubInfo
}

interface IStaticProps {
  props: IProps
  revalidate?: number
}

export const getAllPosts = async (): Promise<IPost[]> => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`
  ).then(res => res.json())
}

export const getStaticProps = async (): Promise<IStaticProps> => {
  const posts = (await getAllPosts()).filter(post => post.published)
  const { avatar_url: avatar, ...githubInfo } = await getGithubInfo()

  return {
    props: { posts, githubInfo: { ...githubInfo, avatar } },
    revalidate: 1
  }
}

const PostWrapper = styled.ul`
  ${tw`mx-auto`}
`

const Main = styled.main`
  ${tw`container flex-grow justify-center 2xl:max-w-5xl xl:max-w-5xl lg:max-w-4xl mx-auto 
  my-10 p-4! relative bg-white bg-opacity-90`}
`

const HomePages = ({ posts, githubInfo }: IProps): React.ReactNode => {
  return (
    <>
      <NextHead>
        <title>{MY_NAME}&apos;s Blog</title>
      </NextHead>
      <div className="relative flex flex-col min-h-screen bg-white">
        <Navbar githubInfo={githubInfo} />
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
