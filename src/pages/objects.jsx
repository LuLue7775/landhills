import useObjectsQuery from '@/queries/useObjectsQuery'
import {
    StyledPages,
    StyledSection,
    StyledObject,
    StyledObjectContent,
    StyledLoader,
    StyledLoaderContainer,
    StyledImage,
} from '@/styles/styles'
import { getObjects } from '@/queries/useObjectsQuery'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import Image from 'next/image'

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
                        <StyledObject key={object.id}
                            object_top={object.object_top}
                            object_width={object.object_width}

                        >
                            {object.object_column === '3'
                                ? <> <div></div><div></div></>
                                : object.object_column === '2' ? <div></div> : ''
                            }
                            <div>
                                <StyledImage
                                    className="images"
                                    draggable="false"
                                    src={object.object_image.guid}
                                    alt="image"
                                    style={{ height: 'auto', width: `${object.object_width}px`, maxWidth: `${object.object_width}px` }}
                                />

                                <StyledObjectContent
                                    className="editor"
                                    object_width={object.object_width}
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(object.object_content) }} />
                            </div>
                            {object.object_column === '3'
                                ? ''
                                : object.object_column === '2' ? <div></div> : <> <div></div><div></div></>}

                        </StyledObject>

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
