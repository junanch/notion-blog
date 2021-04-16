import React from 'react'
import NextLink from 'next/link'
import tw, { styled } from 'twin.macro'
import { formatSlug } from '../utils/slugFormat'
import { CalendarOutline, TagOutline } from 'heroicons-react'
import { IPost } from '../pages/[year]/[month]/[slug]'

export const PostCard = styled.li`
  ${tw`flex cursor-pointer rounded-xl hover:bg-gray-50`}
`

const LinkWrap = styled.a`
  ${tw`w-full p-4`}
`

const TitleWrap = styled.div`
  ${tw`font-bold text-xl mb-3 text-gray-700`}
`

const DateWrap = styled.div`
  ${tw`text-sm text-gray-400 flex items-center space-x-1 mb-2`}
`

const Description = styled.div`
  ${tw`text-sm text-gray-400`}
`

const TagWrap = styled.section`
  ${tw`flex space-x-2 mt-3`}
`

const Tag = styled.label`
  ${tw`rounded-xl px-2 py-1 text-blue-800 bg-blue-100 text-sm flex items-center space-x-1`}
`

const PostItem: React.FC<{ post: IPost }> = ({ post }: { post: IPost }) => {
  return (
    <NextLink href="/[year]/[month]/[slug]" as={formatSlug(post.date, post.slug)}>
      <LinkWrap href={formatSlug(post.date, post.slug)}>
        <TitleWrap>{post.name}</TitleWrap>
        <DateWrap>
          <CalendarOutline size={16} />
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </DateWrap>
        <Description>{post.preview}</Description>
        <TagWrap>
          {post.tag.map(
            tag =>
              tag && (
                <Tag key={tag}>
                  <TagOutline size={16} />
                  <span>{tag}</span>
                </Tag>
              )
          )}
        </TagWrap>
      </LinkWrap>
    </NextLink>
  )
}

export default PostItem
