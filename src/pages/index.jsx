import Carousel from '@/components/carousel'
import { StyledImageLink, StyledLoader, StyledLoaderContainer, StyledSlide, StyledSlider, StyledTextHome } from '@/styles/styles'

import useHomeQuery, { getHome } from '@/queries/useHomeQuery'
import Image from 'next/image'
import DOMPurify from 'isomorphic-dompurify';
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Carousel2 from '@/components/Carousel2'


// dom components goes here
const Page = () => {
  const { home, isLoading } = useHomeQuery()
  const { current_event, home_images } = home?.[0] || []
  const [currSlide, setSlide] = useState(0)

  return (
    isLoading ?
      <StyledLoaderContainer>
        <StyledLoader />
      </StyledLoaderContainer>
      :
      <div style={{ height: "100dvh", width: "100%", }}>
        <Carousel2 amount={home_images?.length} currSlide={currSlide} setSlide={setSlide}>
          {home_images?.map((imageData, i) => (
            <StyledSlide key={i} className='slide'
              style={currSlide === i ? { opacity: '1' } : { opacity: '0' }}
            >
              <StyledImageLink key={imageData.id}
                draggable="false"
                $hasLink={imageData.image_link ? true : false}
                href={imageData.image_link ? imageData.image_link : ''}
              >
                <Image
                  key={imageData.id}
                  className="images"
                  draggable="false"
                  src={imageData.image}
                  alt="image"
                  width={1920}
                  height={1080}
                  sizes="100vw"
                  style={{
                    width: '100%',
                    minHeight: '100%',
                    objectFit: 'cover',
                  }}
                />
              </StyledImageLink>

            </StyledSlide>
          ))

          }
          <StyledTextHome style={{ position: 'absolute', right: '0', marginRight: '2rem', fontSize: '2rem' }}>
            {currSlide + 1}/{home_images?.length}
          </StyledTextHome>

        </Carousel2>

        <StyledTextHome className="home"
          style={{ fontStyle: "bold" }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(current_event) }} />

      </div >
  )
}

// canvas components goes here
// It will receive same props as Page component (from getStaticProps, etc.)
Page.r3f = (props) => (
  <>
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



        // <Carousel>
        //   <StyledImageLink key={'f1'}
        //     draggable="false"
        //   >
        //     <Image
        //       className="images"
        //       draggable="false"
        //       src={'https://fakeimg.pl/1920x1080/ff0000/'}
        //       alt="image"
        //       width={1920}
        //       height={1080}
        //       sizes="100vw"
        //       style={{
        //         width: '100%',
        //         minHeight: '100%',
        //         objectFit: 'cover',
        //       }}
        //     />
        //   </StyledImageLink>
        //   {
        //     home_images?.map(imageData => (
        //       <StyledImageLink key={imageData.id}
        //         draggable="false"
        //         $hasLink={imageData.image_link ? true : false}
        //         href={imageData.image_link ? imageData.image_link : ''}
        //       >
        //         <Image
        //           key={imageData.id}
        //           className="images"
        //           draggable="false"
        //           src={imageData.image}
        //           alt="image"
        //           // responsive="true"
        //           // width={1920}
        //           // height={1080}
        //           // style={{
        //           //   width: '110%',
        //           //   // width: 'auto',
        //           //   // height: 'auto',
        //           //   // height: '100%',
        //           //   objectFit: 'cover',
        //           //   // translate: 'transformX(-100%)'
        //           //   // position: 'absolute',
        //           //   // left: '0'

        //           // }}
        //           width={1920}
        //           height={1080}
        //           sizes="100vw"
        //           style={{
        //             width: '100%',
        //             minHeight: '100%',
        //             objectFit: 'cover',
        //             // minWidth: '100%',
        //             // textAlign: 'center',
        //             // transform: 'translate(-15%, -5%)'
        //           }}
        //         />
        //       </StyledImageLink>
        //     ))
        //   }

        // </Carousel>