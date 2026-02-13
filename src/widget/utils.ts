import { version } from '../../package.json';
import { PRODUCTION_URL, SANDBOX_URL } from '../constants';
import type { RequestConfig } from '../types';

import type { DisclosureRequestBoxConfig } from './types';

type RegisterPasskeyUrlParams = {
  sessionToken: string;
  companyId: `com_${string}`;
  identifier: string;
}

type PasskeyAuthenticationUrlParams = {
  requestableToken: string;
  identifier: string;
}

function getBaseUrl(developmentUrl?: string, isSandbox?: boolean): string {
  return developmentUrl || (isSandbox ? SANDBOX_URL : PRODUCTION_URL);
}

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
  const baseUrl = getBaseUrl(options.developmentUrl, isSandbox);
  const urlParams = Object.entries(options.configProps)
    .filter(([key, value]) => value || key === 'disclosureRequestId')
    .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    .join('&');
  const path = getPath(options);

  return `${baseUrl}/${path}?sdk=web&sdkVersion=${version}&${urlParams}`;
}

export function getDisclosureRequestBoxPath(options: DisclosureRequestBoxConfig): string {
  return `embed/widget/disclosures/${options.disclosureRequestId}`;
}

export function getDisclosureRequestBoxUrl(options: DisclosureRequestBoxConfig, identifier: string): string {
  const isSandbox = options.isSandbox ?? false;
  const baseUrl = getBaseUrl(options.developmentUrl, isSandbox);
  const path = getDisclosureRequestBoxPath(options);
  const queryParams = new URLSearchParams({
    sdk: 'web',
    sdkVersion: version,
    identifier,
  });

  if (options.customColor) {
    queryParams.set('customColor', options.customColor);
  }

  return `${baseUrl}/${path}?${queryParams.toString()}`;
}

export function getRegisterPasskeyPopupUrl(
  options: DisclosureRequestBoxConfig,
  params: RegisterPasskeyUrlParams,
): string {
  const baseUrl = getBaseUrl(options.developmentUrl, options.isSandbox ?? false);
  const queryParams = new URLSearchParams({
    session_token: params.sessionToken,
    company_id: params.companyId,
    identifier: params.identifier,
  });

  return `${baseUrl}/widget/register_passkey?${queryParams.toString()}`;
}

export function getPasskeyAuthenticationPopupUrl(
  options: DisclosureRequestBoxConfig,
  params: PasskeyAuthenticationUrlParams,
): string {
  const baseUrl = getBaseUrl(options.developmentUrl, options.isSandbox ?? false);
  const queryParams = new URLSearchParams({
    requestable_id: params.requestableToken,
    identifier: params.identifier,
  });

  return `${baseUrl}/widget/passkey_authentication?${queryParams.toString()}`;
}
