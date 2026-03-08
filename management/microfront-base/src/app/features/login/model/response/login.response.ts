import { User } from '../../../profile/models/user';

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: User;
}
