import { PRODUCTION_URL, SANDBOX_URL } from './constants';
import type { AttemptConfig } from './types';

export function getFullUrl(options: AttemptConfig): string {
  const isSandbox = options.isSandbox ?? false;
  const baseUrl = options.developmentUrl || (isSandbox ? SANDBOX_URL : PRODUCTION_URL);
  const urlParams = Object.entries(options.configProps)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return `${baseUrl}/${options.flow}?sdk=web&${urlParams}`;
}
