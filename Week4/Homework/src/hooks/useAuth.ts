import { useMutation } from '@tanstack/react-query';
import { issueAuthorizationCode } from '../apis/auth';
import { saveAuth } from '../utils/auth';
import type { Part } from '../types/auth';

export function useIssueCode() {
  return useMutation({
    mutationFn: (part: Part) => issueAuthorizationCode(part),
    onSuccess: (data, part) => {
      saveAuth(data.authorizationCode, part);
    },
  });
}
