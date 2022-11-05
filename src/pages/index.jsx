import Carousel from '@/components/carousel'
import { StyledImageLink, StyledTextMedium, StyledLoader, StyledLoaderContainer } from '@/styles/styles'

import dynamic from 'next/dynamic'
import useHome from '@/queries/useHome'
import Image from 'next/image'
import DOMPurify from 'isomorphic-dompurify';

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
  const { home, isLoading } = useHome()
  const { current_event, home_images } = home?.[0] || []

  return (
    isLoading ?
      <StyledLoaderContainer>
        <StyledLoader />
      </StyledLoaderContainer>
      : <>
        <Carousel>
          {
            home_images?.map(imageData => (
              <StyledImageLink key={imageData.id}
                draggable="false"
                href={imageData.image_link}
              >
                <Image
                  key={imageData.id}
                  className="images"
                  draggable="false"
                  src={imageData.image}
                  alt="image"
                  layout="fill"
                  objectFit="contain"
                />
              </StyledImageLink>
            ))
          }
        </Carousel>
        <StyledTextMedium dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(current_event) }} />
      </>
  )
}

// canvas components goes here
// It will receive same props as Page component (from getStaticProps, etc.)
Page.r3f = (props) => (
  <>
    <Shader />
  </>
)

// Page.r3f = (props) => (
//   <>
//     <Box route='/' />
//   </>
// )

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
