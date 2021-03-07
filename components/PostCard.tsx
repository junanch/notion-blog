import tw, { styled } from 'twin.macro'

const PostItem = styled.div`
  ${tw`flex flex-col flex-1 p-4 cursor-pointer rounded-lg hover:bg-gray-50 `}
`

const PostCard = (post) => {
  return <PostItem>1</PostItem>
}

export default PostCard
