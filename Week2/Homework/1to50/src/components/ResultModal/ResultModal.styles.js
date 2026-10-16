import styled from '@emotion/styled';

export const Backdrop = styled.div`
position: fixed;
inset: 0;
display: flex;
justify-content: center;
align-items: center;
background: rgba(0, 0, 0, 0.4);
`;

export const ModalBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 16px;
width: 280px;
padding: 32px 24px 24px;
border-radius: 14px;
background: white;
`;

export const Message = styled.p`
font-size: 16px;
font-weight: 700;
`;

export const Time = styled.p`
font-size: 30px;
font-weight: 800;
`

export const ConfirmButton = styled.button`
width: 100%;
padding: 10px 0;
border-radius: 8px;
font-weight: 700;
background: #5fe0c8;
`;