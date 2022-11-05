import { useObjectScrollStore } from '@/helpers/store'
import useProjects from '@/queries/useProjects'
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

const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})

const Page = () => {


  const { projects, isLoading } = useProjects()
  const { setObjectPos } = useObjectScrollStore()

  const [scrollPos, setScrollPos] = useState(0)
  const scrollRef = useRef()

  useEffect(() => {
    const setPos = () => setScrollPos(scrollRef.current.scrollTop)

    scrollRef.current?.addEventListener('scroll', setPos)
    return () => scrollRef.current?.removeEventListener('scroll', setPos)
  }, [isLoading])

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
    <Box route='/' />
  </>
)

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Projects',
    },
  }
}
