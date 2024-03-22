import { PRODUCTION_URL, SANDBOX_URL } from './constants';

export function getFullUrl(
  flow: Flow,
  configProps: Partial<ConfigProps>,
  isSandbox: boolean,
  developmentUrl: string | undefined,
): string {
  const baseUrl = developmentUrl || (isSandbox ? SANDBOX_URL : PRODUCTION_URL);
  const urlParams = Object.entries(configProps)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return `${baseUrl}/${flow}?${urlParams}`;
}
