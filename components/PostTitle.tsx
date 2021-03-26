import React from 'react'
import tw, { styled } from 'twin.macro'
import { CalendarOutline } from 'heroicons-react'
import { IPost } from '../pages/[year]/[month]/[slug]'

const PostTitleWrapper = styled.header`
  ${tw``}
`

const PostTitle: React.FC<{ post: IPost }> = ({ post }: { post: IPost }) => {
  return (
    <PostTitleWrapper>
      <div className="text-4xl font-bold mb-4 break-all">{post.name}</div>

      <div className="text-lg text-gray-600 flex items-center space-x-1">
        <time className="flex items-center italic">
          <CalendarOutline size={18} className="mr-2" />
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </time>
      </div>
    </PostTitleWrapper>
  )
}

export default PostTitle
