import useAboutQuery, { getAbout } from '@/queries/useAboutQuery'
import useBrandInfoQuery from '@/queries/useBrandInfoQuery'
import {
    StyledPages,
    StyledGridWrapper,
    StyledMenuInfo,
    StyledText,
    StyledCarouselWrapper,
    StyledTextWrapper,
    StyledLoaderContainer,
    StyledLoader,
    StyledContentWrapper
} from '@/styles/styles'
import Carousel from '@/components/carousel'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import useViewport from '@/utils/useViewport'

const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
    ssr: false,
})

const Page = () => {
    const { about, isLoading } = useAboutQuery()
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
                    <StyledMenuInfo className='menu'>
                        <StyledText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(info_content) }} />
                    </StyledMenuInfo>
                }
                <StyledContentWrapper>
                    {about?.map(section => (
                        <StyledGridWrapper key={section.id}>
                            <div></div>
                            <StyledCarouselWrapper>
                                <Carousel>
                                    {section?.about_images?.map(image => (
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
                                {section?.about_content?.map((content, i) =>
                                    < StyledText key={i}
                                        style={{ paddingBottom: '2rem' }}
                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
                                )}
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
    await queryClient.prefetchQuery(['about'], getAbout)
    /**
     * Use dehydrate to dehydrate the query cache and pass it to the page via the dehydratedState prop. 
     * This is the same prop that the cache will be picked up from in your _app.js
     */
    return {
        props: {
            title: 'About',
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 1
    }
}
