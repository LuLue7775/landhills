import useProjects from '@/queries/useProjects'
import { StyledPages, StyledRow, StyledItems, StyledImage, StyledText, StyledLoader, StyledLoaderContainer } from '@/styles/styles'
import dynamic from 'next/dynamic'

const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})

const Page = () => {
  const { projects, isLoading } = useProjects()

  return (
    isLoading ?
      <StyledLoaderContainer>
        <StyledLoader />
      </StyledLoaderContainer>
      :
      <StyledPages>
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
