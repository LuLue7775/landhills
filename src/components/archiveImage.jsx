import { StyledImageWrapper } from '@/styles/styles'
import useMousePosition from '@/utils/useMousePosition'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function ArchiveImage({ projectImage }) {
    const [imagePos, setImagePos] = useState({})

    const { mouseY } = useMousePosition()
    useEffect(() => {
        setImagePos({ mouseY: Math.ceil(mouseY) })
    }, [mouseY])

    return (
        <StyledImageWrapper mouseY={imagePos.mouseY}>
            <Image
                draggable="false"
                src={projectImage}
                alt="image"
                height={200}
                width={200}
                style={{
                    width: 'auto',
                    height: '100%',
                    maxWidth: '250px',
                    maxHeight: '250px',
                    objectFit: 'contain',
                }}
            />
        </StyledImageWrapper>)
}
