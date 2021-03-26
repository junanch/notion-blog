import React from 'react'
import { DiscussionEmbed } from 'disqus-react'
import tw, { styled } from 'twin.macro'
import { formatSlug } from '../utils/slugFormat'
import { IPost } from '../pages/[year]/[month]/[slug]'

const DISQUS_SHORTNAME = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME

const DisqusWrapper = styled.section`
  ${tw`mt-8`}
`

const Disqus: React.FC<{ post: IPost }> = ({ post }: { post: IPost }) => {
  return (
    <DisqusWrapper>
      <DiscussionEmbed
        shortname={DISQUS_SHORTNAME}
        config={{ identifier: formatSlug(post.date, post.slug) }}
      />
    </DisqusWrapper>
  )
}

export default Disqus
