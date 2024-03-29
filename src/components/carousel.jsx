import React, { useReducer } from 'react'
import {
    StyledSwipeHandler,
    StyledCarouselWrapper,
    StyledCarouselContainer,
    StyledCarouselSlot,
    StyledSlideButton
} from '@/styles/styles';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/router';

// a function for looping back to the first image when reaching last.
const getOrder = (index, pos, item_amount) => {
    return index - pos < 0 ? item_amount - Math.abs(index - pos) : index - pos;
};

const getInitialState = (item_amount) => ({ pos: item_amount - 1, dir: 'NEXT', sliding: false })

function Carousel(props) {
    const router = useRouter();
    const item_amount = React.Children.count(props.children)
    const [state, dispatch] = useReducer(reducer, getInitialState(item_amount))

    const slide = (dir) => {
        dispatch({ type: dir, item_amount })
        setTimeout(() => dispatch({ type: "stopSliding" }), 20)
    }

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => slide('NEXT'),
        onSwipedRight: () => slide('PREV'),
        swipeDuration: 200,
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    // useEffect(() => {
    //     window.removeEventListener()
    // }, [])

    return (
        <StyledSwipeHandler className="StyledSwipeHandler" {...swipeHandlers}>
            <StyledCarouselWrapper className="StyledCarouselWrapper" >
                <StyledCarouselContainer className="StyledCarouselContainer" dir={state.dir} sliding={state.sliding} homepage={router.pathname === '/'}>
                    {React.Children.map(props.children, (child, index) => (
                        <StyledCarouselSlot className="StyledCarouselSlot" order={getOrder(index, state.pos, item_amount)} homepage={router.pathname === '/'}>
                            {child}
                        </StyledCarouselSlot>
                    )
                    )}

                    <StyledSlideButton className="StyledSlideButton" onClick={() => slide('PREV')} direction={'PREV'} />
                    <StyledSlideButton className="StyledSlideButton" onClick={() => slide('NEXT')} direction={'NEXT'} />

                </StyledCarouselContainer>
            </StyledCarouselWrapper>

        </StyledSwipeHandler>
    )
}

function reducer(state, action) {
    switch (action.type) {
        case 'PREV':
            return {
                ...state,
                dir: 'PREV',
                sliding: true,
                pos: state.pos === 0 ? action.item_amount - 1 : state.pos - 1
            }
        case 'NEXT':
            return {
                ...state,
                dir: 'NEXT',
                sliding: true,
                pos: state.pos === action.item_amount - 1 ? 0 : state.pos + 1
            }
        case 'stopSliding':
            return { ...state, sliding: false }
        default:
            return state
    }
}

export default Carousel