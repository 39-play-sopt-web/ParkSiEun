import { generatePath, Link } from 'react-router';
import styled from '@emotion/styled';
import { ROUTE_PATH } from '../router/path';
import { formatDate } from '../utils/format';
import type { Post } from '../types/post';

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const detailPath = generatePath(ROUTE_PATH.POST_DETAIL, {
    postId: String(post.id),
  });

  return (
    <CardLink to={detailPath}>
      <PostTitle>{post.title}</PostTitle>
      <Content>{post.content}</Content>
      <Meta>
        <Author>{post.author}</Author>
        <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
      </Meta>
    </CardLink>
  );
}

export default PostCard;

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  transition:
    border-color 0.2s,
    transform 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const PostTitle = styled.h2`
  font-size: 1.05rem;
  font-weight: 600;
`;

const Content = styled.p`
  overflow: hidden;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.subtext};
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Meta = styled.div`
  display: flex;
  gap: 8px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.subtext};
`;

const Author = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;
