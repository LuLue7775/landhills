import {
    StyledExpandContent,
    StyledExpandText,
} from '@/styles/styles'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

export default function ExpandedComponent({ data }) {
    const router = useRouter()

    return (
        <StyledExpandContent
            style={{ position: 'relative' }}
        >
            <Image
                alt="projects"
                src={data.image}
                width={250}
                height={250}
                style={{
                    width: 'auto',
                    height: '100%',
                    // height: 'auto',

                    objectFit: 'contain',
                    paddingLeft: 'calc(25vw - 4rem)',

                }}
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
