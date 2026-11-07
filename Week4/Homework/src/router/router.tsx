import { createBrowserRouter } from 'react-router';
import { ROUTE_PATH } from './path';
import RootLayout from '../layout/RootLayout';
import AuthPage from '../pages/AuthPage';
import PostListPage from '../pages/PostListPage';
import PostWritePage from '../pages/PostWritePage';
import PostDetailPage from '../pages/PostDetailPage';
import PostEditPage from '../pages/PostEditPage';

export const router = createBrowserRouter([
  { path: ROUTE_PATH.AUTH, element: <AuthPage /> },
  {
    element: <RootLayout />,
    children: [
      { path: ROUTE_PATH.POST_LIST, element: <PostListPage /> },
      { path: ROUTE_PATH.POST_WRITE, element: <PostWritePage /> },
      { path: ROUTE_PATH.POST_DETAIL, element: <PostDetailPage /> },
      { path: ROUTE_PATH.POST_EDIT, element: <PostEditPage /> },
    ],
  },
]);