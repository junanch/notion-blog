import React from 'react'
import Grid from 'animated-grid-lines'
import tw, { styled } from 'twin.macro'

const GridLinesWrap = styled.section`
  ${tw`relative flex`}
  min-height: calc(24px * 12);
`

const GridLine = styled(Grid)`
  ${tw`absolute top-0 left-0 right-0 bottom-0`}
`

const GridContainer = styled.div`
  ${tw`container 2xl:max-w-5xl xl:max-w-5xl lg:max-w-4xl mx-auto px-5 h-full self-end`}
  margin-bottom: calc(24px * 2);
`

const GridLines: React.FC = ({ children }: { children?: React.ReactNode }) => {
  return (
    <GridLinesWrap css={[children ? '' : tw`absolute top-0 left-0 right-0`]}>
      <GridLine gridColor="rgb(239, 246, 255)" />
      {children && <GridContainer>{children}</GridContainer>}
    </GridLinesWrap>
  )
}

export default GridLines
