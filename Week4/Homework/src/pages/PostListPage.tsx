import { useState } from 'react';
import styled from '@emotion/styled';
import PostCard from '../components/PostCard';
import { usePostList } from '../hooks/usePosts';

function PostListPage() {
  const [inputValue, setInputValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const { data, isPending, isError } = usePostList(keyword);

  function handleChange(value: string) {
    setInputValue(value);

    if (value.trim() === '') setKeyword('');
  }

  function handleSearch() {
    setKeyword(inputValue.trim());
  }

  function renderPostList() {
    if (isPending) return <Message>게시글을 불러오는 중...</Message>;
    if (isError) {
      return <Message role="alert">게시글을 불러오지 못했어요.</Message>;
    }
    if (data.posts.length === 0) {
      return (
        <Message>{keyword ? '검색 결과가 없어요.' : '게시글이 없어요.'}</Message>
      );
    }

    return (
      <List>
        {data.posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </List>
    );
  }

  return (
    <Wrapper>
      <Title>게시글 목록</Title>

      <SearchForm
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}
      >
        <SearchInput
          type="text"
          value={inputValue}
          onChange={(event) => handleChange(event.target.value)}
          placeholder="제목으로 검색해보세요 (2자 이상 입력)"
          aria-label="제목 검색"
        />
        <SearchButton type="submit" disabled={inputValue.trim().length < 2}>
          검색
        </SearchButton>
      </SearchForm>

      {renderPostList()}
    </Wrapper>
  );
}

export default PostListPage;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
`;

const Message = styled.p`
  padding: 40px 0;
  color: ${({ theme }) => theme.colors.subtext};
  text-align: center;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 8px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SearchButton = styled.button`
  padding: 0 20px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.disabledText};
  }
`;