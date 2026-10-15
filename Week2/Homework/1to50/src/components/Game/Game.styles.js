import styled from '@emotion/styled';

export const Wrapper = styled.section`
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
padding-top: 48px;
`;

export const NextNumberText = styled.p`
font-size: 16px;
color: #555;
strong {
font-size: 28px;
color: #111;
}
`;

export const Grid = styled.div`
display: grid;
grid-template-columns: repeat(3, 80px);
gap: 8px;
`;

export const NumberButton = styled.button`
width: 80px;
height: 80px;
border-radius: 10px;
background: white;
font-size: 22px;
font-weight: 700;

&:hover:not(:disabled) {
background: #5fe0c8;
}

 /* 빈칸 점선으로 표시*/
&:disabled {
background: transparent;
border: 1.5px dashed rgba(0, 0, 0, 0.18);
cursor: default;
}
`;