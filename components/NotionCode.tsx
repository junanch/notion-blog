import React from 'react'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'dracula-prism/dist/css/dracula-prism.css'
import tw, { styled } from 'twin.macro'

const PreStyle = tw`text-lg py-8 relative`

const Pre = styled.pre`
  &::-webkit-scrollbar {
    ${tw`h-2`}
  }

  &::-webkit-scrollbar-track {
    ${tw`rounded-b-lg`}
  }

  &::-webkit-scrollbar-thumb {
    ${tw`rounded-lg`}
  }
`

const NotionCodeWrap = styled.div`
  ${tw`relative w-full`}
`

const Toolbar = styled.section`
  ${tw`absolute top-3 right-3 text-xs flex space-x-2`}
  color: #F8F8F2;
  z-index: 1;
`

const LanguageTag = styled.label`
  ${tw`py-0.5 px-2 rounded-b-lg`}
  background-color: #BD93F9;
`

const CopyButton = styled.button`
  ${tw`py-0.5 px-2 rounded-b-lg active:bg-purple-500`}
  background-color: #BD93F9;
`

const copyText = async code => {
  try {
    await navigator.clipboard.writeText(code)
  } catch (err) {
    console.error(err)
  }
}

const Code: React.FC<{ code: string; language: string }> = ({
  code,
  language = 'javascript'
}: {
  code: string
  language: string
}) => {
  const languageL = language.toLowerCase()
  const prismLanguage = languages[languageL] || languages.javascript

  return (
    <NotionCodeWrap>
      <Toolbar>
        <LanguageTag>{languageL}</LanguageTag>
        <CopyButton onClick={() => copyText(code)}>copy</CopyButton>
      </Toolbar>

      <Pre className={`notion-code language-${languageL}`} style={PreStyle}>
        <code
          className={`language-${languageL}`}
          dangerouslySetInnerHTML={{
            __html: highlight(code, prismLanguage, language)
          }}
        />
      </Pre>
    </NotionCodeWrap>
  )
}

export default Code
