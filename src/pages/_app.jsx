import { GlobalStyle } from '@/styles/styles'
import { setState } from '@/helpers/store'
import Header from '@/config'
import Layout from '@/components/layout/layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ReactQueryDevtools } from 'react-query/devtools'

import { QueryClient, QueryClientProvider } from 'react-query'

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: true,
})

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       refetchOnMount: false,
//       cacheTime: 1 * 60 * 60 * 1000,
//       staleTime: 1 * 60 * 60 * 1000,
//       retry: 1
//     },
//   },
// })

function App({ Component, pageProps = { title: 'index' } }) {
  const [queryClient] = useState(() => new QueryClient())

  const router = useRouter()

  useEffect(() => {
    setState({ router })
  }, [router])

  return (
    <>
      <Header title={pageProps.title} />
      <GlobalStyle />

      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>

        {Component?.r3f &&
          <LCanvas> {Component.r3f(pageProps)} </LCanvas>}

        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </>
  )
}

export default App
