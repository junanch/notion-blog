import React from 'react'
import NextHead from 'next/head'
import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'
import tw, { styled } from 'twin.macro'
import { Equation, NotionRenderer } from 'react-notion-x'
import NotionCode from '../../../components/NotionCode'
import Navbar, { IGithubInfo, getGithubInfo } from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import PostTitle from '../../../components/PostTitle'
import GridLines from '../../../components/GridLines'
import { getAllPosts } from '../../index'
import { formatSlug } from '../../../utils/slugFormat'
import Pagination, { IPagination } from '../../../components/Pagination'

const MY_NAME = process.env.NEXT_PUBLIC_MY_NAME
const notion = new NotionAPI()

export interface IAuthor {
  id: string
  firstName: string
  lastName: string
  fullName: string
  profilePhoto: string
}

export interface IPost {
  id: string
  name: string
  tag: string[]
  published: boolean
  date: string
  slug: string
  author: IAuthor[]
  preview?: string
}

interface IProps {
  post: IPost
  recordMap: ExtendedRecordMap
  pagination: IPagination
  githubInfo: IGithubInfo
}

export interface IStaticProps {
  props: IProps
  revalidate?: number
}

export const getStaticProps = async ({
  params: { slug }
}: {
  params: { slug: string }
}): Promise<IStaticProps> => {
  const posts = (await getAllPosts()).filter(post => post.published)

  const postIndex = posts.findIndex(post => post.slug === slug)
  const post = posts[postIndex]

  const pagination = {
    prev: postIndex - 1 >= 0 ? posts[postIndex - 1] : null,
    next: postIndex + 1 < posts.length ? posts[postIndex + 1] : null
  }

  const recordMap = await notion.getPage(post?.id)

  const { avatar_url: avatar, ...githubInfo } = await getGithubInfo()

  return {
    props: {
      recordMap,
      post,
      pagination,
      githubInfo: { ...githubInfo, avatar }
    },
    revalidate: 1
  }
}

const NotionMain = styled(NotionRenderer)`
  ${tw`px-2`}
`

const BlogPost = ({
  post,
  recordMap,
  pagination,
  githubInfo
}: IProps): React.ReactNode => {
  if (!post) return null

  return (
    <>
      <NextHead>
        <title>
          {post.name} - {MY_NAME}&apos;s Blog
        </title>
      </NextHead>

      <div className="min-h-screen flex flex-col">
        <Navbar githubInfo={githubInfo} />

        <GridLines>
          <PostTitle post={post} />
        </GridLines>

        <section className="container 2xl:max-w-5xl xl:max-w-5xl lg:max-w-4xl mx-auto px-4! my-8">
          <NotionMain
            recordMap={recordMap}
            components={{ code: NotionCode, equation: Equation }}
          />

          {/* <hr tw="border-gray-100 my-8" /> */}

          <Pagination pagination={pagination} />
        </section>

        <Footer />
      </div>
    </>
  )
}

// 动态路径
export const getStaticPaths = async (): Promise<{
  paths: string[]
  fallback: boolean
}> => {
  const table = (await getAllPosts()).filter(post => post.published)
  return {
    paths: table.map(row => formatSlug(row.date, row.slug)),
    fallback: true
  }
}

export default BlogPost
