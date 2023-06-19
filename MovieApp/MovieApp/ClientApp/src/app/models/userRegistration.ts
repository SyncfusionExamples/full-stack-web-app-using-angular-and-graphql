export interface UserRegistration {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

export interface RegistrationResponse {
  isRegistrationSuccess: boolean;
  errorMessage: string;
}

export type RegistrationType = {
  userRegistration: RegistrationResponse;
};
