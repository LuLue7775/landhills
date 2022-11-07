import { useProjectStore } from '@/helpers/store'
import useProjects, { getProjects } from '@/queries/useProjects'
import {
  StyledPages,
  StyledRow,
  StyledItems,
  StyledImage,
  StyledText,
  StyledLoader,
  StyledLoaderContainer
} from '@/styles/styles'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { QueryClient, dehydrate } from 'react-query'

const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
  ssr: false,
})

const Page = ({ projects_query }) => {

  const { rawProjects, setRawProjects } = useProjectStore()
  useEffect(() => {
    setRawProjects(projects_query?.queries[0].state.data)
  }, [projects_query])

  // const { projects, isLoading } = useProjects()

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
    <StyledPages ref={scrollRef}>
      <StyledRow>
        {
          rawProjects?.map(project => (
            <StyledItems key={project.id} >
              <StyledImage
                className="images"
                draggable="false"
                src={project.project_cover_image.guid}
                alt="image"
              />

              <StyledText>
                <div> {project.title.rendered} </div>
                <div> {project.project_number} </div>
              </StyledText>

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

export async function getServerSideProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('projects', getProjects)

  // const projects = await getProjects()

  return {

    props: {
      title: 'Projects',
      // dehydratedState: dehydrate(queryClient),
      projects_query: dehydrate(queryClient),
    },
  }
}
