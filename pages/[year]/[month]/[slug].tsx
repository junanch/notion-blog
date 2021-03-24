import { CalendarOutline, HomeOutline } from 'heroicons-react'
import Link from 'next/link'
import 'prismjs/themes/prism-tomorrow.css'
import { FC } from 'react'
import { BlockMapType, NotionRenderer } from 'react-notion'
import 'react-notion/src/styles.css'
import { getAllPosts, Post } from '../..'
import Footer from '../../../components/Footer'
import { formatSlug } from '../../../utils/util'

interface IStaticProps {
  props: {
    blocks: Promise<Response>
    post: Post
  }
  revalidate?: number
}

interface IParams {
  slug: string
}

export const getStaticProps = async ({
  params: { slug }
}: {
  params: IParams
}): Promise<IStaticProps> => {
  // Get all posts again
  const posts = await getAllPosts()

  // Find the current blogpost by slug
  const post = posts.find(t => t.slug === slug)

  const blocks: Promise<Response> = await fetch(
    `https://notion-api.splitbee.io/v1/page/${post.id}`
  ).then(res => res.json())

  return {
    props: {
      blocks,
      post
    },
    revalidate: 1
  }
}

const BlogPost: FC<{ post: Post; blocks: BlockMapType }> = ({
  post,
  blocks
}: {
  post: Post
  blocks: BlockMapType
}) => {
  if (!post) return null

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="container mt-4 inline-block p-4 sticky top-0 bg-white max-w-3xl! mx-auto">
        <Link href="/">
          <a className="flex -ml-2 p-2 rounded lg:hover:bg-gray-100">
            <HomeOutline className="mr-4" />
            <span>Home</span>
          </a>
        </Link>
      </nav>
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
        </div>
      </div>

      <Footer />
    </div>
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
