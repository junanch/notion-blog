import React from 'react'
import NextHead from 'next/head'
import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'
import { Code, Equation, NotionRenderer } from 'react-notion-x'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import PostTitle from '../../../components/PostTitle'
import Disqus from '../../../components/Disqus'
import { getAllPosts, Post } from '../..'
import { formatSlug } from '../../../utils/slugFormat'
import Pagination, { IPagination } from '../../../components/Pagination'

const MY_NAME = process.env.NEXT_PUBLIC_MY_NAME
const notion = new NotionAPI()

export interface IStaticProps {
  props: {
    post: Post
    recordMap: ExtendedRecordMap
    pagination: IPagination
  }
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

  return {
    props: {
      recordMap,
      post,
      pagination
    },
    revalidate: 1
  }
}

const BlogPost: React.FC<{ post: Post; recordMap: ExtendedRecordMap; pagination: IPagination }> = ({
  post,
  recordMap,
  pagination
}: {
  post: Post
  recordMap: ExtendedRecordMap
  pagination: IPagination
}) => {
  if (!post) return null

  return (
    <>
      <NextHead>
        <title>
          {post.name} - {MY_NAME} Blog
        </title>
      </NextHead>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <section className="container mx-auto max-w-4xl! px-4">
          <PostTitle post={post} />

          <NotionRenderer recordMap={recordMap} components={{ code: Code, equation: Equation }} />

          <Pagination pagination={pagination} />

          <Disqus post={post} />
        </section>

        <Footer />
      </div>
    </>
  )
}

// 动态路径
export const getStaticPaths = async (): Promise<{ paths: string[]; fallback: boolean }> => {
  const table = (await getAllPosts()).filter(post => post.published)
  return {
    paths: table.map(row => formatSlug(row.date, row.slug)),
    fallback: true
  }
}

export default BlogPost
