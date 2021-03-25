import React from 'react'
import tw, { styled } from 'twin.macro'
import { CalendarOutline } from 'heroicons-react'
import { IPost } from '../pages'

const PostTitleWrapper = styled.header`
  ${tw`mb-12 text-center`}
`

const PostTitle: React.FC<{ post: IPost }> = ({ post }: { post: IPost }) => {
  return (
    <PostTitleWrapper>
      <div className="text-3xl font-bold mb-3">{post.name}</div>

      <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
        <div className="flex items-center">
          <CalendarOutline size={16} className="mr-2" />
          <span>{new Date(post.date).toLocaleDateString()} · </span>
        </div>
        {post.author.map(author => (
          <div key={author.id} className="flex items-center space-x-1 flex-shrink-0">
            <img src={author.profilePhoto} alt="profile photo" className="w-6 h-6 rounded-full" />
            <span className="hidden md:block">{author.fullName}</span>
          </div>
        ))}
      </div>
    </PostTitleWrapper>
  )
}

export default PostTitle
