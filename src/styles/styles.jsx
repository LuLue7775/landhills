import styled, { createGlobalStyle } from 'styled-components';
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

  .canvas {
    pointer-events: none;
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
  line-height: 1.5rem;
  font-family: Circular Medium;

`

export const StyledText = styled.div`
  text-align: start;
  font-size: 1rem;
`

export const StyledLink = styled.a`
  cursor: pointer;
`

/**
 * Carousel
 */
export const StyledSwipeHandler = styled.div`
 z-index: -1;
`

export const StyledCarouselContainer = styled.div`
  display: flex;
  transition: ${(props) => (props.sliding ? "none" : "transform 1s ease")};
  transform: ${(props) => {
    if (!props.sliding) return "translateX(0%)";
    if (props.dir === 'PREV') return "translateX(-50%)";
    return "translateX(50%)";
  }};
`;

export const StyledWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const StyledCarouselSlot = styled.div`
  position: relative;
  display: flex;
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
  z-index:1;
  display: block;
  cursor: ${(props) => props.direction === 'PREV' ? `url('/img/prev.png')` : `url('/img/next.png')`}, auto;
  margin: 10px;
  text-decoration: none;
`;

export const StyledImageLink = styled.a`
  cursor: url('/img/plus.png'), auto;
`;

/**
 * Project Page
 */

// export const StyledProject = styled.div`
//   position: relative;
//   height:100%;
//   overflow: scroll;
// `;
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
export const StyledProject = styled.div`
  position: relative;
  height:100%;
  overflow: scroll;
`;

export const StyledRow = styled.div`
  width: 100%;
  font-size: 5rem;
  text-align: center;
  margin-bottom: 100px;
`;
export const StyledItems = styled.div`
  height: 500px;
  display: inline-block;
  margin: 10px;
`;
export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

