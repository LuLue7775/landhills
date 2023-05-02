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
import { dehydrate, QueryClient } from '@tanstack/react-query'
import useViewport from '@/utils/useViewport'
import AboutGrid from '@/components/AboutGrid'
import { useRouter } from 'next/router'


const Page = () => {
    const router = useRouter()

    const { about, isLoading } = useAboutQuery()
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
                {about?.map((about_element, i) => (
                    <AboutGrid key={i} about={about_element} router={router} />
                ))}
            </StyledContentWrapper>
        </StyledPages>
    )
}

Page.r3f = (props) => (
    <>
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
