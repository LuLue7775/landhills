import useEventsQuery, { getEvents } from '@/queries/useEventsQuery'
import { StyledPages, StyledGridWrapper, StyledMenuInfo, StyledText, StyledCarouselWrapper, StyledTextWrapper, StyledLoaderContainer, StyledLoader } from '@/styles/styles'
import useBrandInfoQuery from '@/queries/useBrandInfoQuery'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Carousel from '@/components/carousel'
import { dehydrate, QueryClient } from '@tanstack/react-query'

const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
    ssr: false,
})

const Page = () => {
    const { events, isLoading } = useEventsQuery()
    const { brandInfo } = useBrandInfoQuery()
    const { info_content } = brandInfo?.[0] || []

    return (
        isLoading ?
            <StyledLoaderContainer>
                <StyledLoader />
            </StyledLoaderContainer>
            :
            <StyledPages>
                {events?.map(event => (
                    <StyledGridWrapper key={event.id}>
                        <div>
                            <StyledMenuInfo>
                                <StyledText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(info_content) }} />
                            </StyledMenuInfo>
                        </div>
                        <StyledCarouselWrapper>
                            <Carousel>
                                {event?.event_images?.map(image => (
                                    <Image
                                        key={image.ID}
                                        draggable="false"
                                        src={image.guid}
                                        alt="image"
                                        width={200}
                                        height={200}
                                        // sizes="100vw"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '80%',
                                            objectFit: 'contain',
                                            position: 'absolute',
                                            top: 0
                                        }}
                                    />
                                ))}
                            </Carousel>
                        </StyledCarouselWrapper>

                        <StyledTextWrapper>
                            <StyledText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.event_content) }} />
                        </StyledTextWrapper>
                        <div> </div>
                    </StyledGridWrapper>
                ))}
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
    await queryClient.prefetchQuery('events', getEvents)
    /**
     * Use dehydrate to dehydrate the query cache and pass it to the page via the dehydratedState prop. 
     * This is the same prop that the cache will be picked up from in your _app.js
     */
    return {
        props: {
            title: 'Events',
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 1
    }
}
