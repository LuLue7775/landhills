import useEventsQuery, { getEvents } from '@/queries/useEventsQuery'
import { StyledPages, StyledMenuInfo, StyledText, StyledCarouselWrapper, StyledTextWrapper, StyledLoaderContainer, StyledLoader, StyledContentWrapper, StyledSlide } from '@/styles/styles'
import useBrandInfoQuery from '@/queries/useBrandInfoQuery'
import dynamic from 'next/dynamic'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import useViewport from '@/utils/useViewport'
import EventGrid from '@/components/EventGrid'
import { useRouter } from 'next/router'

const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
    ssr: false,
})

const Page = () => {
    const router = useRouter()

    const { events, isLoading } = useEventsQuery()
    const { brandInfo } = useBrandInfoQuery()
    const { info_content } = brandInfo?.[0] || []
    const viewport = useViewport()

    return (
        // isLoading ?
        //     <StyledLoaderContainer>
        //         <StyledLoader />
        //     </StyledLoaderContainer>
        //     :
        <StyledPages fixed>
            {
                viewport !== 'tablet' && viewport !== 'mobile' &&
                <StyledMenuInfo className='menu'>
                    <StyledText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(info_content) }} />
                </StyledMenuInfo>
            }
            <StyledContentWrapper>
                {events?.map((event, i) => (
                    <EventGrid key={i} event={event} router={router} />
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
