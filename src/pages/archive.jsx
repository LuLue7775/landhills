import {
    StyledPages,
    StyledTableWrapper,
    StyledLoaderContainer,
    StyledLoader
} from '@/styles/styles'
// import { UpArrow, DownArrow } from '@/components/icons/arrows'
import { columns, customStyles } from '@/components/datatable/table_custom_properties'
import useProjectsQuery, { getProjects, transformProjects } from '@/queries/useProjectsQuery'
import ArchiveImage from '@/components/archiveImage'
import ExpandedComponent from '@/components/datatable/ExpandedComponent'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useState } from 'react';
import { useRouter } from 'next/router'
import DataTable from 'react-data-table-component'
import useViewport from '@/utils/useViewport'
import { useRef } from 'react'
import { useEffect } from 'react'
import gsap from 'gsap'
const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
    ssr: false,
})

const Page = ({ projects }) => {
    const router = useRouter()
    /** @TODO useProjectsQuery unable to fetch */
    // const { isLoading } = useProjectsQuery()
    const [projectImage, setProjectImage] = useState('')


    const handleRowMouseEnter = target => setProjectImage(target.image)
    const handleRowMouseLeave = () => setProjectImage('')

    const viewport = useViewport()

    const [sort, setSort] = useState(false)
    const [sortedCol, setSortedCol] = useState()
    const [hideImage, setHideImage] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const el = document.querySelector(`[data-column-id="${sortedCol.selectedColumn.id}"]`);
        const icon = el?.querySelector("span")
        if (!icon) return
        if (sortedCol.sortDirection === 'asc') {
            gsap.to(icon, {
                rotation: 180
            })
        } else {
            gsap.to(icon, {
                rotation: 0
            })
        }
    }, [sortedCol])

    return (
        // isLoading ?
        //     <StyledLoaderContainer>
        //         <StyledLoader />
        //     </StyledLoaderContainer>
        //     :
        <StyledPages>
            <StyledTableWrapper>
                <DataTable
                    columns={columns}
                    data={projects}
                    highlightOnHover={true}
                    onRowMouseEnter={handleRowMouseEnter}
                    onRowMouseLeave={handleRowMouseLeave}
                    responsive={true}
                    customStyles={customStyles}
                    expandableRows={true}
                    expandOnRowClicked={true}
                    expandableRowsComponent={ExpandedComponent}
                    expandableRowsHideExpander={true}
                    sortIcon={
                        <span
                            ref={ref}
                            onClick={() => setSort(!sort)}
                            style={{
                                transform: `rotate(90deg)`,
                                display: 'block',
                                margin: '4px'
                            }}
                        > ＞ </span>
                    }

                    onSort={(selectedColumn, sortDirection, sortedRows) => setSortedCol({ selectedColumn, sortDirection })}
                    onRowExpandToggled={(expanded,) => expanded ? setHideImage(false) : setHideImage(true)} // hide float image
                />

                {viewport !== 'tablet' && viewport !== 'mobile' &&
                    projectImage && hideImage &&
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

/**
 * either prefetch or fetch with ISR
 * @TODO make this react-query again
 */
export async function getStaticProps() {
    // const queryClient = new QueryClient()
    // const data = await queryClient.fetchQuery(['projects'], getProjects)

    const data = await fetch(`https://landhills.co/wp-json/wp/v2/projects`)
    const project = await data.json()

    const sortedData = transformProjects(project).sort(() => Math.random() - 0.5)
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
