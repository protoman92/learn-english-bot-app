declare module 'react-social-login' {
  export type MinimalSocialLoginProps = Readonly<{
    children?: import('react').ReactNode;
  }>;

  export type SocialLoginProps = MinimalSocialLoginProps &
    Readonly<{
      provider: 'facebook';
      appId: string;
      onLoginSuccess: (...args: any[]) => void;
      onLoginFailure: (...args: any[]) => void;
    }>;

  function _(
    component: import('react').ComponentType<
      MinimalSocialLoginProps &
        Readonly<{ triggerLogin: (...args: any[]) => void }>
    >
  ): import('react').ComponentType<SocialLoginProps>;

  export default _;
}
