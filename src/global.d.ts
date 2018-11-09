declare namespace NodeJS {
  // tslint:disable-next-line
  interface ProcessEnv {
    readonly BASE_API_URL: string;
    readonly NODE_ENV: 'development' | 'production';
  }
}
