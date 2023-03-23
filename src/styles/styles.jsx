import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { devices } from './constants';

export const GlobalStyle = createGlobalStyle`  
 * {
    box-sizing: border-box;
  }

  html,
  body,
  #__next {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;

    font-size: 13px;
    @font-face {
      font-family: 'Circular Medium';
      font-style: normal;
      src: local('circular-medium'),
        url(/fonts/circular-medium.woff) format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Circular Book';
      font-style: normal;
      src: local('circular-book'),
        url(/fonts/circular-book.woff) format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Circular Italic';
      font-style: italic;
      src: local('circular-italic'),
        url(/fonts/circular-book-italic.woff) format('woff');
      font-display: swap;
    }
  }

  button,
  input[type="submit"],
  input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }


  p {
    margin: 0;
    font-size:1rem;
    letter-spacing: 1px;
    opacity: .9;
    line-height: 26px;
    margin-top: 15px;
  }
  .menu p{
    margin-top: 0;
        line-height: 18px;

  }
  .projects p{
    line-height: 1.2rem;
    margin-top: 0;
  }


  h2 {
    letter-spacing: 2px;
    font-size: 2rem;
    line-height: 2.8rem;
  }
  .home h2{
    font-family: 'Circular Book';
    letter-spacing: 1.6px;
    font-size: 18px;
    line-height: .7rem;
  }
  .events h2{
    font-family: 'Circular Book';
    letter-spacing: 1.6px;
    font-size: 18px;
    line-height: .7rem;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  .canvas {
    pointer-events: none;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: #505050;
    border-radius: 10px;
  }

`;

export const StyledLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

export const StyledMenu = styled.div`
  position: absolute; 
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  padding: 0 0 0 2rem;
  z-index: 20;

  background-color: #dedcd380;
  backdrop-filter: blur(10px);
`

export const StyledMenuWrap = styled.div`
  width: 25%;
  height: 100%;
`
export const StyledMenuUl = styled.ul`
  width: 20%;

  font-size: 2rem;
  line-height: 2rem;
  font-family: Circular Medium;
  padding: 0;
  list-style-type: none;
`

export const StyledMenuInfo = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
`
export const StyledCloseButton = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    margin: 1rem;
    background-image: url('/img/close.png');
    background-size: cover;
    width: 30px;
    height: 30px;
`

export const StyledNav = styled.div`
  position: fixed;
  top:0;
  z-index: 10;
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`

export const StyledTextMedium = styled.div`
 position: absolute;
 bottom: 0;
 z-index:10;
 padding: 0 0 2rem 2rem;
 font-size: 2rem;
 line-height: 2rem;
 font-family: Circular Medium;

`

export const StyledText = styled.div`
  text-align: start;
  font-size: 1rem;
  line-height: 1.2rem;
  text-align: justify;
  font-family: 'Circular Book';
  }
`

export const StyledLink = styled.a`
  cursor: pointer;
`

export const StyledPages = styled.div`
  position: relative;
    // height: calc(100vh - 70px);  
    height: 100dvh;
    padding-top: 70px;
  // padding-bottom: 10vh;
  overflow-x: hidden;
  ${({ fixed }) => (fixed ? `overflow-y: hidden;` : `overflow-y: scroll;`)};
`;
export const StyledLoaderContainer = styled.div`
  position: relative;
  height:100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledFooter = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 2rem;
`


/**
 * Carousel
 */
export const StyledSwipeHandler = styled.div`
 z-index: -1;
`
export const StyledCarouselWrapper = styled.div`
  width: 100%;
  height: auto;
  // max-height: 40vh;
  overflow: hidden;
`;

export const StyledCarouselContainer = styled.div`

  display: flex;
    transition: ${(props) => (props.sliding ? "none" : "opacity 0.5s ease")};
    opacity: ${(props) => {
    if (!props.sliding) return "1";
    if (props.dir === 'PREV') return "0";
    return "0";
  }};

  ${(props) => (props.homepage ? `
    position: absolute;
    transform: translate(0, -50%);
    top: 50%;
  `: `
    position: relative;
  `
  )}


`;

export const StyledCarouselSlot = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;  
  flex: 1 0 100%;
  flex-basis: 100%;
  height: 100%;
  margin-right: 20px;
  order: ${(props) => props.order};
${(props) => (!props.homepage && `
  justify-content: start;
  align-items:start;
`)}
`;

export const StyledSlideButtonContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
//   pointer-events: none;
`;

export const StyledSlideButton = styled.button`
  position: absolute;
  ${(props) => props.direction === 'PREV' ? `left:0;` : `right:0;`}
  top: 50%;
  transform: translateY(-50%);

  height: 50%;
  width: 30%;
  display: block;
  cursor: ${(props) => props.direction === 'PREV' ? `url('/img/prev.png')` : `url('/img/next.png')`}, auto;
  margin: 10px;
  text-decoration: none;
`;

export const StyledImageLink = styled.a`
  cursor: ${({ $hasLink }) => $hasLink ? `url('/img/plus.png'), auto;` : 'auto'}
`;


/**
 * Projects Page
 */
export const StyledItems = styled.div`
  display: inline-block;
  position: relative;
  height: 100%;
  width: auto;
  max-width: 90vw;
  margin: 1rem;
  overflow: hidden;
  padding-bottom: 1.5rem;

`;

// ========= non-next/image version 

export const StyledRow = styled.div`
  position: relative;
  font-size: 5rem;
  text-align: center;
  justify-content: center;
  align-items: end;
  display: flex;
  flex-wrap: wrap;
  margin: 0 2rem;
`;

export const StyledImage = styled.img`
  height: 100%;
  width: auto;
  max-width: min(80vw, 1000px); 
  object-fit: contain;
  
`;

// ========= next/image version 
// export const StyledRow = styled.div`
//   width: 100%;
//   font-size: 5rem;
//   text-align: center;
//   padding: 0 1rem;
//   margin-top: 10vh;
// `;


export const StyledImageInfo = styled.div`
  font-family: 'Circular Book';
  font-size: 1rem;
  text-align: start;
  position: absolute;
  bottom: -3px;

`

/**
 * Objects Page
 */

export const StyledSection = styled.div`
  position: relative;

  height: auto;
  margin-bottom: 100px;

`;
export const StyledObject = styled.div`
  position: relative;
  height: auto;
  ${({ object_top }) => `margin-top: ${object_top}px`};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const StyledObjectContent = styled.div`
${({ object_width }) => `width: ${object_width}px`};
  text-align: justify;
  font-family: Circular Medium;
  font-size: 1.2rem;
  line-height: 2rem;

`;


/**
 * Achive
 */
export const StyledTableWrapper = styled.div`
  position: relative;
  height: auto;
  width: calc(100% - 4rem);
  margin: 0 2rem 100px 2rem;
  border-top: 1px solid #00000050;
`
export const StyledImageWrapper = styled.div`
  position: absolute;
  left: calc(25vw - 2rem);
  top: -100px;
  transform: ${({ mouseY }) => `translateY(${mouseY}px)`};
  height: auto;
  width: 250px;
  pointer-events: none;
`

/**
 * Event & About
 */


export const StyledContentWrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;

`
export const StyledGridWrapper = styled.div`
  margin: 6rem 0;
  position: relative;
  @media ${devices.laptop} {
      display: grid;
      grid-template-columns: 2fr 2fr 2fr 2fr;
    }
`

export const StyledTextWrapper = styled.div`
  display: block;  
  padding: 0 0 0 2rem;
  text-align: left;
`
/**
 * Projects Single Page
 */


export const StyledProjectGrid = styled.div`
  position: relative;
  width: 100%;
  
  @media ${devices.laptop} {
    height: calc(100vh - 70px);  
    overflow: hidden;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 45% 55%;
  }
`

export const StyledProjectTitle = styled.h1`
  font-size: 2rem;
  font-family: 'Circular Medium';

`

export const StyledProjectContent = styled.div`
  position: relative;
  height: auto;
  width: 100%;
  margin: 4rem 2rem;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 0px;
  }
box-shadow:         inset 0px 11px 8px -10px #CCC,
        inset 0px -11px 8px -10px #CCC;  

`

export const StyledProjectCoverImageContainer = styled.div`
  position: relative;
  // position: absolute;
  // top: 0;
  // z-index: -1;
  
  @media ${devices.laptop} {
    position: absolute;
    right: -10%;
    top: 0;
    height: 70vh;
    width: 60%;
  }
`

/**
 * Loader
 */

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const StyledLoader = styled.div`
  border: 1px solid #50505050;
  border-top: 1px solid #000;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} .5s linear infinite; 
`


/**
 * DataTable
 * 
 *  */

export const StyledExpandContent = styled.div`
  display: flex;
  gap: 2rem;
  padding: 0 2rem;
`

export const StyledExpandText = styled.div`
  font-family: 'Circular Medium';
  padding: 2rem 0;
  text-align: start;
  line-height: 2rem;

`

