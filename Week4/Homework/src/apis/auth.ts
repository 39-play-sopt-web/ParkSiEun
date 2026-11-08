import { api } from './instance';
import type { ApiResponse } from '../types/api';
import type {
  AuthorizationCodeResponse,
  AuthorizationCodeRequest,
  Part,
} from '../types/auth';

export async function issueAuthorizationCode(part: Part) {
  const body: AuthorizationCodeRequest = { part };

  const response = await api
    .post('members/authorization-code', { json: body })
    .json<ApiResponse<AuthorizationCodeResponse>>();

  return response.data;
}
