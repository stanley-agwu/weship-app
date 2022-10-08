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