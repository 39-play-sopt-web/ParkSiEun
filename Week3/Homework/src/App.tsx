import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import router from './router';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
export default App;
