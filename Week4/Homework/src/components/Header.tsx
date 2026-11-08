import { NavLink, useNavigate } from 'react-router';
import styled from '@emotion/styled';
import { ROUTE_PATH } from '../router/path';
import { clearAuth, getPart } from '../utils/auth';

function Header() {
  const navigate = useNavigate();
  const part = getPart();

  function handleLogout() {
    clearAuth();
    navigate(ROUTE_PATH.AUTH);
  }

  return (
    <Container>
      <PartBadge>{part ?? '비회원'}</PartBadge>

      <Nav aria-label="주요 메뉴">
        <Tab to={ROUTE_PATH.POST_LIST} end>
          게시글 목록
        </Tab>
        <Tab to={ROUTE_PATH.POST_WRITE}>글쓰기</Tab>
        <LogoutButton type="button" onClick={handleLogout}>
          로그아웃
        </LogoutButton>
      </Nav>
    </Container>
  );
}

export default Header;

const Container = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const PartBadge = styled.span`
  padding: 6px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  font-size: 0.8rem;
  font-weight: 600;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Tab = styled(NavLink)`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.subtext};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &[aria-current='page'] {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

const LogoutButton = styled.button`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.subtext};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
