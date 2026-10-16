import styled from '@emotion/styled';

export const Wrapper = styled.section`
max-width: 600px;
margin: 48px auto;
padding: 0 16px;
`;

export const TitleRow = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
`;

export const ClearButton = styled.button`
padding: 6px 14px;
border: 1px solid #e05555;
border-radius: 6px;
color: #e05555;
font-weight: 600;
background: white;
`;

export const EmptyText = styled.p`
margin-top: 60px;
text-align: center;
color: #777;
`;

export const Table = styled.table`
width: 100%;
border-collapse: separate;
border-spacing: 0;
border-radius: 10px;
overflow: hidden;
background: white;

th,
td {
padding: 12px 16px;
text-align: left;
}

th {
background: #5fe0c8;
}
`;