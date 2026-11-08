import type { Part } from '../types/auth';

const AUTHORIZATION_CODE_KEY = 'authorizationCode';
const PART_KEY = 'part';

function isPart(value: string | null): value is Part {
  return value === 'WEB' || value === 'iOS' || value === 'ANDROID';
}

export function saveAuth(authorizationCode: string, part: Part) {
  localStorage.setItem(AUTHORIZATION_CODE_KEY, authorizationCode);
  localStorage.setItem(PART_KEY, part);
}

export function getAuthorizationCode() {
  return localStorage.getItem(AUTHORIZATION_CODE_KEY);
}

export function getPart() {
  const part = localStorage.getItem(PART_KEY);
  return isPart(part) ? part : null;
}

export function clearAuth() {
  localStorage.removeItem(AUTHORIZATION_CODE_KEY);
  localStorage.removeItem(PART_KEY);
}