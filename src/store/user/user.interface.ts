import { IUser } from 'shared/types/user.types';

export interface IInitialState {
  user: IUser | null;
  isLoading: boolean;
}

export interface ITokens {
  access?: string;
  refresh?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser;
}

export interface IRegister {
  email: string;
  password: string;
  phone: string;
}
