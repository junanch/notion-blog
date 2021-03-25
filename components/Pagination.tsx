import React from 'react'
import NextLink from 'next/link'
import { ChevronLeftOutline, ChevronRightOutline } from 'heroicons-react'
import { IPost } from '../pages'
import { formatSlug } from '../utils/slugFormat'
import tw, { styled } from 'twin.macro'

export interface IPagination {
  prev: IPost | null
  next: IPost | null
}

const PaginationWrapper = styled.section`
  ${tw`mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600`}
`

const Pagination: React.FC<{ pagination: IPagination }> = ({
  pagination
}: {
  pagination: IPagination
}) => {
  return (
    <PaginationWrapper>
      {pagination.prev && (
        <NextLink
          href="/[year]/[month]/[slug]"
          as={formatSlug(pagination.prev.date, pagination.prev.slug)}>
          <a className="p-4 border-2 border-gray-100 bg-white hover:border-gray-300 flex items-center justify-between space-x-2">
            <ChevronLeftOutline size={20} />
            <span>{pagination.prev?.name}</span>
          </a>
        </NextLink>
      )}
      {pagination.next && (
        <NextLink
          href="/[year]/[month]/[slug]"
          as={formatSlug(pagination.next.date, pagination.next.slug)}>
          <a className="p-4 border-2 border-gray-100 bg-white hover:border-gray-300 flex items-center justify-between space-x-2">
            <span>{pagination.next?.name}</span>
            <ChevronRightOutline size={20} />
          </a>
        </NextLink>
      )}
    </PaginationWrapper>
  )
}

export default Pagination
