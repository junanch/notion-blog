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
  ${tw`container 2xl:max-w-5xl xl:max-w-5xl lg:max-w-4xl mx-auto px-5 h-full`}
  margin-top: 6.1rem;
  margin-bottom: 3.1rem;
`

const GridBox = styled.div`
  ${tw`px-8 bg-white bg-opacity-80 dark:bg-blue-900 dark:bg-opacity-80 shadow-md relative`}
  padding-top: 2.3rem;
  padding-bottom: 2.3rem;
`

const GridLines: React.FC = ({ children }: { children?: React.ReactNode }) => {
  return (
    <GridLinesWrap css={[children ? '' : tw`absolute top-0 left-0 right-0`]}>
      <GridLine lineWidth={4} gridColor="rgb(128, 178, 237, 0.1)" />
      {children && (
        <GridContainer>
          <GridBox>{children}</GridBox>
        </GridContainer>
      )}
    </GridLinesWrap>
  )
}

export default GridLines
