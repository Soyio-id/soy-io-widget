import { PRODUCTION_URL, SANDBOX_URL } from './constants';

// eslint-disable-next-line complexity
export function getFullUrl(
  flow: Flow,
  configProps: Partial<ConfigProps>,
  isSandbox: boolean,
  developmentUrl: string | undefined,
): string {
  const baseUrl = developmentUrl || (isSandbox ? SANDBOX_URL : PRODUCTION_URL);
  const baseParams = `platform=web&companyId=${encodeURIComponent(configProps.companyId!)}`;
  const userEmailParam = configProps.userEmail ? `&userEmail=${configProps.userEmail}` : '';
  const userReferenceParam = configProps.userReference ? `&userReference=${configProps.userReference}` : '';
  const optionalParams = userEmailParam + userReferenceParam;

  switch (flow) {
  case 'authenticate':
    return `${baseUrl}/authenticate?${baseParams}&identityId=${configProps.identityId}`;
  case 'register':
    return `${baseUrl}/register?${baseParams}&flowTemplateId=${configProps.flowTemplateId}${optionalParams}`;
  default:
    return 'INVALID_PARAMS';
  }
}
