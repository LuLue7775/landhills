import useAbout from '@/queries/useAbout'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const Box = dynamic(() => import('@/components/canvas/Box'), {
    ssr: false,
})


const Page = (props) => {
    const { about, error, isLoading, isError, isSuccess } = useAbout()
    const { about_content, about_images } = about?.[0] || []

    useEffect(() => {
        console.log(about)
    }, [about])

    return (
        <>
            <div> THIS IS ABOUT</div>
            {/* { about_images?.map( imageUrl => 
            //  <img
            //     className=""
            //     src={imageUrl}
            //     alt={`${title} book cover`}
            // /> 
                
            )} */}

            {isSuccess ? <div> {about_content}  </div> : <p>SPINNER</p>}
            {isError && <p> ERROR </p>}
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
            title: 'About',
        },
    }
}
