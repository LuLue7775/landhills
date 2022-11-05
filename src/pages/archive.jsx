import {
    StyledPages,
    StyledTableWrapper,
    StyledImageWrapper,
    StyledLoaderContainer,
    StyledLoader
} from '@/styles/styles'
// import { UpArrow, DownArrow } from '@/components/icons/arrows'
import useProjects from '@/queries/useProjects'
import { useProjectStore } from '@/helpers/store'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'
import { useRouter } from 'next/router'

const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
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


const Page = () => {
    const router = useRouter()
    const { projects, isLoading } = useProjects()
    const { filteredProjects, setFilterdProjects } = useProjectStore()
    const [projectImage, setProjectImage] = useState('')
    const [imagePos, setImagePos] = useState({})

    useEffect(() => {
        const filterd_projects = projects?.reduce((filteredData, project, index) => {
            filteredData.push({
                id: project.id,
                index: index,
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
    }, [projects, setFilterdProjects])

    const handleRowClicked = target => {
        router.push(
            process.env.NODE_ENV === 'development'
                ? `http://localhost:3000/projects/${target.id}`
                : `http://landhills.co/projects/${target.id}`
        )
    }

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
    return {
        props: {
            title: 'Archive',
        },
    }
}

