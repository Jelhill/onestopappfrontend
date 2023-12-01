import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/user';

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
}

interface AuthResponse {
  token: string; // Modify this according to the actual response structure
  // Other properties...
}

class UserService {
  async login(credentials: LoginData): Promise<AuthResponse> {
    const { email, password } = credentials;
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    return response.data as AuthResponse;
  }

  async signup(data: SignupData) {
    const { firstname, lastname, email, password, phone } = data;
    const response = await axios.post(`${BASE_URL}/auth/sign-up`, {
      firstname,
      lastname,
      email,
      password,
      phone
    });
    return response.data;
  }
}

export default new UserService();
