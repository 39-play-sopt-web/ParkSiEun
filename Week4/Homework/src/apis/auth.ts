import { api } from './instance';
import type { ApiResponse } from '../types/api';
import type { AuthorizationCodeResponse, Part } from '../types/auth';

export async function issueAuthorizationCode(part: Part) {
  const response = await api
    .post('members/authorization-code', { json: { part } })
    .json<ApiResponse<AuthorizationCodeResponse>>();

  return response.data;
}