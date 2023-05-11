import { StyledImageWrapper } from '@/styles/styles'
import Image from 'next/image'
import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'

const ArchiveImage = (props, ref) => {
    const [projectImage, setProjectImage] = useState('')
    const [imageIndex, setImageIndex] = useState()

    useImperativeHandle(ref, () => ({
        setImg: img => setProjectImage(img),
        setIndex: i => setImageIndex(i)
    }))

    const [imagePos, setImagePos] = useState({})

    useEffect(() => {
        setImagePos({ mouseY: parseInt(imageIndex) * 38 + 130 })
    }, [imageIndex])


    return (
        <StyledImageWrapper mouseY={imagePos.mouseY}>
            {projectImage &&
                <Image
                    draggable="false"
                    src={projectImage}
                    alt="image"
                    height={200}
                    width={200}
                    style={{
                        width: 'auto',
                        height: '100%',
                        maxWidth: '400px',
                        maxHeight: '400px',
                        objectFit: 'contain',
                    }}
                />
            }
        </StyledImageWrapper>)
}
export default forwardRef(ArchiveImage)
