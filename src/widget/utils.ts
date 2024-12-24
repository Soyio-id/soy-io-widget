import { PRODUCTION_URL, SANDBOX_URL } from '../constants';
import type { RequestConfig } from '../types';

export function getPath(options: RequestConfig): string {
  let path = 'widget/';
  if ('disclosureRequestId' in options.configProps) {
    path += ['disclosures', options.configProps.disclosureRequestId].join('/');
  } else {
    path += options.request;
  }

  return path;
}

export function getFullUrl(options: RequestConfig): string {
  const isSandbox = options.isSandbox ?? false;
  const baseUrl = options.developmentUrl || (isSandbox ? SANDBOX_URL : PRODUCTION_URL);
  const urlParams = Object.entries(options.configProps)
    .filter(([key, value]) => value || key === 'disclosureRequestId')
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  const path = getPath(options);

  return `${baseUrl}/${path}?sdk=web&${urlParams}`;
}

export const isBrowser = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
