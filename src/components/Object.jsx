import { StyledImage, StyledImageLink, StyledObjectContent, StyledSlide, StyledTextHome } from '@/styles/styles'
import Carousel2 from './Carousel2'
import Image from 'next/image'
import { useState } from 'react'

export default function Object({ object }) {
    const [currSlide, setSlide] = useState(0)

    return (
        <div
        // style={{ height: 'auto' }}
        >
            {object?.object_image ?
                <>
                    <Carousel2 amount={object?.object_image?.length} currSlide={currSlide} setSlide={setSlide}>
                        {object?.object_image.map((imageData, i) => (

                            <StyledSlide key={i} className='slide'
                                style={{
                                    opacity: currSlide === i ? '1' : '0',
                                    height: '100%'
                                }}

                            >

                                {/* <Image
                                    key={imageData.id}
                                    className="images"
                                    draggable="false"
                                    src={imageData.guid}
                                    alt="image"
                                    width={1920}
                                    height={1080}
                                    sizes="100vw"
                                    style={{
                                        width: '100%',
                                        minHeight: '100%',
                                        objectFit: 'cover',
                                    }}
                                /> */}

                                <StyledImage
                                    className="images"
                                    draggable="false"
                                    src={imageData.guid}
                                    alt="image"
                                    style={{
                                        height: 'auto',
                                        // maxHeight: '1000px',
                                        minHeight: '100%',
                                        width: `${object.object_width}px`,
                                        minWidth: `${object.object_width}px`
                                    }}
                                />

                            </StyledSlide>



                        )
                        )}
                        <StyledTextHome style={{ position: 'absolute', right: '0', width: `${object.object_width}px`, fontSize: '1rem' }}>
                            {currSlide + 1}/{object?.object_image?.length}
                        </StyledTextHome>
                    </Carousel2>


                </>

                : ''}

            {object.object_content ?
                <StyledObjectContent
                    className="editor object circular-medium"
                    object_width={object.object_width}
                    circular_medium={object?.is_editor_font_circular_medium === '1'}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(object?.object_content) }} />
                : ''
            }

        </div>)
}
