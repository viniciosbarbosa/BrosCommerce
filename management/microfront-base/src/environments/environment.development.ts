export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  supportedLangs: ['pt', 'en', 'es'],
  defaultLang: 'en',
  theme: 'theme-dark',
  snackBarDuration: 3000,
  remotes: {
    productCategory: 'http://localhost:4201/remoteEntry.js',
    report: 'http://localhost:4202/remoteEntry.js',
    users: 'http://localhost:4203/remoteEntry.js',
  },
};
