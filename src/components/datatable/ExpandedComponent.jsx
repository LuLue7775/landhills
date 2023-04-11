import {
    StyledExpandContent,
    StyledText
} from '@/styles/styles'
import Image from 'next/image'
import React from 'react'

export default function ExpandedComponent({ data }) {
    return (
        <StyledExpandContent
        >
            <Image
                alt="projects"
                src={data.image}
                width={150}
                height={150}
                style={{
                    width: 'auto',
                    height: '100%',
                    objectFit: 'contain',
                    paddingLeft: '10%'
                }}
            />
            <StyledText
                style={{
                    paddingLeft: '10%',
                    width: 'min(100%, 450px)',
                    display: 'flex',
                    alignSelf: 'end'
                }}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.description) }} />

        </StyledExpandContent>
    )
}
