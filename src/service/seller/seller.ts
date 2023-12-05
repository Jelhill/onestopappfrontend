import axios from 'axios';
import { SellerData } from './sellerInterface';

class SellerService {
    private readonly BASE_URL: string;
    constructor() {
        this.BASE_URL = 'http://localhost:3001/api/seller/'
    }

   async createSeller(sellerData: SellerData) {
    console.log(sellerData)
      const token = localStorage.getItem("token")
      const response = await axios.post(`${this.BASE_URL}`, sellerData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
  }
}

const sellerService = new SellerService();
export default sellerService;
