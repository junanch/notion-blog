import React from 'react'
import Grid from 'animated-grid-lines'
import tw, { styled } from 'twin.macro'

const GridLinesWrap = styled.section`
  ${tw`relative flex`}
`

const GridLine = styled(Grid)`
  ${tw`absolute top-0 left-0 right-0 bottom-0`}
`

const GridContainer = styled.div`
  ${tw`container 2xl:max-w-5xl xl:max-w-5xl lg:max-w-4xl mx-auto mt-48 mb-10 px-5 h-full`}
`

const GridBox = styled.div`
  ${tw`py-10 px-8 bg-white bg-opacity-80 dark:bg-blue-900 dark:bg-opacity-80 shadow-md relative`}
`

const GridLines: React.FC = ({ children }: { children?: React.ReactNode }) => {
  return (
    <GridLinesWrap css={[children ? '' : tw`absolute top-0 left-0 right-0`]}>
      <GridLine />
      {children && (
        <GridContainer>
          <GridBox>{children}</GridBox>
        </GridContainer>
      )}
    </GridLinesWrap>
  )
}

export default GridLines
