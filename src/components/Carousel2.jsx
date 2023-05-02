import { StyledCarouselSlot, StyledSlideButton, StyledSlider, StyledSwipeHandler } from '@/styles/styles'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable';

export default function Carousel2(props) {
    const { amount, currSlide, setSlide } = props
    const router = useRouter()

    // const swipeHandlers = useSwipeable({
    //     onSwipedLeft: () => slide('NEXT'),
    //     onSwipedRight: () => slide('PREV'),
    //     swipeDuration: 200,
    //     preventScrollOnSwipe: true,
    //     trackMouse: true
    // });


    const handleClicked = (dir) => {
        if (dir === 'prev' && currSlide > 0) setSlide(currSlide => currSlide - 1)
        if (dir === 'next' && currSlide < amount - 1) {
            setSlide(currSlide => currSlide + 1)
        }
    }

    return (
        <>
            <StyledSwipeHandler
                style={{ height: '100%' }}
            >
                <StyledSlider isHome={router.pathname === '/'} isObject={router.pathname === '/objects'}>
                    {React.Children.map(props.children, (child) => (
                        <>
                            {child}
                        </>
                    )
                    )}
                    <StyledSlideButton dir={'prev'} onClick={() => handleClicked('prev')} />
                    <StyledSlideButton dir={'next'} onClick={() => handleClicked('next')} />

                </StyledSlider>
            </StyledSwipeHandler>
        </>
    )
}


// function reducer(state, action) {
//     switch (action.type) {
//         case 'PREV':
//             return {
//                 ...state,
//                 dir: 'PREV',
//                 sliding: true,
//                 pos: state.pos === 0 ? action.item_amount - 1 : state.pos - 1
//             }
//         case 'NEXT':
//             return {
//                 ...state,
//                 dir: 'NEXT',
//                 sliding: true,
//                 pos: state.pos === action.item_amount - 1 ? 0 : state.pos + 1
//             }
//         case 'stopSliding':
//             return { ...state, sliding: false }
//         default:
//             return state
//     }
// }