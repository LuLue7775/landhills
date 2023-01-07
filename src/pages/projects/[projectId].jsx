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
    StyledLoaderContainer,
    StyledLoader
} from '@/styles/styles'
import { withCSR } from '@/HOC/withCSR'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import Image from 'next/image'
import { getProjects, getSingleProject, useSingleProjectQuery } from '@/queries/useProjectsQuery'
import { useRouter } from 'next/router'

export default function ProjectsSinglePage({ isError }) {
    const { query: { projectId } } = useRouter()
    const { project, isLoading } = useSingleProjectQuery(projectId)

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
                            <StyledProjectTitle> {project?.title?.rendered} </StyledProjectTitle>
                            <StyledText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project?.content?.rendered) }} />
                        </StyledProjectContent>
                        <StyledProjectCoverImageContainer>
                            {project?.project_cover_image &&
                                <Image
                                    className="image"
                                    draggable="false"
                                    src={project.project_cover_image?.guid}
                                    alt="image"
                                    height="500"
                                    width="500"
                                    style={{
                                        objectFit: "contain"
                                    }} />
                            }
                        </StyledProjectCoverImageContainer>
                    </StyledProjectGrid>
                </StyledCover>

                <StyledRow>
                    {project?.project_images.length &&
                        project?.project_images?.map(image => (
                            <StyledItems key={image.ID}>
                                <Image
                                    alt="projects"
                                    draggable="false"
                                    src={image.guid}
                                    width={300} // these two are useless now, just to bypass nextJS
                                    height={300}
                                    style={{
                                        width: 'auto',
                                        height: 'auto',
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0
                                    }}
                                />
                            </StyledItems>
                        ))}
                </StyledRow>
            </StyledWrap>
    )
}

export async function getStaticPaths() {

    const data = await getProjects()
    const idArr = data?.reduce((filteredIdArr, data) => {
        filteredIdArr.push({
            params: { projectId: `${data.id}` }
        })
        return filteredIdArr
    }, [])

    return {
        paths: idArr,
        fallback: 'blocking'
    }
}


export async function getStaticProps({ params }) {
    const queryClient = new QueryClient();

    await queryClient.fetchQuery([`project-${params.projectId}`], () => getSingleProject(params.projectId));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 1

    }
}


// export const getServerSideProps = withCSR(async (ctx) => {
//     const { projectId } = ctx.params;

//     const queryClient = new QueryClient();

//     let isError = false;

//     try {
//         await queryClient.fetchQuery(`project-${projectId}`, () => getSingleProject(projectId));
//     } catch (error) {
//         isError = true
//         ctx.res.statusCode = error.response.status;
//     }

//     return {
//         props: {
//             //also passing down isError state to show a custom error component.
//             isError,
//             dehydratedState: dehydrate(queryClient),
//         },
//     }
// })
