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

export interface LoginResponseData {
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        isDeleted: boolean;
        isSeller: boolean;
        roles: string[];
        sellerDetails: {
            address?: {
            street: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            };
            contactDetails?: {
            phone: string;
            email: string;
            };
            companyName?: string;
            _id: string;
            isActive: boolean;
        } | null;
        created: string;
        updated: string;
    };
    token: string;
}

export interface AuthResponse {
    success: boolean;
    data: LoginResponseData
}

  
  
//   interface AuthAPI {
//     login(credentials: LoginData): Promise<AuthResponse>;
//     signup(data: SignupData): Promise<AuthResponse>;
//   }