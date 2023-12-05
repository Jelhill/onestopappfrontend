import axios from 'axios';
import { AuthResponse, LoginResponseData } from './userInterface';

const BASE_URL = 'http://localhost:3001/api/users';
const BASE_URL_AUTH = 'http://localhost:3001/api/auth'

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



class UserService {
  async login(credentials: LoginData): Promise<AuthResponse> {
    const { email, password } = credentials;
    const response = await axios.post(`${BASE_URL_AUTH}/login`, { email, password });
    return response.data as AuthResponse;
  }

  async signup(data: SignupData) {
    const { firstname, lastname, email, password, phone } = data;
    console.log(data)
    const response = await axios.post(`${BASE_URL}`, {
      firstName: firstname,
      lastName: lastname,
      email,
      password,
      phone
    });
    return response.data as LoginResponseData;
  }

  async fetchUserData(token: string): Promise<LoginResponseData> {
    const id = localStorage.getItem("user");
    console.log("bearer ", token, id)
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as LoginResponseData;
  }
}

const userService = new UserService()
export default userService ;
