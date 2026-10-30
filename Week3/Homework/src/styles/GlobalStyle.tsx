import { Global, css } from '@emotion/react';
import type { Theme } from '@emotion/react';

const GlobalStyle = () => {
  return (
    <Global
      styles={(theme: Theme) => css`
        *,
        *::before,
        *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background-color: ${theme.colors.background};
          color: ${theme.colors.text};
          font-family: -apple-system, sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          border: none;
          background: none;
          cursor: pointer;
          font: inherit;
        }

        img {
          display: block;
          max-width: 100%;
        }
      `}
    />
  );
};

export default GlobalStyle;
