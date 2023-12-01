export interface LoginData {
    email: string;
    password: string;
  }
  
export interface SignupData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
}

//   interface AuthResponse {
//     token: string;
//   }
  
//   interface AuthAPI {
//     login(credentials: LoginData): Promise<AuthResponse>;
//     signup(data: SignupData): Promise<AuthResponse>;
//   }