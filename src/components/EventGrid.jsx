import { StyledCarouselWrapper, StyledGridWrapper, StyledSlide, StyledText, StyledTextWrapper } from '@/styles/styles'
import { useState } from 'react'
import Carousel2 from './Carousel2'
import Image from 'next/image'

export default function EventGrid({ event, router }) {

    const [currSlide, setSlide] = useState(0)

    return (
        <StyledGridWrapper >
            <div></div>
            <StyledCarouselWrapper>
                <Carousel2 amount={event?.event_images?.length} currSlide={currSlide} setSlide={setSlide}>
                    {event?.event_images?.map((imageData, i) => (
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
                                    maxWidth: '400px',
                                    maxHeight: '400px',
                                    objectFit: 'cover',
                                }}
                            />

                        </StyledSlide>
                    ))

                    }
                    <StyledText
                        isHome={router.pathname === '/'}
                        style={{
                            position: 'absolute', right: '0', bottom: '-2rem',
                            fontSize: '1rem',
                        }}>
                        {currSlide + 1}/{event?.event_images?.length}
                    </StyledText>
                </Carousel2>

            </StyledCarouselWrapper>

            <StyledTextWrapper className='events' >
                {event?.event_content?.map((content, i) =>
                    <StyledText key={i}
                        style={{ paddingBottom: '2rem' }}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
                )}
                <StyledText
                    style={{ paddingBottom: '1rem' }}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.event_content_sm) }} />
            </StyledTextWrapper>
            <div> </div>
        </StyledGridWrapper>)
}
