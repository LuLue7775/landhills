import {
    StyledProjectGrid,
    StyledProjectContent,
    StyledProjectTitle,
    StyledText,
    StyledProjectCoverImageContainer,
    StyledRow,
    StyledItems,
    StyledLoaderContainer,
    StyledLoader,
    StyledImage,
    StyledPages
} from '@/styles/styles'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import Image from 'next/image'
import { getProjects, getSingleProject, useSingleProjectQuery } from '@/queries/useProjectsQuery'
import { useRouter } from 'next/router'

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

                <StyledProjectCoverImageContainer>
                    {project?.project_cover_image &&
                        // <Image
                        //     className="image"
                        //     draggable="false"
                        //     src={project.project_cover_image?.guid}
                        //     alt="image"
                        //     height={1920}
                        //     width={1080}
                        //     sizes="100vw"
                        //     style={{
                        //         width: 'auto',
                        //         height: '100%',
                        //         objectFit: "contain"
                        //     }}
                        // />
                        <StyledImage
                            className="images"
                            draggable="false"
                            src={project.project_cover_image?.guid}
                            alt="image"
                        />
                    }
                </StyledProjectCoverImageContainer>
                <StyledProjectContent>
                    <StyledProjectTitle> {project?.title?.rendered} </StyledProjectTitle>
                    <StyledText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project?.project_category[0]?.name) }} />
                    <StyledText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project?.date) }} />
                    <StyledText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project?.content?.rendered) }} />
                </StyledProjectContent>
            </StyledProjectGrid>

            <StyledRow>
                {project?.project_images.length &&
                    project?.project_images?.map(image => (
                        // <StyledItems key={image.ID}>
                        //     <StyledImage
                        //         className="images"
                        //         draggable="false"
                        //         src={image.guid}
                        //         alt="image"
                        //     />
                        // </StyledItems>

                        <StyledItems key={image.ID}>
                            <Image
                                alt="projects"
                                src={image.guid}
                                width={300}
                                height={300}
                                style={{
                                    width: 'auto',
                                    height: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                        </StyledItems>
                    ))}
            </StyledRow>
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
    console.log(params)
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
