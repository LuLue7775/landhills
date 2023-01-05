import { useProjectSingleStore } from '@/helpers/store'
import {
    StyledWrap,
    StyledCover,
    StyledProjectGrid,
    StyledProjectContent,
    StyledProjectTitle,
    StyledText,
    StyledProjectCoverImageContainer,
    StyledRow,
    StyledItems,
    StyledImage,
    StyledLoaderContainer,
    StyledLoader
} from '@/styles/styles'
import { withCSR } from '@/HOC/withCSR'
import { QueryClient, dehydrate } from 'react-query'
import { useEffect } from 'react'
import Image from 'next/image'
import { getSingleProject, useSingleProjectQuery } from '@/queries/useProjectsQuery'
import { useRouter } from 'next/router'

export default function ProjectsSinglePage({ isError }) {
    const { filteredProjectContent, setFilterdProjects } = useProjectSingleStore()
    const { query: { projectId } } = useRouter()
    const { project, isLoading } = useSingleProjectQuery(projectId)

    useEffect(() => {
        // console.log(project)
        const filterdData = {
            title: project?.title.rendered,
            coverImage: project?.project_cover_image.guid,
            content: project?.content.rendered,
            images: project?.project_images,
            date: project?.project_date
        }
        setFilterdProjects(filterdData)
    }, [project, setFilterdProjects])

    useEffect(() => {
        console.log(filteredProjectContent)
    }, [filteredProjectContent])
    return (
        isLoading ?
            <StyledLoaderContainer>
                <StyledLoader />
            </StyledLoaderContainer>
            :
            <StyledWrap>
                <StyledCover>
                    <StyledProjectGrid>
                        <StyledProjectContent>
                            <StyledProjectTitle> {filteredProjectContent?.title} </StyledProjectTitle>
                            <StyledText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(filteredProjectContent?.content) }} />
                        </StyledProjectContent>
                        <StyledProjectCoverImageContainer>
                            {filteredProjectContent?.coverImage &&
                                <Image
                                    className="image"
                                    draggable="false"
                                    src={filteredProjectContent.coverImage}
                                    alt="image"
                                    height="100"
                                    width="100"
                                    style={{
                                        objectFit: "contain"
                                    }} />
                            }
                        </StyledProjectCoverImageContainer>
                    </StyledProjectGrid>
                </StyledCover>

                <StyledRow>
                    {filteredProjectContent?.images &&
                        filteredProjectContent?.images?.map(imageData => (
                            <StyledItems key={imageData.ID}>
                                <StyledImage
                                    className="images"
                                    draggable="false"
                                    src={imageData.guid}
                                    alt="image"
                                />
                            </StyledItems>
                        ))}
                </StyledRow>
            </StyledWrap>
    )
}

// export async function getStaticPaths() {
//     const res = await fetch(`https://landhills.co/wp-json/wp/v2/projects`)
//     const id = await res.json()
//     const idArr = id?.reduce((filteredIdArr, data) => {
//         filteredIdArr.push({
//             params: { projectId: `${data.id}` }
//         })
//         return filteredIdArr
//     }, [])

//     return {
//         paths: idArr,
//         fallback: false
//     }
// }

// export async function getStaticProps({ params }) {
//     const res = await fetch(`https://landhills.co/wp-json/wp/v2/projects/${params.projectId}`)
//     const data = await res.json()

//     return {
//         props: {
//             data
//         }
//     }
// }

export const getServerSideProps = withCSR(async (ctx) => {

    console.log('getServerSideProps');

    const { projectId } = ctx.params;

    const queryClient = new QueryClient();

    let isError = false;

    try {
        await queryClient.fetchQuery(`project-${projectId}`, () => getSingleProject(projectId));
    } catch (error) {
        isError = true
        ctx.res.statusCode = error.response.status;
    }

    return {
        props: {
            //also passing down isError state to show a custom error component.
            isError,
            dehydratedState: dehydrate(queryClient),
        },
    }
})
