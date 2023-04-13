import {
    StyledProjectGrid,
    StyledProjectContent,
    StyledProjectTitle,
    StyledText,
    StyledItems,
    StyledImage,
    StyledPages,
    StyledProjectCoverImageContainer,
    StyledLoaderContainer,
    StyledLoader,
} from '@/styles/styles'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getProjects, getSingleProject, useSingleProjectQuery } from '@/queries/useProjectsQuery'



export default function ProjectsSinglePage({ project }) {
    // const { query: { projectId } } = useRouter()
    // const { project, isLoading } = useSingleProjectQuery(projectId)


    return (
        // isLoading ?
        //     <StyledLoaderContainer>
        //         <StyledLoader />
        //     </StyledLoaderContainer>
        //     :
        <StyledPages>
            <StyledProjectGrid>
                <StyledProjectContent>
                    <StyledProjectTitle> {project?.title?.rendered} </StyledProjectTitle>
                    <StyledText className="editor"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project?.project_category[0]?.name) }} />
                    <StyledText className="editor"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project?.date) }} />
                    <StyledText className="editor"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project?.content?.rendered) }} />
                </StyledProjectContent>

            </StyledProjectGrid>

            <div style={{
                width: '100%',
                textAlign: 'center'
            }}>
                {project?.project_cover_image &&
                    <StyledImage
                        className="images"
                        draggable="false"
                        src={project.project_cover_image?.guid}
                        alt="image"
                        style={{ maxWidth: '50%', width: 'auto' }}
                    />
                }
                {project?.project_images.length &&
                    project?.project_images?.map(image => (
                        <StyledItems key={image.ID} singleProject>
                            <StyledImage
                                className="images"
                                draggable="false"
                                src={image.guid}
                                alt="image"

                                singleProject
                            />
                        </StyledItems>
                    ))}
            </div>
        </StyledPages>
    )
}

export async function getStaticPaths() {

    // const data = await getProjects()
    // const paths = await data?.reduce((filteredIdArr, data) => {
    //     filteredIdArr.push({
    //         params: { projectId: `${data.id}` }
    //     })
    //     return filteredIdArr
    // }, [])
    // console.log(idArr)

    return {
        paths: [
            { params: { projectId: '5164' } },
        ],
        // paths,
        fallback: 'blocking'
    }

}

/**
 * either prefetch or fetch with ISR
 * @TODO make this react-query again
 */
export async function getStaticProps({ params }) {
    // console.log(params)
    // const queryClient = new QueryClient();

    // const project = await queryClient.fetchQuery({
    //     queryKey: [`projects`, params.projectId],
    //     queryFn: async () => await getSingleProject(params.projectId)
    // })
    // await queryClient.prefetchQuery([`projects`, params.projectId], () => getSingleProject(params.projectId));
    const data = await fetch(`https://landhills.co/wp-json/wp/v2/projects/${params.projectId}`)
    const project = await data.json()

    return {
        props: {
            // dehydratedState: dehydrate(queryClient),
            project
        },
        revalidate: 1

    }

}
