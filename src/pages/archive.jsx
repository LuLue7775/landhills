import { StyledPages, StyledTableWrapper, StyledImageWrapper } from '@/styles/styles'
// import { UpArrow, DownArrow } from '@/components/icons/arrows'
import useProjects from '@/queries/useProjects'
import { useProjectStore } from '@/helpers/store'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'

const Box = dynamic(() => import('@/components/canvas/Box'), {
    ssr: false,
})

const columns = [
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: '',
    },
    {
        name: '',
    },
    {
        name: 'Location',
        selector: row => row.location,
        sortable: true,
    },
    {
        name: 'Type',
        selector: row => row.type,
        sortable: true,
    },
    {
        name: 'Year',
        selector: row => row.year,
        sortable: true,
    },
    {
        name: 'No.',
        selector: row => row.no,
        sortable: true,
    },
];


const Page = (props) => {
    const { projects, error, isLoading, isError, isSuccess } = useProjects()
    const { filteredProjects, setFilterdProjects } = useProjectStore()
    const [projectImage, setProjectImage] = useState('')
    const [imagePos, setImagePos] = useState({})

    useEffect(() => {
        const filterd_projects = projects?.reduce((filteredData, project, index) => {
            filteredData.push({
                id: index,
                title: project.title.rendered,
                location: project.project_location,
                type: project.project_category[0].slug,
                year: project.project_date.slice(0, 4),
                no: project.project_number,
                image: project.project_cover_image.guid,
            })

            return filteredData
        }, [])
        setFilterdProjects(filterd_projects)
    }, [projects])

    const handleRowClicked = () => {
        // go to single project route
    }

    const handleRowMouseEnter = e => {
        setProjectImage(e.image)
        setImagePos({ mouseY: (e.id + 1) * 52 + 100 })
    }


    return (
        <StyledPages>
            <StyledTableWrapper>
                <DataTable
                    columns={columns}
                    data={filteredProjects}
                    highlightOnHover={true}
                    onRowClicked={handleRowClicked}
                    onRowMouseEnter={handleRowMouseEnter}
                    responsive={true}
                // sortIcon={<DownArrow />}
                />

                {projectImage &&
                    <StyledImageWrapper mouseY={imagePos.mouseY}>
                        <Image
                            draggable="false"
                            src={projectImage}
                            alt="image"
                            layout="fixed"
                            height={200}
                            width={200}
                            objectFit="contain"
                        />
                    </StyledImageWrapper>
                }
            </StyledTableWrapper>
            <div className='blockk'> </div>
        </StyledPages>
    )
}


export default Page

export async function getStaticProps() {
    return {
        props: {
            title: 'Archive',
        },
    }
}

