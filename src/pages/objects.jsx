import useObjects from '@/queries/useObjects'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const Box = dynamic(() => import('@/components/canvas/Box'), {
    ssr: false,
})

// Step 5 - delete Instructions components
const Page = (props) => {
    const { objects, error, isLoading, isError, isSuccess } = useObjects()

    useEffect(() => {
        console.log(objects)
    }, [objects])

    return (
        <>
            <div> THIS IS OBJECTS</div>

        </>
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
