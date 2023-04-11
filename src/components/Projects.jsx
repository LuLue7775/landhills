import { StyledImage, StyledImageInfo, StyledItems } from '@/styles/styles'
import Link from 'next/link'
import React from 'react'

export default function Projects({ projectPool, requestPage }) {
    return (
        projectPool.length &&
        projectPool?.map((project) => project && (
            <StyledItems key={project.id}
                className='projects-wrap'
            >
                <Link href={`${process.env.NODE_ENV !== 'production'
                    ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_SITE_URL}/projects/${project.id}`}>
                    <StyledImage
                        className={`images-${requestPage}`}
                        id={project.id}
                        draggable="false"
                        src={project.image}
                        alt="image"
                    />
                    <StyledImageInfo className='projects' >
                        <p > {project.title} </p>
                        <p> {project.no} </p>
                    </StyledImageInfo>
                </Link>
            </StyledItems>
        ))
    )
}
