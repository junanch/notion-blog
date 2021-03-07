import React from 'react'
import tw, { styled } from 'twin.macro'
import Navbar from '../components/Navbar'
import UserInfo from '../components/UserInfo'
import Footer from '../components/Footer'
import PostCard from '../components/PostCard'

const PostWrapper = styled.section`
  ${tw`grid max-w-3xl gap-6 mx-auto mt-12 divide-gray-100`}
`

const HomePages = () => {
  return (
    <div tw="relative flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 justify-center flex-grow max-w-3xl my-16">
        <UserInfo />
        <PostWrapper>
          {[1, 2, 3, 4].map(post => (
            <PostCard key={post} post={post} />
          ))}
        </PostWrapper>
      </main>
      <Footer />
    </div>
  )
}

export default HomePages
