import {
  StyledPages,
  StyledRow,
  StyledItems,
  StyledLoader,
  StyledLoaderContainer,
  StyledImageInfo,
  StyledImage,
  StyledText
} from '@/styles/styles'
import useProjectsQuery, { getProjects } from '@/queries/useProjectsQuery'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { QueryClient, dehydrate } from '@tanstack/react-query'

const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
  ssr: false,
})

const Page = () => {

  const { projects, isLoading } = useProjectsQuery()
  console.log(projects)
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
    isLoading ?
      <StyledLoaderContainer>
        <StyledLoader />
      </StyledLoaderContainer>
      :
      <StyledPages ref={scrollRef}>
        <StyledRow>
          {
            projects?.map(project => (
              <StyledItems key={project.id} >
                <Link href={`/projects/${project.id}`}>
                  <StyledImage
                    className="images"
                    draggable="false"
                    src={project.image}
                    alt="image"
                  />

                  <StyledText>
                    <div> {project.title} </div>
                    <div> {project.no} </div>
                  </StyledText>
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
    revalidate: 1
  }
}
