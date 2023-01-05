import {
    StyledPages,
    StyledTableWrapper,
    StyledImageWrapper,
    StyledLoaderContainer,
    StyledLoader
} from '@/styles/styles'
// import { UpArrow, DownArrow } from '@/components/icons/arrows'
import { columns, customStyles } from '@/components/table'
import useProjectsQuery, { getProjects } from '@/queries/useProjectsQuery'
import { useProjectStore } from '@/helpers/store'

import { QueryClient, dehydrate } from 'react-query'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'
import { useRouter } from 'next/router'

const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
    ssr: false,
})

const Page = () => {
    const router = useRouter()
    const { projects, isLoading } = useProjectsQuery()
    const [projectImage, setProjectImage] = useState('')
    const [imagePos, setImagePos] = useState({})

    const handleRowClicked = target => {
        router.push(
            process.env.NODE_ENV === 'development'
                ? `http://localhost:3000/projects/${target.id}`
                : `https://landhills.netlify.app/projects/${target.id}`
        )
    }

    /**
     * @TODO calculate mouseY based on realtime mouse curser 
     * 算目前滑鼠高度取區間，不要用target.index，因為sorting後會出錯
     */
    const handleRowMouseEnter = target => {
        setProjectImage(target.image)
        setImagePos({ mouseY: (target.index + 1) * 52 + 100 })
    }

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
                        responsive={true}
                        customStyles={customStyles}
                    />

                    {projectImage &&
                        <StyledImageWrapper mouseY={imagePos.mouseY}>
                            <Image
                                draggable="false"
                                src={projectImage}
                                alt="image"
                                height={200}
                                width={200}
                                style={{
                                    objectFit: 'contain',
                                }}
                            />
                        </StyledImageWrapper>
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
