export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  comfirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  showPassword: boolean;
}

export type LoggedInUser = {
  _id: string,
  username: string,
  email: string,
  createdAt: string,
  updatedAt: string,
  token?: string,
}

export interface IState {
  user: LoggedInUser | null;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export type ErrorType = {
  response: {
    data: { 
      message: string;
    }
  }
}

export interface IRootState {
  auth: IState;
}