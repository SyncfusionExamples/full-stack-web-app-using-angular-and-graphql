export interface UserLogin {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  errorMessage: string;
}

export type LoginType = {
  userLogin: AuthResponse;
};
