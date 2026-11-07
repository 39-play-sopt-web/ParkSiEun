import { Global, css } from '@emotion/react';
import { theme } from './theme';

function GlobalStyle() {
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: ${theme.colors.background};
          color: ${theme.colors.text};
          font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif;
        }

        button {
          border: none;
          background: none;
          font: inherit;
          color: inherit;
          cursor: pointer;
        }

        button:disabled {
          cursor: not-allowed;
        }

        input,
        textarea {
          font: inherit;
          color: inherit;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
      `}
    />
  );
}

export default GlobalStyle;