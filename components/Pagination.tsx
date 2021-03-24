import React from 'react'
import NextLink from 'next/link'
import { ChevronLeftOutline, ChevronRightOutline } from 'heroicons-react'
import { Post } from '../pages'
import { formatSlug } from '../utils/util'

export interface IPagination {
  prev: Post | null
  next: Post | null
}

const Pagination: React.FC<{ pagination: IPagination }> = ({
  pagination
}: {
  pagination: IPagination
}) => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
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
    </div>
  )
}

export default Pagination
