import styled, { createGlobalStyle, keyframes } from 'styled-components';
export const GlobalStyle = createGlobalStyle`

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
    font-family: Circular Book;

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

export const StyledMenuUl = styled.ul`
  font-size: 2rem;
  line-height: 2rem;
  font-family: Circular Medium;
  padding: 0;
  list-style-type: none;
`

export const StyledMenuInfo = styled.div`
  position: absolute;
  bottom: 1rem;
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
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`

export const StyledTextMedium = styled.div`
  padding: 0 0 0 2rem;
  font-size: 1.5rem;
  line-height: 3rem;
  font-family: Circular Medium;

`

export const StyledText = styled.div`
  text-align: start;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 0 .5rem;
  text-align: justify;

`

export const StyledLink = styled.a`
  cursor: pointer;
`

export const StyledPages = styled.div`
  position: relative;
  height:100%;
  overflow: scroll;
  padding-bottom: 10vh;
`;
export const StyledLoaderContainer = styled.div`
  position: relative;
  height:100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;



/**
 * Carousel
 */
export const StyledSwipeHandler = styled.div`
 z-index: -1;
`
export const StyledWrapper = styled.div`
  width: 100%;
  overflow: hidden;

`;

export const StyledCarouselContainer = styled.div`
  display: flex;
  transition: ${(props) => (props.sliding ? "none" : "transform 0.5s ease")};
  transform: ${(props) => {
    if (!props.sliding) return "translateX(0%)";
    if (props.dir === 'PREV') return "translateX(-100%)";
    return "translateX(100%)";
  }};
`;

export const StyledCarouselSlot = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  flex: 1 0 100%;
  flex-basis: 100%;
  height: min(60vh, 550px);
  margin-right: 20px;
  order: ${(props) => props.order};


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
  cursor: url('/img/plus.png'), auto;
`;


/**
 * Projects Page
 */


// export const StyledRow = styled.div`
//   font-size: 5rem;
//   text-align: center;
//   display: flex;
//   flex-flow: row wrap;
//   justify-content: center;

// `;
// export const StyledItems = styled.div`
//   position: relative;
//   height: 500px;
//   width: 400px;
//   margin: 10px;
// `;

// ========= non-next/image version 


export const StyledRow = styled.div`
  width: 100%;
  font-size: 5rem;
  text-align: center;
  margin-bottom: 100px;
`;
export const StyledItems = styled.div`
  height: 360px;
  display: inline-block;
  margin: 10px;
`;
export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

/**
 * Objects Page
 */

export const StyledSection = styled.div`
  height: auto;
  margin-bottom: 100px;

`;

export const StyledCoverSection = styled.div`
  width: 80%;
  margin-bottom: 10px;
`;

export const StyledObjectContent = styled.div`
  width: 100vw;
  text-align: justify;
  padding: 10vh 8vw;
  font-family: Circular Medium;
  font-size: 1.2rem;
  line-height: 2rem;
`;
export const StyledObjectDisplayCols = styled.div`
  display: flex;
  justify-content: center;
  height: 80vh;
  width: 100vw;
`;

export const StyledObjectCol = styled.div`
  width: 350px;
  height: auto;
  margin: 10px;
`

/**
 * Achive
 */
export const StyledTableWrapper = styled.div`
  position: relative;
  height: auto;
  width: 100vw;
  margin-bottom: 100px;
`
export const StyledImageWrapper = styled.div`
  position: absolute;
  left: 20vw;
  top: -100px;
  transform: ${({ mouseY }) => `translateY(${mouseY}px)`};
  height: 200px;
  width: 200px;
  pointer-events: none;
`

/**
 * Event & About
 */

export const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 3fr 1fr;
  margin: 6rem 0;
`
export const StyledCarouselWrapper = styled.div`
  width: 200px;
  height: 200px;
  padding: 0 0 0 2rem;

`
export const StyledTextWrapper = styled.div`
  padding: 0 0 0 4rem;
`
/**
 * Projects Single Page
 */

export const StyledWrap = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr; 
  overflow-y: scroll;
  
`

export const StyledCover = styled.div`
  position: relative;
  height: calc(100vh - 70px);
  width: 100%;
`

export const StyledProjectTitle = styled.h1`
  font-size: 2rem;
  padding: 1rem;
`
export const StyledProjectGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 40% 60%;

  height: auto;
  width: 100%;
`

export const StyledProjectContent = styled.div`
  position: relative;
  height: auto;
  width: 100%;
  margin: 2rem;
`

export const StyledProjectCoverImageContainer = styled.div`
  position: absolute;
  right: -10%;
  top: 0;
  height: 70vh;
  width: 60%;
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