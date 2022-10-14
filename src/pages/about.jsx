import Instructions from '@/components/dom/Instructions'
import useAbout from '@/queries/useAbout'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const Box = dynamic(() => import('@/components/canvas/Box'), {
    ssr: false,
})

// Step 5 - delete Instructions components
const Page = (props) => {
    const { aboutPage, status } = useAbout()

    useEffect(() => {
        console.log(aboutPage, status)
        // window
        //     .fetch(`https://landhills.co/wp-json/wp/v2/pages?slug=about-test`)
        //     .then(response => response.json())
        //     .then(responseData => console.log(responseData))
    }, [])

    return (
        <>
            <Instructions />
            <div> THIS IS ABOUT</div>

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
