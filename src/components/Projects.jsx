import { StyledImage, StyledImageInfo, StyledItems } from '@/styles/styles'
import Link from 'next/link'
import React from 'react'

export default function Projects({ firstpageProjectPool, newComingIn }) {

    return (
        <div style={{ minHeight: '100vh' }}>
            {
                firstpageProjectPool.length &&
                firstpageProjectPool?.map((project, i) => (
                    <StyledItems key={i}
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
            {
                newComingIn?.map((project, i) => (
                    <StyledItems key={i}
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
        </div>


    )
}
