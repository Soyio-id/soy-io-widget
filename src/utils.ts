import { PRODUCTION_URL, SANDBOX_URL } from './constants';
import type { ConfigProps, Flow } from './types';

export function getFullUrl(
  flow: Flow,
  configProps: ConfigProps,
  isSandbox: boolean,
  developmentUrl: string | undefined,
): string {
  const baseUrl = developmentUrl || (isSandbox ? SANDBOX_URL : PRODUCTION_URL);
  const urlParams = Object.entries(configProps)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return `${baseUrl}/${flow}?sdk=web&${urlParams}`;
}
