declare namespace NodeJS {
  // tslint:disable-next-line
  interface ProcessEnv {
    readonly REACT_APP_BASE_API_URL: string;
    readonly REACT_APP_ENABLE_WDYU: string;
    readonly REACT_APP_FACEBOOK_APP_ID: string;
    readonly NODE_ENV: 'development' | 'production';
  }
}
