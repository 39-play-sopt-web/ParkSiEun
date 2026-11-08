import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from '@emotion/styled';
import { ROUTE_PATH } from '../router/path';
import { useCreatePost } from '../hooks/usePosts';

const CONTENT_MAX_LENGTH = 1000;

function PostWritePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const { mutate: submitPost, isPending } = useCreatePost();

  const isEmpty = !title.trim() || !content.trim() || !author.trim();

  function handleSubmit() {
    submitPost(
      { title: title.trim(), content: content.trim(), author: author.trim() },
      {
        onSuccess: () => {
          alert(`${author.trim()}님의 게시글이 작성되었어요.`);
          navigate(ROUTE_PATH.POST_LIST);
        },
        onError: () => {
          alert('게시글 작성에 실패했어요. 다시 시도해주세요.');
        },
      },
    );
  }

  function handleGoToList() {
    navigate(ROUTE_PATH.POST_LIST);
  }

  return (
    <Wrapper>
      <Title>게시글 작성</Title>

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

        <Field>
          <Label htmlFor="author">작성자</Label>
          <Input
            id="author"
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="작성자를 입력해주세요"
          />
        </Field>

        <Buttons>
          <SubButton type="button" onClick={handleGoToList}>
            ←목록으로
          </SubButton>
          <SubmitButton type="submit" disabled={isEmpty || isPending}>
            {isPending ? '작성 중...' : '작성'}
          </SubmitButton>
        </Buttons>
      </Form>
    </Wrapper>
  );
}

export default PostWritePage;

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

const Counter = styled.span`
  align-self: flex-end;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.subtext};
`;
