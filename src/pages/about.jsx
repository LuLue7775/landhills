import useAbout from '@/queries/useAbout'
import useBrandInfo from '@/queries/useBrandInfo'
import {
    StyledPages,
    StyledGridWrapper,
    StyledMenuInfo,
    StyledText,
    StyledCarouselWrapper,
    StyledTextWrapper,
    StyledLoaderContainer,
    StyledLoader
} from '@/styles/styles'
import Carousel from '@/components/carousel'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const Box = dynamic(() => import('@/components/canvas/Box'), {
    ssr: false,
})


const Page = () => {
    const { about, isLoading } = useAbout()
    const { brandInfo } = useBrandInfo()
    const { info_content } = brandInfo?.[0] || []

    // const { about_content, about_images } = about?.[0] || []

    return (
        isLoading ?
            <StyledLoaderContainer>
                <StyledLoader />
            </StyledLoaderContainer>
            :
            <StyledPages>
                {about?.map(section => (
                    <StyledGridWrapper key={section.id}>
                        <div>
                            <StyledMenuInfo>
                                <StyledText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(info_content) }} />
                            </StyledMenuInfo>
                        </div>
                        <StyledCarouselWrapper>
                            <Carousel>
                                {section?.about_images?.map(image => (
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
                            <StyledText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(section.about_content) }} />
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
            title: 'About',
        },
    }
}
