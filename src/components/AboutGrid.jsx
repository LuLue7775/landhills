import { StyledCarouselWrapper, StyledGridWrapper, StyledSlide, StyledText, StyledTextWrapper } from '@/styles/styles'
import React, { useState } from 'react'
import Carousel2 from './Carousel2'
import Image from 'next/image'

export default function AboutGrid({ about, router }) {

    const [currSlide, setSlide] = useState(0)

    return (
        <StyledGridWrapper>
            <div></div>
            <div>
                <StyledCarouselWrapper>
                    <Carousel2 amount={about?.about_images?.length} currSlide={currSlide} setSlide={setSlide}>
                        {about?.about_images?.map((imageData, i) => (
                            <StyledSlide key={i} className='slide'
                                style={currSlide === i ? { opacity: '1' } : { opacity: '0' }}
                            >
                                <Image
                                    key={imageData.id}
                                    className="images"
                                    draggable="false"
                                    src={imageData.guid}
                                    alt="image"
                                    width={500}
                                    height={500}
                                    style={{
                                        width: 'auto',
                                        height: '100%',
                                        // maxWidth: '400px',
                                        // maxHeight: '400px',
                                        objectFit: 'contain',
                                    }}
                                />

                            </StyledSlide>
                        ))

                        }
                    </Carousel2>
                </StyledCarouselWrapper>
                <StyledText
                    isHome={router.pathname === '/'}
                    style={{
                        position: 'relative', width: '100%', textAlign: 'end',
                        fontSize: '1rem', marginTop: '.5rem'
                    }}>
                    {currSlide + 1}/{about?.about_images?.length}
                </StyledText>
            </div>

            <StyledTextWrapper className='events' >
                {about?.about_content?.map((content, i) =>
                    <StyledText key={i}
                        style={{ paddingBottom: '2rem' }}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
                )}
            </StyledTextWrapper>
            <div> </div>
        </StyledGridWrapper >)
}
