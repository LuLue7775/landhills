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
import Object from '@/components/Object'
import { getObjects } from '@/queries/useObjectsQuery'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
    ssr: false,
})

const placeObject = (col, object) => {
    switch (col) {
        case '1':
            return (
                <>
                    <Object object={object} />
                    <div /><div /><div /><div /><div />
                </>
            )
        case '2':
            return (
                <>
                    <div />
                    <Object object={object} />
                    <div /><div /><div /><div />
                </>
            )
        case '3':
            return (
                <>
                    <div /><div />
                    <Object object={object} />
                    <div /><div /><div />
                </>
            )
        case '4':
            return (
                <>
                    <div /><div /><div />
                    <Object object={object} />
                    <div /><div />
                </>
            )
        case '5':
            return (
                <>
                    <div /><div /><div /><div />
                    <Object object={object} />
                    <div />
                </>
            )
        case '6':
            return (
                <>
                    <div /><div /><div /><div /><div />
                    <Object object={object} />
                </>
            )

        // default:
        //     console.log("didn't match any one")
        //     break
    }
}

const Page = () => {
    const { objects, isLoading } = useObjectsQuery()

    // console.log(objects)
    // console.log(objects[3].is_editor_font_circular_medium)
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
                            {placeObject(object.object_column, object)}
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
