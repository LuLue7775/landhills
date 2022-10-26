import useProjects from '@/queries/useProjects'
import { StyledProject, StyledRow, StyledItems, StyledImage, StyledText } from '@/styles/styles'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'


const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})

const Page = (props) => {
  const { projects, error, isLoading, isError, isSuccess } = useProjects()

  useEffect(() => {
    console.log(projects)
  }, [projects])

  return (
    <StyledProject>
      <StyledRow>
        {projects?.map((project, i) => (
          <StyledItems key={i} >
            <StyledImage
              key={project.id}
              className="images"
              draggable="false"
              src={project.project_cover_image.guid}
              alt="image"
            // layout="fill"
            // height="600"
            // width="400"
            // objectFit="contain"
            />

            <StyledText>
              <div> {project.title.rendered} </div>
              <div> {project.project_number} </div>
            </StyledText>

          </StyledItems>
        ))}

      </StyledRow>

    </StyledProject>
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
