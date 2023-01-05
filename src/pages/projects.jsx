import { useProjectStore } from '@/helpers/store'
import useProjectsQuery, { getProjects } from '@/queries/useProjectsQuery'
import {
  StyledPages,
  StyledRow,
  StyledItems,
  StyledImage,
  StyledText,
  StyledLoader,
  StyledLoaderContainer,
  StyledImageInfo
} from '@/styles/styles'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { QueryClient, dehydrate } from 'react-query'

const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
  ssr: false,
})

const Page = () => {

  const { projects, isLoading } = useProjectsQuery()

  // const [scrollPos, setScrollPos] = useState(0)
  const scrollRef = useRef()
  // useEffect(() => {
  //   const setPos = () => setScrollPos(scrollRef.current.scrollTop)

  //   scrollRef.current?.addEventListener('scroll', setPos)
  //   return () => scrollRef.current?.removeEventListener('scroll', setPos)
  // }, [isLoading])

  // const { setObjectPos } = useObjectScrollStore()
  // useEffect(() => {
  //   const currentScrollPos = parseInt(scrollPos / 500)
  //   setObjectPos([currentScrollPos, 1, 1])
  // }, [scrollPos])



  return (
    // isLoading ?
    //   <StyledLoaderContainer>
    //     <StyledLoader />
    //   </StyledLoaderContainer>
    //   :
    // <StyledPages ref={scrollRef}>
    //   <StyledRow>
    //     {
    //       rawProjects?.map(project => (
    //         <StyledItems key={project.id} >
    //           <figure style={{ display: "block", position: "relative" }}>
    //             <StyledImage
    //               className="images"
    //               draggable="false"
    //               src={project.project_cover_image.guid}
    //               alt="image"
    //             />
    //           </figure>

    //           <StyledText>
    //             <div> {project.title.rendered} </div>
    //             <div> {project.project_number} </div>
    //           </StyledText>

    //         </StyledItems>
    //       ))
    //     }
    //   </StyledRow>
    // </StyledPages>

    <StyledPages ref={scrollRef}>
      <StyledRow>
        {
          projects?.map(project => (
            <StyledItems key={project.id}>
              <Link href={`/projects/${project.id}`}>
                <Image
                  alt="projects"
                  src={project.image}
                  width={300} // these two are useless now, just to bypass nextJS
                  height={300}
                  // sizes="100vw"
                  style={{
                    width: 'auto',
                    height: 'auto',
                    position: 'absolute',
                    bottom: 0,
                    left: 0
                  }}
                />
              </Link>
              <StyledImageInfo>
                <b> {project.title} </b>
                <p> {project.no} </p>
              </StyledImageInfo>
            </StyledItems>
          ))
        }
      </StyledRow>
    </StyledPages>



  )
}

Page.r3f = (props) => (
  <>
    <Shader />
  </>
)

export default Page

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('projects', getProjects)
  /**
   * Use dehydrate to dehydrate the query cache and pass it to the page via the dehydratedState prop. 
   * This is the same prop that the cache will be picked up from in your _app.js
   */
  return {
    props: {
      title: 'Projects',
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60
  }
}
