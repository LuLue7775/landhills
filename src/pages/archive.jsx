import {
    StyledPages,
    StyledTableWrapper,
    StyledLoaderContainer,
    StyledLoader
} from '@/styles/styles'
// import { UpArrow, DownArrow } from '@/components/icons/arrows'
import { columns, customStyles } from '@/components/table'
import useProjectsQuery, { getProjects } from '@/queries/useProjectsQuery'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useState } from 'react';
import DataTable from 'react-data-table-component'
import { useRouter } from 'next/router'
import ArchiveImage from '@/components/archiveImage'

const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
    ssr: false,
})

const Page = () => {
    const router = useRouter()
    const { projects, isLoading } = useProjectsQuery()
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
    await queryClient.prefetchQuery(['projects'], getProjects)
    /**
     * Use dehydrate to dehydrate the query cache and pass it to the page via the dehydratedState prop. 
     * This is the same prop that the cache will be picked up from in your _app.js
     */
    return {
        props: {
            title: 'Archive',
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 1
    }
}
