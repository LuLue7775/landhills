import useObjects from '@/queries/useObjects'
import {
    StyledPages,
    StyledSection,
    StyledCoverSection,
    StyledText,
    StyledObjectContent,
    StyledObjectDisplayCols,
    StyledObjectCol
} from '@/styles/styles'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Carousel from '@/components/carousel'

const Box = dynamic(() => import('@/components/canvas/Box'), {
    ssr: false,
})

const Page = (props) => {
    const { objects, error, isLoading, isError, isSuccess } = useObjects()

    useEffect(() => {
        console.log(objects)
    }, [objects])

    return (
        <StyledPages>
            <StyledSection>
                {objects?.map((object, i) => (
                    <StyledCoverSection key={object.id}>
                        <Image
                            className="images"
                            draggable="false"
                            src={object.object_cover_image.guid}
                            alt="image"
                            layout="responsive"
                            height="75"
                            width="100"
                            objectFit="contain"
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
                                            layout="fill"
                                            objectFit="contain" />
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
                                    layout="responsive"
                                    width="350"
                                    height="350"
                                    objectFit="contain" />
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
        <Box route='/' />
    </>
)

export default Page

export async function getStaticProps() {
    return {
        props: {
            title: 'Objects',
        },
    }
}
