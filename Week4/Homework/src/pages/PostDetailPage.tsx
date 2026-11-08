import { useNavigate, useParams, generatePath } from 'react-router';
import styled from '@emotion/styled';
import { ROUTE_PATH } from '../router/path';
import { usePostDetail, useDeletePost } from '../hooks/usePosts';
import { formatDate } from '../utils/format';
import { getAuthorizationCode } from '../utils/auth';

function PostDetailPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const id = Number(postId);
  const isValidId = Number.isInteger(id) && id > 0;
  const { data: post, isPending, isError } = usePostDetail(id);
  const { mutate: removePost, isPending: isDeleting } = useDeletePost();

  function handleGoToList() {
    navigate(ROUTE_PATH.POST_LIST);
  }

  function handleGoToEdit() {
    navigate(generatePath(ROUTE_PATH.POST_EDIT, { postId: String(id) }));
  }


  function handleDelete() {
    if (!getAuthorizationCode()) {
      alert('회원 코드를 먼저 발급받아주세요.');
      navigate(ROUTE_PATH.AUTH);
      return;
    }
    
    if (!confirm('정말 삭제할까요?')) return;

    removePost(id, {
      onSuccess: () => {
        alert('게시글이 삭제되었어요.');
        navigate(ROUTE_PATH.POST_LIST);
      },
      onError: () => {
        alert('게시글 삭제에 실패했어요. 다시 시도해주세요.');
      },
    });
  }

  function renderPost() {
    if (!isValidId) {
      return <Message role="alert">잘못된 게시글 주소예요.</Message>;
    }
    if (isPending) return <Message>게시글을 불러오는 중...</Message>;
    if (isError) {
      return <Message role="alert">게시글을 불러오지 못했어요.</Message>;
    }

    return (
      <>
      <Article>
        <Title>{post.title}</Title>
        <Meta>
          <Author>{post.author}</Author>
          <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
        </Meta>
        <Content>{post.content}</Content>
      </Article>
      
      <Buttons>
          <EditButton type="button" onClick={handleGoToEdit}>
            수정
          </EditButton>
          <DeleteButton type="button" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? '삭제 중...' : '삭제'}
          </DeleteButton>
        </Buttons>
      </>
    );
  }

  return (
    <Wrapper>
      <BackButton type="button" onClick={handleGoToList}>
        ← 목록으로
      </BackButton>
      {renderPost()}
    </Wrapper>
  );
}

export default PostDetailPage;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BackButton = styled.button`
  align-self: flex-start;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.subtext};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const Meta = styled.div`
  display: flex;
  gap: 8px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.subtext};
`;

const Author = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const Content = styled.p`
  line-height: 1.8;
  white-space: pre-wrap;
`;

const Message = styled.p`
  padding: 40px 0;
  color: ${({ theme }) => theme.colors.subtext};
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const EditButton = styled.button`
  padding: 10px 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.disabledText};
  }
`;