import React from 'react'
import NextHead from 'next/head'
import { CalendarOutline } from 'heroicons-react'
import { DiscussionEmbed } from 'disqus-react'
import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'
import { Code, Equation, NotionRenderer } from 'react-notion-x'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { getAllPosts, Post } from '../..'
import { formatSlug } from '../../../utils/slugFormat'
import Pagination, { IPagination } from '../../../components/Pagination'

const MY_NAME = process.env.NEXT_PUBLIC_MY_NAME
const DISQUS_SHORTNAME = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME
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
  // fetch all posts
  const posts = (await getAllPosts()).filter(post => post.published)

  // find the current blogpost by slug
  const postIndex = posts.findIndex(post => post.slug === slug)
  const post = posts[postIndex]

  const pagination = {
    prev: postIndex - 1 >= 0 ? posts[postIndex - 1] : null,
    next: postIndex + 1 < posts.length ? posts[postIndex + 1] : null
  }

  const recordMap = await notion.getPage(post!.id)

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

        <div className="container mx-auto max-w-4xl! px-4">
          <div className="mb-12 text-center">
            <div className="text-3xl font-bold mb-3">{post.name}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
              <div className="flex items-center">
                <CalendarOutline size={16} className="mr-2" />
                <span>{new Date(post.date).toLocaleDateString()} · </span>
              </div>
              {post.author.map(author => (
                <div key={author.id} className="flex items-center space-x-1 flex-shrink-0">
                  <img
                    src={author.profilePhoto}
                    alt="profile photo"
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="hidden md:block">{author.fullName}</span>
                </div>
              ))}
            </div>
          </div>

          <NotionRenderer recordMap={recordMap} components={{ code: Code, equation: Equation }} />

          <Pagination pagination={pagination} />

          <div className="mt-8">
            <DiscussionEmbed
              shortname={DISQUS_SHORTNAME}
              config={{ identifier: formatSlug(post.date, post.slug) }}
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export const getStaticPaths = async (): Promise<{ paths: string[]; fallback: boolean }> => {
  const table = (await getAllPosts()).filter(post => post.published)
  return {
    paths: table.map(row => formatSlug(row.date, row.slug)),
    fallback: true
  }
}

export default BlogPost
