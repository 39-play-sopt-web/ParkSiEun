export type Part = 'WEB' | 'iOS' | 'ANDROID';

export interface AuthorizationCodeRequest {
  part: Part;
}

export interface AuthorizationCodeResponse {
  authorizationCode: string;
}
