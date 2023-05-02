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

  .object a{
    text-decoration: underline;
  }
  h1,h2,h3,h4,h5,h6 {
    font-weight: normal;
    padding: 0;
    margin: 0;
  }
  p {
    padding: 0;
    margin: 0;
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
  color: #383838;
`

export const StyledMenu = styled.div`
  position: absolute; 
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  padding: 0 0 0 2rem;
  z-index: 30;

  background-color: #dedcd380;
  backdrop-filter: blur(10px);
`

export const StyledMenuWrap = styled.div`
  width: 25%;
  height: 100%;
`
export const StyledMenuUl = styled.ul`
  width: 20%;

  font-family: 'Circular Medium';
  font-size: 2rem;
  line-height: 28px;
  letter-spacing: .7px;
  
  padding: 0;
  list-style-type: none;
`

export const StyledMenuInfo = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  z-index: 20;
`
export const StyledCloseButton = styled.button`
    position: absolute;
    right: 1.5rem;
    top: 0;
    padding: 2rem;
    width: 70px;
    height: 30px;
    cursor: crosshair;

    font-family: 'Circular Book';
    font-size: 1rem;
    letter-spacing: .7px;
    line-height: 14.5px;

`

export const StyledNav = styled.div`
  position: fixed;
  top:0;
  z-index: 10;
  width: 100%;
  padding: 2rem;
  display: flex;
  line-height: .6rem;
  
 ${({ home }) => home ? '' : 'background: #FFF;'}
  
  justify-content: space-between;
`

export const StyledTextHome = styled.div`
 position: absolute;
 bottom: 0;
 z-index:10;
 padding: 0 0 2rem 2rem;

  font-family: 'Circular Medium';
  letter-spacing: .7px;
  font-size: 1rem;
  line-height: 14.5px;

  h2 {
    font-family: 'Circular Medium';
    letter-spacing: .7px;
    font-size: 2rem;
    line-height: 28px;
  }  

`

export const StyledText = styled.div`
  font-family: 'Circular Book';
  font-size: 1rem;
  letter-spacing: .7px;
  line-height: 14.5px;

  h2 {
    font-family: 'Circular Medium';
    letter-spacing: .7px;
    font-size: 2rem;
    line-height: 28px;
  }

  h6 {
    font-family: 'Circular Medium';
    letter-spacing: .7px;
    font-size: 1rem;
    line-height: 14.5px;
  }
`

export const StyledLink = styled.a`
  cursor: pointer;
`

export const StyledPages = styled.div`
  position: relative;
    // height: calc(100vh - 70px);  
    height: 100vh;
    height: 100dvh;
    padding-top: 65px;
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
  width: 100%;
  padding: 2rem;
 ${({ home }) => home ? '' : 'background: #FFF;'}
  z-index: 20;

  font-family: 'Circular Book';
  letter-spacing: 1.1px;
  font-size: 1rem;
  p {
    line-height: .5rem;
    margin:0;
    padding:0;
    width: 100%;
    text-align: right;
  }
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
    // transform: translateX(5%);
    // left: -10%;
    // width: 150%;
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
  z-index:30;
//   pointer-events: none;
`;

export const StyledSlideButton = styled.button`
  position: absolute;
  ${({ dir }) => dir === 'prev' ? `left:0;` : `right:0;`}
  top: 50%;

  transform: translateY(-50%);

  height: 50%;
  width: 30%;
  display: block;
  cursor: ${({ dir }) => dir === 'prev' ? `url('/img/prev.png')` : `url('/img/next.png')`}, auto;
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
    margin: 0 1rem 6rem 1rem;
    overflow: hidden;
    padding-bottom: 2rem;

  ${({ singleProject }) => singleProject && `
    padding: 0;
    margin: 1rem;
    height: auto;
    max-height: 1000px; // dense factor
    
  `}

`;

// ========= non-next/image version 

export const StyledRow = styled.div`
  position: relative;
  font-size: 5rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: end;

  flex-wrap: wrap;
  margin: 0 1.1rem;
`;


export const StyledImage = styled.img`
  // background-image: url('placeholder.png');
  max-height: 400px;
  width: auto;
  
  // width: 600px;
  // height: 700px;
  object-fit: contain;

  @media ${devices.laptop} {
   max-width: min(80vw, 1000px); 
 }

   ${({ singleProject }) => singleProject && `
    max-height: 1000px;
    width: auto;
    max-width: 100%;    
  `}

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
  letter-spacing: .7px;
  line-height: 27.5px;

  text-align: start;
  position: absolute;
  bottom: -3px;

  font-family: 'Circular Book';
  font-size: 1rem;
  letter-spacing: .7px;
  line-height: 18.5px;
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
  grid-template-columns: repeat(6, 1fr);
`;

export const StyledObjectContent = styled.div`
${({ object_width }) => `width: ${object_width}px`};

  font-family: 'Circular Book';
  font-size: 1rem;
  line-height: 26px;
  letter-spacing: 1px;
  
  ${({ circular_medium }) => circular_medium && `
    font-family: 'Circular Medium';
    font-size: 1rem;
    line-height: 26px;  
    letter-spacing: 1px;

    h2 {
      font-family: 'Circular Medium';
      letter-spacing: 1.2px;
      font-size: 2rem;
      line-height: 36px;

    }
  `};
`;


/**
 * Achive
 */
export const StyledTableWrapper = styled.div`
  position: relative;
  height: auto;
  width: calc(100% - 4rem);
  margin: 0 2rem 100px 2rem;
  border-top: 1px solid #00000022;

  font-family: 'Circular Book';
  font-size: 1rem;
  letter-spacing: .7px;
  line-height: 14.5px;

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
      grid-template-columns: repeat(5, 1fr);
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
  margin-right: 4rem;

  @media ${devices.laptop} {
      float: left;
      width: 40%;
      overflow: hidden;
  }
`

export const StyledProjectTitle = styled.h1`
  font-family: 'Circular Medium';
  font-size: 2rem;
  letter-spacing: .7px;
  line-height: 28px;

  margin: 0 0 1rem 0;

`

export const StyledProjectContent = styled.div`
  position: relative;
  height: auto;
  width: 100%;
  margin: 0 2rem;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 0px;
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
  font-family: 'Circular Book';
  font-size: 1rem;
  letter-spacing: .7px;
  line-height: 27.5px;

  flex-direction: column;  
  @media ${devices.laptop} {
    flex-direction: row;  
  }

  min-height: 300px;
`
export const StyledExpandText = styled.div`

  display: flex;
  flex-direction: column;
  text-align: justify;
    
    align-items: end;
    justify-content: end; 
  
  font-family: 'Circular Book';
  font-size: 1rem;
  letter-spacing: .7px;
  line-height: 14.5px;
  
  
  max-height: 400px;
  width: 100%;
  position: relative;
  width: 70%;

  @media ${devices.laptop} {
    min-height: 300px; // based on StyledExpandContent min height. this is for algin end (cause we need position: absolute;)
    width: 20%;
    position: absolute;
    left: 40%;
    
    align-items: end;
    justify-content: end; 
  }
`

export const StyledSlider = styled.div`
  position: relative;
  // overflow: hidden;
  ${({ isHome, isObject }) => isHome ? `
    height: 100vh;
    width: 100vw;
  ` : isObject ? `
      // min-height: 500px;
      height: auto;
      width: 100%;


  ` : `
    height: 300px;
    width: 100%;
  `} 


`
export const StyledSlide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  text-align: center;

`


