export type TwoFactorMethodAuthRequest = 'email' | 'phone';

export interface TwoFactorCodeAuthRequest {
  code: string;
}
