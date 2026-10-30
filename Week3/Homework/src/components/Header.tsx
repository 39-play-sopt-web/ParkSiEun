import styled from "@emotion/styled";

const Header = () => {
    return (
        <Wrapper>
            <Logo>
            PLAY SOPT <Highlight>MOVIE</Highlight>
            </Logo>
        </Wrapper>
    );
};

export default Header;

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px 24px;
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const Logo = styled.h1`
  font-size: 1.2rem;
  font-weight: 800;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;