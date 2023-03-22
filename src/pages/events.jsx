import useEventsQuery, { getEvents } from '@/queries/useEventsQuery'
import { StyledPages, StyledGridWrapper, StyledMenuInfo, StyledText, StyledCarouselWrapper, StyledTextWrapper, StyledLoaderContainer, StyledLoader, StyledContentWrapper } from '@/styles/styles'
import useBrandInfoQuery from '@/queries/useBrandInfoQuery'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Carousel from '@/components/carousel'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import useViewport from '@/utils/useViewport'

const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
    ssr: false,
})

const Page = () => {
    const { events, isLoading } = useEventsQuery()
    const { brandInfo } = useBrandInfoQuery()
    const { info_content } = brandInfo?.[0] || []
    const viewport = useViewport()
    return (
        isLoading ?
            <StyledLoaderContainer>
                <StyledLoader />
            </StyledLoaderContainer>
            :
            <StyledPages fixed>
                {
                    viewport !== 'tablet' && viewport !== 'mobile' &&
                    <StyledMenuInfo>
                        <StyledText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(info_content) }} />
                    </StyledMenuInfo>
                }
                <StyledContentWrapper>
                    {events?.map(event => (
                        <StyledGridWrapper key={event.id}>
                            <div></div>
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
                                            style={{
                                                width: 'auto',
                                                height: '100%',
                                                maxWidth: '400px',
                                                maxHeight: '400px',
                                                objectFit: 'contain',
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
                </StyledContentWrapper>
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
    await queryClient.prefetchQuery(['events'], getEvents)
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
