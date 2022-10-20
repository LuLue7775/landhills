import useProjects from '@/queries/useProjects'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})

const Page = (props) => {
  const { projects, error, isLoading, isError, isSuccess } = useProjects()

  useEffect(() => {
    console.log(projects)
  }, [projects])

  return (
    <>
      <div> THIS IS PROJECTS</div>

    </>
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
