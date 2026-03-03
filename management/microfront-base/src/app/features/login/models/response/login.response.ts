import { User } from '../../../profile/models/user';

export interface LoginResponse {
  token: string;
  user: User;
}
