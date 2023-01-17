import {
  StyledPages,
  StyledRow,
  StyledItems,
  StyledLoader,
  StyledLoaderContainer,
  StyledImageInfo,
  StyledImage,
} from '@/styles/styles'
import useProjectsQuery, { getProjects, transformProjects } from '@/queries/useProjectsQuery'
import { useMeshRefStore, useObjectScrollStore } from '@/helpers/store'
import useViewport, { projectShaderPosTable } from '@/utils/useViewport'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query'
import gsap from 'gsap'

const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
  ssr: false,
})

/**
 *  1sec after scroll put move queue
 */
const moveAnimation = ({ meshRef, queue }) => {
  if (!meshRef.current) return
  if (!queue[1]) return
  gsap.fromTo(meshRef.current.position, {
    x: queue[0].x,
    y: queue[0].y,
  }, {
    x: queue[1].x || 4,
    y: queue[1].y || 4,
    duration: 1,
  })
}
/**
 *  handle queue jobs
 */
const addNewPosToQueue = ({ animationQueueRef, viewport }) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      let getRandom = Math.floor(Math.random() * 4);
      const newPos = projectShaderPosTable[viewport][getRandom]
      animationQueueRef.current.push(newPos)
      resolve()
    }, 1000)
  })
}

const Page = ({ projects }) => {
  const { isLoading } = useProjectsQuery()
  // const queryClient = useQueryClient()
  // useEffect(() => {
  //   queryClient.setQueryData(['projects'], (data) => data.sort(() => Math.random() - 0.5))
  // }, [projects])

  /**
   * Detect scroll behavior, move mesh after 2sec scrolled. 
   * Move back to center when route change.
   */
  const [scrollPos, setScrollPos] = useState(0)
  const scrollRef = useRef()
  useEffect(() => {
    const scrollPos = scrollRef.current
    // detect scroll stop
    let timer = null;
    const handleScrollStopped = () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        setScrollPos(scrollPos.scrollTop)
      }, 350);
    }

    scrollPos?.addEventListener('scroll', handleScrollStopped)
    return () => scrollPos?.removeEventListener('scroll', handleScrollStopped)
  }, [isLoading])

  const viewport = useViewport()
  const { meshRef } = useMeshRefStore()
  const animationQueueRef = useRef([])

  useEffect(() => {
    if (!viewport) return

    const waitFor3 = async () => {
      addNewPosToQueue({ animationQueueRef, viewport })
        .then(() => { return moveAnimation({ meshRef, queue: animationQueueRef.current }) })
        .then(() => {
          if (animationQueueRef.current.length > 2) animationQueueRef.current.shift()
          if (animationQueueRef.current.length > 4) animationQueueRef.current.slice(0, 3)

        })
    }
    waitFor3()

    // delete jobs if job exceed certain number

  }, [scrollPos, meshRef.current])


  return (
    isLoading ?
      <StyledLoaderContainer>
        <StyledLoader />
      </StyledLoaderContainer>
      :
      <StyledPages ref={scrollRef}>
        <StyledRow >
          {
            projects?.map(project => (
              <StyledItems key={project.id} >
                <Link href={`${process.env.NODE_ENV !== 'production'
                  ? 'http://localhost:3001' : process.env.NEXT_PUBLIC_SITE_URL}/projects/${project.id}`}>
                  <StyledImage
                    className="images"
                    draggable="false"
                    src={project.image}
                    alt="image"
                  />
                  <StyledImageInfo>
                    <div> {project.title} </div>
                    <div> {project.no} </div>
                  </StyledImageInfo>
                </Link>
              </StyledItems>
            ))
          }
        </StyledRow>
      </StyledPages>

    // <StyledPages ref={scrollRef}>
    //   <StyledRow>
    //     {
    //       projects?.map(project => (
    //         <StyledItems key={project.id}>
    //           <Link href={`/projects/${project.id}`}>
    //             <Image
    //               alt="projects"
    //               src={project.image}
    //               width={300}
    //               height={300}
    //               style={{
    //                 width: 'auto',
    //                 height: '100%',
    //                 objectFit: 'contain'
    //               }}
    //             />
    //           </Link>
    //           <StyledImageInfo>
    //             <b> {project.title} </b>
    //             <p> {project.no} </p>
    //           </StyledImageInfo>
    //         </StyledItems>
    //       ))
    //     }
    //   </StyledRow>
    // </StyledPages>
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

  const data = await queryClient.fetchQuery(['projects'], getProjects)
  const sortedData = transformProjects(data).sort(() => Math.random() - 0.5)
  /**
   * @WANRING Now we are not using our custom hook
   */
  return {
    props: {
      title: 'Projects',
      // dehydratedState: dehydrate(queryClient),
      projects: sortedData
    },
    revalidate: 1
  }
}
