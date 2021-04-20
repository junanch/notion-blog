import React from 'react'
import NextLink from 'next/link'
import { IPost } from '../pages/[year]/[month]/[slug]'
import { formatSlug } from '../utils/slugFormat'
import tw, { styled } from 'twin.macro'

export interface IPagination {
  prev: IPost | null
  next: IPost | null
}

const PaginationWrapper = styled.section`
  ${tw`flex leading-6 font-medium my-8`}
`

const Link = styled.a`
  ${tw`flex items-center transition-colors duration-200 text-gray-500`}
  &:hover {
    color: #0e7490;
  }
`

const Pagination: React.FC<{ pagination: IPagination }> = ({
  pagination
}: {
  pagination: IPagination
}) => {
  return (
    <PaginationWrapper
      css={[!pagination.prev && !pagination.next && tw`hidden`]}
    >
      {pagination.prev ? (
        <NextLink
          href="/[year]/[month]/[slug]"
          as={formatSlug(pagination.prev.date, pagination.prev.slug)}
        >
          <Link
            tw="mr-8"
            href={formatSlug(pagination.prev.date, pagination.prev.slug)}
          >
            <div tw="mr-2">←</div>
            {pagination.prev?.name}
          </Link>
        </NextLink>
      ) : (
        <div className="w-full">&nbsp;</div>
      )}
      {pagination.next ? (
        <NextLink
          href="/[year]/[month]/[slug]"
          as={formatSlug(pagination.next.date, pagination.next.slug)}
        >
          <Link
            tw="ml-auto text-right"
            href={formatSlug(pagination.next.date, pagination.next.slug)}
          >
            {pagination.next?.name}
            <div tw="ml-2">→</div>
          </Link>
        </NextLink>
      ) : (
        <div className="w-full">&nbsp;</div>
      )}
    </PaginationWrapper>
  )
}

export default Pagination
