import {
    StyledExpandContent,
    StyledExpandText
} from '@/styles/styles'
import Image from 'next/image'
import React from 'react'

export default function ExpandedComponent({ data }) {
    return (
        <StyledExpandContent>
            <Image
                alt="projects"
                src={data.image}
                width={150}
                height={150}
                style={{
                    width: 'auto',
                    height: '100%',
                    objectFit: 'contain'
                }}
            />
            <StyledExpandText>
                <div style={{ fontStyle: 'italic' }}> {data.type} </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '600' }}> {data.no} </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '600' }}> {data.location} </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '600' }}> {data.year} </div>
            </StyledExpandText>
        </StyledExpandContent>
    )
}
