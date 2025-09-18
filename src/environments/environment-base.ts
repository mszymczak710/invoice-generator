import packageInfo from '../../package.json';

export const environmentBase = {
  apiUrl: '/api',
  appName: packageInfo.displayName,
  version: packageInfo.version
};
