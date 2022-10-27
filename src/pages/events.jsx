import useEvents from '@/queries/useEvents'
import { StyledPages, StyledGridWrapper, StyledMenuInfo, StyledText, StyledCarouselWrapper, StyledTextWrapper } from '@/styles/styles'
import useBrandInfo from '@/queries/useBrandInfo'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Carousel from '@/components/carousel'

const Box = dynamic(() => import('@/components/canvas/Box'), {
    ssr: false,
})

// Step 5 - delete Instructions components
const Page = (props) => {
    const { events, error, isLoading, isError, isSuccess } = useEvents()
    const { brandInfo } = useBrandInfo()
    const { info_content } = brandInfo?.[0] || []

    // useEffect(() => {
    //     console.log(events)
    //     console.log(brandInfo)
    // }, [events])

    return (
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
                                    layout="fixed"
                                    height={200}
                                    width={200}
                                    objectFit="contain"
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
        <Box route='/' />
    </>
)
export default Page

export async function getStaticProps() {
    return {
        props: {
            title: 'Events',
        },
    }
}
