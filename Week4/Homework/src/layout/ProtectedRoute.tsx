import { useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { ROUTE_PATH } from '../router/path';
import { getAuthorizationCode } from '../utils/auth';

function ProtectedRoute() {
  const navigate = useNavigate();
  const authorizationCode = getAuthorizationCode();
  const hasAlerted = useRef(false);

  useEffect(() => {
    if (authorizationCode || hasAlerted.current) return;

    hasAlerted.current = true;
    alert('회원 코드를 먼저 발급받아주세요.');
    navigate(ROUTE_PATH.AUTH, { replace: true });
  }, [authorizationCode, navigate]);

  if (!authorizationCode) return null;

  return <Outlet />;
}

export default ProtectedRoute;