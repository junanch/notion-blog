import React from 'react'
import tw, { styled } from 'twin.macro'
import { CalendarIcon } from '@heroicons/react/outline'
import { IPost } from '../pages/[year]/[month]/[slug]'

const PostTitleWrapper = styled.header`
  ${tw`p-8 bg-white bg-opacity-80 dark:bg-blue-900 dark:bg-opacity-80 shadow-md relative`}
`

const Title = styled.h1`
  ${tw`text-4xl font-medium mb-4 break-all text-gray-800`}
`

const PostTitle: React.FC<{ post: IPost }> = ({ post }: { post: IPost }) => {
  return (
    <PostTitleWrapper>
      <Title>{post.name}</Title>

      <div className="text-lg text-gray-600 flex items-center space-x-1">
        <time className="flex items-center">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <time>{new Date(post.date).toLocaleDateString()}</time>
        </time>
      </div>
    </PostTitleWrapper>
  )
}

export default PostTitle
