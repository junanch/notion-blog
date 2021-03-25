import React from 'react'
import tw, { styled } from 'twin.macro'
import NextLink from 'next/link'
import { IPost } from '../pages/index'
import { formatSlug } from '../utils/slugFormat'
import { CalendarOutline, TagOutline } from 'heroicons-react'

export const PostCard = styled.div`
  ${tw`flex flex-col flex-1 p-4 cursor-pointer rounded-lg hover:bg-gray-50 `}
`

const PostItem: React.FC<{ post: IPost }> = ({ post }: { post: IPost }) => {
  return (
    <NextLink href="/[year]/[month]/[slug]" as={formatSlug(post.date, post.slug)}>
      <a className="p-4 hover:bg-gray-50">
        <div className="rounded-xl mb-2 px-2 py-1 text-blue-800 bg-blue-100 text-sm inline-block">
          <div className="flex items-center space-x-1">
            <TagOutline size={16} /> <span>{post.tag}</span>
          </div>
        </div>
        <div className="font-bold text-xl mb-1">{post.name}</div>
        <div className="text-sm text-gray-400 mb-2">{post.preview}</div>
        <div className="text-sm text-gray-400 flex items-center space-x-1">
          <CalendarOutline size={16} />
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
      </a>
    </NextLink>
  )
}

export default PostItem
