import { useRouter } from 'next/router'
import { setState } from '@/helpers/store'
import { useEffect } from 'react'
import Header from '@/config'
import Dom from '@/components/layout/dom'
import '@/styles/index.css'
import dynamic from 'next/dynamic'

import { QueryClient, QueryClientProvider } from 'react-query'

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: true,
})

const queryClient = new QueryClient()

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter()

  useEffect(() => {
    setState({ router })
  }, [router])

  return (
    <>
      <Header title={pageProps.title} />
      <QueryClientProvider client={queryClient}>
        <Dom>
          <Component {...pageProps} />
        </Dom>
        {Component?.r3f && <LCanvas>{Component.r3f(pageProps)}</LCanvas>}
      </QueryClientProvider>
    </>
  )
}

export default App
