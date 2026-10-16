import { Global, css } from '@emotion/react';

const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif;
    background: #b8f0f7;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font: inherit;
  }
`;

export default function GlobalStyle() {
  return <Global styles={globalStyle} />;
}
