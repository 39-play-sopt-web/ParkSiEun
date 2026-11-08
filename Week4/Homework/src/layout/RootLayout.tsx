import { Outlet } from 'react-router';
import styled from '@emotion/styled';
import Header from '../components/Header';

function RootLayout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default RootLayout;

const Main = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 16px;
`;