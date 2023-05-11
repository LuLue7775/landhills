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
import { useState, useRef } from 'react';
import { useRouter } from 'next/router'
import DataTable from 'react-data-table-component'
import useViewport from '@/utils/useViewport'
import { useEffect } from 'react'
import gsap from 'gsap'

const Page = ({ projects }) => {
    const router = useRouter()
    /** @TODO useProjectsQuery unable to fetch */
    const { isLoading } = useProjectsQuery()

    const hoverImgRef = useRef()

    const handleRowMouseEnter = (row, e) => {
        if (viewport === 'tablet' || viewport === 'mobile' || hideImage) return

        hoverImgRef.current?.setImg(row.image)
        hoverImgRef.current?.setIndex(row.index)
    }
    const handleRowMouseLeave = () => {
        if (viewport === 'tablet' || viewport === 'mobile' || hideImage) return

        hoverImgRef.current.setImg('')
    }

    const viewport = useViewport()

    const [sort, setSort] = useState(false)
    const [sortedCol, setSortedCol] = useState()
    const [hideImage, setHideImage] = useState(false)
    const ref = useRef()

    useEffect(() => {
        if (!sortedCol) return
        const el = document.querySelector(`[data-column-id="${sortedCol?.selectedColumn.id}"]`);
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
                        onRowMouseEnter={(row, e,) => handleRowMouseEnter(row, e)}
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
                        onRowExpandToggled={(expanded) => expanded ? setHideImage(false) : setHideImage(true)} // hide float image
                    />

                    {viewport !== 'tablet' && viewport !== 'mobile' && !hideImage &&
                        <ArchiveImage ref={hoverImgRef} />
                    }





                    <div style={{ position: 'relative', height: '150px' }}>  </div>
                </StyledTableWrapper>
            </StyledPages>
    )
}

Page.r3f = (props) => (
    <>
    </>
)

export default Page

/**
 * either prefetch or fetch with ISR
 * @TODO make this react-query again
 */
export async function getServerSideProps() {
    // const queryClient = new QueryClient()
    // const data = await queryClient.fetchQuery(['projects'], getProjects)

    const projectsTotalPageHeader = await fetch(`https://landhills.co/wp-json/wp/v2/projects?per_page=20`)
        .then((res) => {
            return res.headers.get('X-WP-TotalPages')
        })
    const fetchAll = async () => {
        let fetchTotalListUrls = []
        if (projectsTotalPageHeader !== 1) {
            [...Array(parseInt(projectsTotalPageHeader)).keys()].forEach(page => {
                fetchTotalListUrls.push(`https://landhills.co/wp-json/wp/v2/projects?per_page=20&page=${page + 1}`)
            })
        }

        try {
            const content = await Promise.all(
                fetchTotalListUrls.map((url, i) =>
                    fetch(url).then(res => res.json()
                    ))
            )

            return content.flat()
        } catch (err) {
            throw (err);
        }
    }
    const projects = await fetchAll()

    const sortedData = transformProjects(projects).sort(() => Math.random() - 0.5)
    const reIndex = sortedData.map((data, i) => {
        data.index = i
        return data
    })
    /**
     * @WANRING Now we are not using our custom hook
     */
    return {
        props: {
            title: 'Archive',
            // dehydratedState: dehydrate(queryClient),
            projects: reIndex,
        }
    }
}
