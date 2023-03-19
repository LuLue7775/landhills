import Carousel from '@/components/carousel'
import { StyledImageLink, StyledTextMedium, StyledLoader, StyledLoaderContainer } from '@/styles/styles'

import dynamic from 'next/dynamic'
import useHomeQuery, { getHome } from '@/queries/useHomeQuery'
import Image from 'next/image'
import DOMPurify from 'isomorphic-dompurify';
import { dehydrate, QueryClient } from '@tanstack/react-query'

// import Shader from '@/components/canvas/Shader/Shader'

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
  ssr: false,
})


// dom components goes here
const Page = () => {
  const { home, isLoading } = useHomeQuery()
  const { current_event, home_images } = home?.[0] || []

  return (
    isLoading ?
      <StyledLoaderContainer>
        <StyledLoader />
      </StyledLoaderContainer>
      : <div style={{ height: "100dvh", width: "100%", }}>

        <Carousel>
          {
            home_images?.map(imageData => (
              <StyledImageLink key={imageData.id}
                draggable="false"
                $hasLink={imageData.image_link ? true : false}
                href={imageData.image_link ? imageData.image_link : false}
              >
                <Image
                  key={imageData.id}
                  className="images"
                  draggable="false"
                  src={imageData.image}
                  alt="image"
                  responsive
                  width={2400}
                  height={1000}
                  style={{
                    width: '100%',
                    // height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </StyledImageLink>
            ))
          }
        </Carousel>

        <StyledTextMedium dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(current_event) }} />
      </div>
  )
}

// canvas components goes here
// It will receive same props as Page component (from getStaticProps, etc.)
Page.r3f = (props) => (
  <>
    <Shader />
  </>
)
export default Page

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['home'], getHome)
  /**
   * Use dehydrate to dehydrate the query cache and pass it to the page via the dehydratedState prop. 
   * This is the same prop that the cache will be picked up from in your _app.js
   */
  return {
    props: {
      title: 'Index',
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1
  }
}
