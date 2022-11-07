import { GlobalStyle } from '@/styles/styles'
import { setState } from '@/helpers/store'
import Header from '@/config'
import Layout from '@/components/layout/layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ReactQueryDevtools } from 'react-query/devtools'

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: true,
})

function App({ Component, pageProps = { title: 'index' } }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        cacheTime: 1 * 60 * 60 * 1000,
        staleTime: Infinity,
        retry: 1
      },
    }
  }))

  const router = useRouter()

  useEffect(() => {
    setState({ router })
  }, [router])

  return (
    <>
      <Header title={pageProps.title} />
      <GlobalStyle />

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>

          {Component?.r3f &&
            <LCanvas> {Component.r3f(pageProps)} </LCanvas>}

          <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default App
