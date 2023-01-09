import {
    StyledPages,
    StyledTableWrapper,
    StyledLoaderContainer,
    StyledLoader
} from '@/styles/styles'
// import { UpArrow, DownArrow } from '@/components/icons/arrows'
import { columns, customStyles } from '@/components/table'
import useProjectsQuery, { getProjects, transformProjects } from '@/queries/useProjectsQuery'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useState } from 'react';
import DataTable from 'react-data-table-component'
import { useRouter } from 'next/router'
import ArchiveImage from '@/components/archiveImage'

const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
    ssr: false,
})

const Page = ({ projects }) => {
    const router = useRouter()
    const { isLoading } = useProjectsQuery()
    const [projectImage, setProjectImage] = useState('')

    const handleRowClicked = target => {
        router.push(
            process.env.NODE_ENV === 'development'
                ? `http://localhost:3000/projects/${target.id}`
                : `https://landhills.netlify.app/projects/${target.id}`
        )
    }

    const handleRowMouseEnter = target => setProjectImage(target.image)
    const handleRowMouseLeave = () => setProjectImage('')

    return (
        isLoading ?
            <StyledLoaderContainer>
                <StyledLoader />
            </StyledLoaderContainer>
            :
            <StyledPages>
                <StyledTableWrapper>
                    <DataTable
                        columns={columns}
                        data={projects}
                        highlightOnHover={true}
                        onRowClicked={handleRowClicked}
                        onRowMouseEnter={handleRowMouseEnter}
                        onRowMouseLeave={handleRowMouseLeave}
                        responsive={true}
                        customStyles={customStyles}
                    />

                    {projectImage &&
                        <ArchiveImage projectImage={projectImage} />
                    }
                </StyledTableWrapper>
                <div className='block'> </div>
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
    const data = await queryClient.fetchQuery(['projects'], getProjects)
    const sortedData = transformProjects(data).sort(() => Math.random() - 0.5)
    /**
     * @WANRING Now we are not using our custom hook
     */
    return {
        props: {
            title: 'Archive',
            // dehydratedState: dehydrate(queryClient),
            projects: sortedData
        },
        revalidate: 1
    }
}
