import ky from 'ky';
import { getAuthorizationCode } from '../utils/auth';

const AUTH_HEADER_NAME = 'Authorization';

export const api = ky.create({
  prefix: import.meta.env.VITE_API_URL,
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const authorizationCode = getAuthorizationCode();
        if (authorizationCode) {
          request.headers.set(AUTH_HEADER_NAME, authorizationCode);
        }
      },
    ],
  },
});