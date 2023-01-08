import useObjectsQuery from '@/queries/useObjectsQuery'
import {
    StyledPages,
    StyledSection,
    StyledCoverSection,
    StyledText,
    StyledObjectContent,
    StyledObjectDisplayCols,
    StyledObjectCol,
    StyledLoader,
    StyledLoaderContainer
} from '@/styles/styles'
import { getObjects } from '@/queries/useObjectsQuery'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Carousel from '@/components/carousel'

const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
    ssr: false,
})

const Page = () => {
    const { objects, isLoading } = useObjectsQuery()

    return (
        isLoading ?
            <StyledLoaderContainer>
                <StyledLoader />
            </StyledLoaderContainer>
            : <StyledPages>
                <StyledSection>
                    {objects?.map((object, i) => (
                        <StyledCoverSection key={object.id}>
                            <Image
                                className="images"
                                draggable="false"
                                src={object.object_cover_image.guid}
                                alt="image"
                                height={475}
                                width={700}
                                sizes="100vh"
                                style={{
                                    width: 'auto',
                                    height: '100%',
                                    objectFit: "contain"
                                }}
                            />
                            <StyledText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(object.object_cover_paragraph) }} />
                            <StyledObjectContent dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(object.object_content) }} />
                            <StyledObjectDisplayCols>
                                <StyledObjectCol>
                                    <Carousel>
                                        {object.object_images.map(imageData => (
                                            <Image
                                                key={imageData.ID}
                                                className="images"
                                                draggable="false"
                                                src={imageData.guid}
                                                alt="images"
                                                fill
                                                sizes="100vw"
                                                style={{
                                                    objectFit: "cover"
                                                }} />
                                        ))}
                                    </Carousel>
                                    <StyledText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(object.object_description) }} />
                                </StyledObjectCol>

                                <StyledObjectCol>
                                    <Image
                                        className="single-image"
                                        draggable="false"
                                        src={object.single_object_image.guid}
                                        alt="single-image"
                                        width="350"
                                        height="350"
                                        style={{
                                            // width: 'auto',
                                            // height: '100%',
                                            objectFit: "contain"
                                        }} />
                                    <StyledText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(object.single_object_description) }} />
                                </StyledObjectCol>
                            </StyledObjectDisplayCols>
                        </StyledCoverSection>

                    ))}
                </StyledSection>
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
    await queryClient.prefetchQuery(['objects'], getObjects)
    /**
     * Use dehydrate to dehydrate the query cache and pass it to the page via the dehydratedState prop. 
     * This is the same prop that the cache will be picked up from in your _app.js
     */
    return {
        props: {
            title: 'Objects',
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 1
    }
}
