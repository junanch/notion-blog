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
  ${tw`flex text-sm text-gray-600 my-4 space-x-4`}
`

const Link = styled.a`
  ${tw`w-full p-4 border-2 border-gray-100 bg-white hover:border-gray-300 flex flex-col`}
`

const Pagination: React.FC<{ pagination: IPagination }> = ({
  pagination
}: {
  pagination: IPagination
}) => {
  return (
    <PaginationWrapper>
      {pagination.prev ? (
        <NextLink
          href="/[year]/[month]/[slug]"
          as={formatSlug(pagination.prev.date, pagination.prev.slug)}>
          <Link href={formatSlug(pagination.prev.date, pagination.prev.slug)}>
            <div className="font-semibold">Previous:</div>
            <div>{pagination.prev?.name}</div>
          </Link>
        </NextLink>
      ) : (
        <div className="w-full">&nbsp;</div>
      )}
      {pagination.next ? (
        <NextLink
          href="/[year]/[month]/[slug]"
          as={formatSlug(pagination.next.date, pagination.next.slug)}>
          <Link href={formatSlug(pagination.next.date, pagination.next.slug)}>
            <div className="font-semibold">Next:</div>
            <div>{pagination.next?.name}</div>
          </Link>
        </NextLink>
      ) : (
        <div className="w-full">&nbsp;</div>
      )}
    </PaginationWrapper>
  )
}

export default Pagination
