import {
    StyledPages,
    StyledRow,
    StyledItems,
    StyledLoader,
    StyledLoaderContainer,
    StyledImageInfo,
    StyledImage,
} from '@/styles/styles'
import useProjectsQuery, { getProjects, transformProjects } from '@/queries/useProjectsQuery'
import { useMeshRefStore, useObjectScrollStore, useProjectStore } from '@/helpers/store'
import useViewport, { projectShaderPosTable } from '@/utils/useViewport'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query'
import gsap from 'gsap'

const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
    ssr: false,
})

/**
 *  1sec after scroll put move queue
 */
const moveAnimation = ({ meshRef, queue }) => {
    if (!meshRef.current) return
    if (!queue[1]) return
    gsap.fromTo(meshRef.current.position, {
        x: queue[0].x,
        y: queue[0].y,
    }, {
        x: queue[1].x || 4,
        y: queue[1].y || 4,
        duration: 1,
    })
}
/**
 *  handle queue jobs
 */
const addNewPosToQueue = ({ animationQueueRef, viewport }) => {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            let getRandom = Math.floor(Math.random() * 4);
            const newPos = projectShaderPosTable[viewport][getRandom]
            animationQueueRef.current.push(newPos)
            resolve()
        }, 1000)
    })
}

const Page = ({ projects }) => {
    /** @TODO useProjectsQuery unable to fetch */
    // const { isLoading } = useProjectsQuery()
    // const queryClient = useQueryClient()
    // useEffect(() => {
    //   queryClient.setQueryData(['projects'], (data) => data.sort(() => Math.random() - 0.5))
    // }, [projects])

    /**
     * Detect scroll behavior, move mesh after 2sec scrolled. 
     * Move back to center when route change.
     */
    const [scrollPos, setScrollPos] = useState(0)
    const scrollRef = useRef()
    useEffect(() => {
        const scrollPos = scrollRef.current
        // detect scroll stop
        let timer = null;
        const handleScrollStopped = () => {
            if (timer !== null) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                setScrollPos(scrollPos.scrollTop)
            }, 350);
        }

        scrollPos?.addEventListener('scroll', handleScrollStopped)
        return () => scrollPos?.removeEventListener('scroll', handleScrollStopped)
        // }, [isLoading])
    }, [])

    const viewport = useViewport()
    const { meshRef } = useMeshRefStore()
    const animationQueueRef = useRef([])

    useEffect(() => {
        if (!viewport) return

        const waitFor3 = async () => {
            addNewPosToQueue({ animationQueueRef, viewport })
                .then(() => { return moveAnimation({ meshRef, queue: animationQueueRef.current }) })
                .then(() => {
                    if (animationQueueRef.current.length > 2) animationQueueRef.current.shift()
                    if (animationQueueRef.current.length > 4) animationQueueRef.current.slice(0, 3)

                })
        }
        waitFor3()

        // delete jobs if job exceed certain number

    }, [scrollPos, meshRef.current])


    return (
        // isLoading ?
        //   <StyledLoaderContainer>
        //     <StyledLoader />
        //   </StyledLoaderContainer>
        //   :
        <StyledPages ref={scrollRef}>
            <StyledRow
                style={{ justifyContent: 'space-between' }}
            >
                {projects?.map((project, i) => (
                    <StyledItems key={project.id}
                        className='projects-wrap'
                    >
                        <Link href={`${process.env.NODE_ENV !== 'production'
                            ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_SITE_URL}/projects/${project.id}`}>
                            <StyledImage
                                className="images"
                                id={project.id}
                                draggable="false"
                                src={project.image}
                                alt="image"
                                style={i % 2 === 0 ? { maxWidth: '600px' } : { maxHeight: '900px' }}
                            />
                            <StyledImageInfo className='projects' >
                                <p > {project.title} </p>
                                <p> {project.no} </p>
                            </StyledImageInfo>
                        </Link>
                    </StyledItems>
                ))
                }
            </StyledRow>
        </StyledPages>


    )
}

Page.r3f = (props) => (
    <>
        <Shader />
    </>
)

export default Page

/**
 * either prefetch or fetch with ISR
 * @TODO make this react-query again
 */
export async function getServerSideProps(context) {
    // const queryClient = new QueryClient()
    // const data = await queryClient.fetchQuery(['projects'], getProjects)
    const data = await fetch(`https://landhills.co/wp-json/wp/v2/projects?per_page=20`)
    const project = await data.json()
    const sortedData = transformProjects(project).sort(() => Math.random() - 0.5)

    /**
     * @TODO pagination here
     * err msg: \u8981\u6c42\u7684\u9801\u78bc\u5927\u65bc\u5be6\u969b\u9801\u6578\u3002
     * https://landhills.co/wp-json/wp/v2/projects?per_page=20&page=3
     * page index state要useRef 
     */

    /**
     * @WANRING Now we are not using our custom hook
     */
    return {
        props: {
            title: 'Projects',
            // dehydratedState: dehydrate(queryClient),
            projects: sortedData
        },
    }
}
