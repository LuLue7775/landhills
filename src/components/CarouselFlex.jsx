import { StyledSlideButton } from '@/styles/styles';
import React, { useRef } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
function getPrevElement(list) {
    const sibling = list[0].previousElementSibling

    if (sibling instanceof HTMLElement) {
        return sibling
    }

    return sibling
}

function getNextElement(list) {
    const sibling = list[list.length - 1].nextElementSibling

    if (sibling instanceof HTMLElement) {
        return sibling
    }

    return null
}


/**
 * MAKE A SETREFS and a curr view index
 */
export function usePosition(ref, imageRefs, currSlide) {
    const [prevElement, setPrevElement] = React.useState(null)
    const [nextElement, setNextElement] = React.useState(null)

    // React.useEffect(() => {
    //     // const element = ref.current
    //     const update = () => {
    //         //     const rect = element.getBoundingClientRect()

    //         //     const visibleElements = Array.from(element.children).filter((child) => {
    //         //         const childRect = child.getBoundingClientRect()
    //         //         return childRect.left >= rect.left && childRect.right >= rect.right
    //         //     })

    //         //     // console.log('element.children ', element.children)
    //         //     // console.log("visibleElements ", visibleElements)

    //         //     if (visibleElements.length > 0) {
    //         //         setPrevElement(getPrevElement(visibleElements))
    //         //         setNextElement(getNextElement(visibleElements))
    //         //     }

    //     }

    //     update()

    //     element.addEventListener('scroll', update, { passive: true })

    //     return () => {
    //         element.removeEventListener('scroll', update, { passive: true })
    //     }
    // }, [imageRefs])

    const scrollToElement = React.useCallback(
        (element) => {

            const currentNode = ref.current

            if (!currentNode || !element) return

            let newScrollPosition

            newScrollPosition =
                element.offsetLeft +
                element.getBoundingClientRect().width / 2 -
                currentNode.getBoundingClientRect().width / 2

            currentNode.scroll({
                left: newScrollPosition,
                behavior: 'smooth',
            })
            console.log('newScrollPosition:', newScrollPosition)
        },
        [imageRefs, currSlide],
    )

    const scrollRight = React.useCallback(() => {
        scrollToElement(imageRefs.current[currSlide])
        // console.log('scroll right')
    }, [
        scrollToElement,
        currSlide,
        imageRefs,

    ])

    const scrollLeft = React.useCallback(() => scrollToElement(imageRefs[currSlide]), [
        scrollToElement,
        currSlide,
        imageRefs,
        ,
    ])

    return {
        hasItemsOnLeft: prevElement !== null,
        hasItemsOnRight: nextElement !== null,
        scrollRight,
        scrollLeft,
    }
}


export default function CarouselFlex(props) {
    const { children, imageWidth, amount, currSlide, setSlide } = props
    const imageRefs = useRef([])

    const handleClicked = (dir) => {
        if (dir === 'prev' && currSlide > 0) {
            setSlide(currSlide => currSlide - 1)
            scrollToElement(imageRefs.current[currSlide - 1])
        }
        if (dir === 'next' && currSlide < amount - 1) {
            setSlide(currSlide => currSlide + 1)
            scrollToElement(imageRefs.current[currSlide + 1])

        }
    }

    const scrollToElement = React.useCallback(
        (nextNode) => {
            const currentNode = imageRefs.current[currSlide]

            if (!currentNode || !nextNode) return

            let newScrollPosition

            newScrollPosition =
                nextNode.offsetLeft +
                nextNode.getBoundingClientRect().width / 2 -
                currentNode.getBoundingClientRect().width / 2

            // currentNode.scroll({
            //     left: -200,
            //     behavior: 'smooth',
            // })
            gsap.to([currentNode, nextNode], {
                x: -newScrollPosition,
                ease: 'power1.inOut',
            })

        },
        [currSlide],
    )


    const setRefs = (ref, el, elAmount) => {
        if (ref.current === elAmount) return
        // if (ref.current?.includes(el) || ref.current === elAmount) return
        ref.current.push(el)
    }

    // const {
    //     hasItemsOnLeft,
    //     hasItemsOnRight,
    //     scrollRight,
    //     scrollLeft
    // } = usePosition(ref, imageRefs, currSlide)

    return (
        <CarouserContainer>
            <CarouserContainerInner
                style={{
                    width: imageWidth
                }}
            >
                {React.Children.map(children, (child, index) => (
                    <CarouselItem
                        ref={el => setRefs(imageRefs, el, children.length)}
                        key={`${index}`}>{child}</CarouselItem>
                ))}
            </CarouserContainerInner>
            {imageRefs.current.length > 1 ?
                <>
                    <StyledSlideButton dir={'prev'} onClick={() => handleClicked('prev')} />
                    <StyledSlideButton dir={'next'} onClick={() => handleClicked('next')} />
                </>
                : ''
            }




        </CarouserContainer>)
}



const CarouserContainer = styled.div`
  position: relative;
  overflow: hidden;
`

const CarouselItem = styled.div`
  flex: 0 0 auto;
  margin-left: 1rem;
`


const Item = styled.div`
//   width: ${({ size }) => `${size}rem`};
//   height: ${({ size }) => `${size + 2}rem`};

display: flex;
height: auto

  align-items: center;
  justify-content: center;
`


const CarouserContainerInner = styled.div`
display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  
  // offset for children spacing
  margin-left: -1rem;
  
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  ${CarouselItem} & {
    scroll-snap-align: center;
  }

`
