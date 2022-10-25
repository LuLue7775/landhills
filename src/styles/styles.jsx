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
    font-family: Circular Medium;

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

  .canvas {
    pointer-events: none;
  }
`;

export const StyledNav = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`
export const StyledTextMedium = styled.div`
  padding: 0 0 0 2rem;
  font-size: 1.5rem;
  lineHeight: 1.5rem;
`

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