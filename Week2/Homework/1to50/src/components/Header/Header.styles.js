import styled from '@emotion/styled';

export const Wrapper = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 12px 24px;
  background: white;

  h1 {
    font-size: 18px;
  }
`;

export const TabButton = styled.button`
  padding: 6px 16px;
  border-radius: 8px;
  font-weight: 600;
  margin: 0 8px;
  color: ${({ $active }) => ($active ? '#111' : '#888')};
  background: ${({ $active }) => ($active ? '#c9f5fb' : 'transparent')};
`;

export const Right = styled.div`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Timer = styled.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 700;
  background: #c9f5fb;
`;
