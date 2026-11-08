import { useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router';
import styled from '@emotion/styled';
import { ROUTE_PATH } from '../router/path';
import { usePostDetail, useUpdatePost } from '../hooks/usePosts';
import type { Post } from '../types/post';

const CONTENT_MAX_LENGTH = 1000;

function PostEditPage() {
  const { postId } = useParams();
  const id = Number(postId);
  const isValidId = Number.isInteger(id) && id > 0;
  const { data: post, isPending, isError } = usePostDetail(id);

  function renderContent() {
    if (!isValidId) {
      return <Message role="alert">잘못된 게시글 주소예요.</Message>;
    }
    if (isPending) return <Message>게시글을 불러오는 중...</Message>;
    if (isError) {
      return <Message role="alert">게시글을 불러오지 못했어요.</Message>;
    }

    return <EditForm post={post} />;
  }

  return (
    <Wrapper>
      <Title>게시글 수정</Title>
      {renderContent()}
    </Wrapper>
  );
}

interface EditFormProps {
  post: Post;
}

function EditForm({ post }: EditFormProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const { mutate: submitEdit, isPending } = useUpdatePost(post.id);

  const isEmpty = !title.trim() || !content.trim();
  const detailPath = generatePath(ROUTE_PATH.POST_DETAIL, {
    postId: String(post.id),
  });

  function handleSubmit() {
    submitEdit(
      { title: title.trim(), content: content.trim() },
      {
        onSuccess: () => {
          alert('게시글이 수정되었어요.');
          navigate(detailPath);
        },
        onError: () => {
          alert('게시글 수정에 실패했어요. 다시 시도해주세요.');
        },
      },
    );
  }

  function handleCancel() {
    navigate(detailPath);
  }

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <Field>
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="제목을 입력해주세요"
        />
      </Field>

      <Field>
        <Label htmlFor="content">본문</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="본문을 입력해주세요"
        />
        <Counter>
          {content.length} / {CONTENT_MAX_LENGTH}
        </Counter>
      </Field>

      <Buttons>
        <SubButton type="button" onClick={handleCancel}>
          취소
        </SubButton>
        <SubmitButton type="submit" disabled={isEmpty || isPending}>
          {isPending ? '수정 중...' : '수정'}
        </SubmitButton>
      </Buttons>
    </Form>
  );
}

export default PostEditPage;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
`;

const Input = styled.input`
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

const Textarea = styled.textarea`
  min-height: 200px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.95rem;
  line-height: 1.6;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Counter = styled.span`
  align-self: flex-end;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.subtext};
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const SubButton = styled.button`
  padding: 12px 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
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

const Message = styled.p`
  padding: 40px 0;
  color: ${({ theme }) => theme.colors.subtext};
  text-align: center;
`;