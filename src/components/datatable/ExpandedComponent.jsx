import {
    StyledExpandContent,
    StyledExpandText,
} from '@/styles/styles'
import useViewport from '@/utils/useViewport'
import { gsap } from 'gsap'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'

export default function ExpandedComponent({ data }) {
    const router = useRouter()
    const viewport = useViewport()

    const desktopStyle = {
        width: 'auto',
        height: '100%',
        objectFit: 'contain',
        paddingLeft: 'calc(25vw - 4rem )',
    }
    const mobileStyle = {
        width: 'auto',
        maxWidth: '300px',
        height: '100%',
        objectFit: 'contain',
    }

    const contentRef = useRef()
    useEffect(() => {
        gsap.fromTo(contentRef.current, {
            yPercent: -100
        }, {
            yPercent: 0,
            duration: 1.2,
            delay: .2,
            ease: 'power4.out'
        })

    }, [])
    return (
        <StyledExpandContent ref={contentRef}>
            <Image
                alt="projects"
                src={data.image}
                width={250}
                height={250}
                style={
                    viewport !== 'mobile' ? desktopStyle : mobileStyle
                }
            />
            <StyledExpandText>
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.description) }} />
                <a style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => {
                        router.push(
                            `${process.env.NODE_ENV !== 'production'
                                ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_SITE_URL}/projects/${data.id}`
                        )
                    }}
                >  {"<more>"} </a>
            </StyledExpandText>


        </StyledExpandContent>
    )
}
