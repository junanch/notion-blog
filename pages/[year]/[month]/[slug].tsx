import { CalendarOutline } from 'heroicons-react'
import NextHead from 'next/head'
import React from 'react'
import { BlockMapType, NotionRenderer } from 'react-notion'
import 'prismjs/themes/prism-tomorrow.css'
import 'react-notion/src/styles.css'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import Pagination, { IPagination } from '../../../components/Pagination'
import { getAllPosts, Post } from '../..'
import { formatSlug } from '../../../utils/util'

const MY_NAME = process.env.NEXT_PUBLIC_MY_NAME

export interface IStaticProps {
  props: {
    blocks: Promise<Response>
    post: Post
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
  const posts = await getAllPosts()

  // find the current blogpost by slug
  const postIndex = posts.findIndex(post => post.slug === slug)
  const post = posts[postIndex]

  const pagination = {
    prev: postIndex - 1 >= 0 ? posts[postIndex - 1] : null,
    next: postIndex + 1 < posts.length ? posts[postIndex + 1] : null
  }

  const blocks: Promise<Response> = await fetch(
    `https://notion-api.splitbee.io/v1/page/${post.id}`
  ).then(res => res.json())

  return {
    props: {
      blocks,
      post,
      pagination
    },
    revalidate: 1
  }
}

const BlogPost: React.FC<{ post: Post; blocks: BlockMapType; pagination: IPagination }> = ({
  post,
  blocks,
  pagination
}: {
  post: Post
  blocks: BlockMapType
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

        <div className="container mx-auto px-6 justify-center flex-grow max-w-4xl">
          <div className="my-16 mx-auto max-w-3xl">
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

            <NotionRenderer blockMap={blocks} />

            <Pagination pagination={pagination} />
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export const getStaticPaths = async (): Promise<{ paths: string[]; fallback: boolean }> => {
  const table = await getAllPosts()
  return {
    paths: table.map(row => formatSlug(row.date, row.slug)),
    fallback: true
  }
}

export default BlogPost
