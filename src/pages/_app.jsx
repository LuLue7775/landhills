import { setState } from '@/helpers/store'
import Header from '@/config'
import Dom from '@/components/layout/dom'
import '@/styles/index.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { ReactQueryDevtools } from 'react-query/devtools'

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

        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </>
  )
}

export default App
