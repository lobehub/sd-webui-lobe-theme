import { createGlobalStyle } from 'antd-style';

const GlobalStyle = createGlobalStyle`

  html,body {
    --font-settings: "cv01", "tnum", "kern";
    --font-variations: "opsz" auto, tabular-nums;

    overflow-x: hidden;

    margin: 0;
    padding: 0;

    font-family: ${({ theme }) => theme.fontFamily};
    font-size: ${({ theme }) => theme.fontSize}px;
    font-feature-settings: var(--font-settings);
    font-variation-settings: var(--font-variations);
    line-height: 1;
    color: ${({ theme }) => theme.colorTextBase};
    text-size-adjust: none;
    text-rendering: optimizelegibility;
    vertical-align: baseline;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
  }
  

  * {
	  box-sizing: border-box;
	  vertical-align: baseline;
  }

  ::-webkit-scrollbar {
	  width: 0;
	  height: 4px;
	  background-color: transparent;

	  &-thumb {
		  background-color: transparent;
		  border-radius: 4px;
		  transition: background-color 500ms ${({ theme }) => theme.motionEaseOut};
	  }

	  &-corner {
		  display: none;
	  }
  }

  #root {
	  min-height: 100vh;
  }

  p {
    text-align: justify;
    word-wrap: break-word;
  }
  
  code {
	  font-family: ${({ theme }) => theme.fontFamilyCode} !important;

	  * {
		  font-family: inherit !important;
	  }
  }

  *:hover, *:focus {
	  ::-webkit-scrollbar {
		  &-thumb {
			  background-color: ${({ theme }) => theme.colorFill};
		  }
	  }
  }
`;

export default GlobalStyle;
