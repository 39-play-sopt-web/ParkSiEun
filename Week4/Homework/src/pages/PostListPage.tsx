import styled from '@emotion/styled';
import PostCard from '../components/PostCard';
import { usePostList } from '../hooks/usePosts';

function PostListPage() {
  const { data, isPending, isError } = usePostList('');

  function renderPostList() {
    if (isPending) return <Message>게시글을 불러오는 중...</Message>;
    if (isError) {
      return <Message role="alert">게시글을 불러오지 못했어요.</Message>;
    }
    if (data.posts.length === 0) return <Message>게시글이 없어요.</Message>;

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