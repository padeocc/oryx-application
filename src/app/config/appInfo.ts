export const appInfo = {
  appName: process?.env?.NEXT_PUBLIC_AUTH_APPINFO_NAME || '',
  apiDomain: process?.env?.NEXT_PUBLIC_AUTH_APPINFO_APIDOMAIN || '',
  websiteDomain: process?.env?.NEXT_PUBLIC_AUTH_APPINFO_WEBSITEDOMAIN || '',
  apiBasePath: process?.env?.NEXT_PUBLIC_AUTH_APPINFO_APIBASEPATH || '',
  websiteBasePath: process?.env?.NEXT_PUBLIC_AUTH_APPINFO_WEBSITEBASEPATH || ''
};
