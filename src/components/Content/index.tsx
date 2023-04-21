// import { useAppStore } from '@/store'
import { FloatButton } from 'antd'
import React, { useRef } from 'react'
import styled from 'styled-components'

const ContentView = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
`

interface ContentProps {
  children: React.ReactNode
  loading?: boolean
}

const Content: React.FC<ContentProps> = ({ children }) => {
  // const [currentTab] = useAppStore((st) => [st.currentTab])
  const ref: any = useRef(null)

  // useEffect(() => {
  //   onUiLoaded(() => {
  //     const init = gradioApp().querySelector('#txt2img_results_view')
  //     if (init) return
  //     const txt2imgResults = gradioApp().querySelector('#txt2img_results')
  //     const txt2imgGenerate = gradioApp().querySelector('#txt2img_generate')
  //     if (txt2imgResults && txt2imgGenerate) {
  //       txt2imgResults.insertBefore(txt2imgGenerate, txt2imgResults.firstChild)
  //       const dom = document.createElement('div')
  //       dom.id = 'txt2img_results_view'
  //       dom.appendChild(txt2imgResults)
  //       gradioApp().querySelector('#tab_txt2img')?.appendChild(dom)
  //     }
  //   })
  // }, [])

  return (
    <ContentView ref={ref}>
      {children}
      <FloatButton.BackTop target={() => ref.current} />
    </ContentView>
  )
}

export default React.memo(Content)
