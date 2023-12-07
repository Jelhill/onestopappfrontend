import axios, { AxiosResponse } from 'axios';
import { config } from '../../config';
import { LoginResponseData } from '../user/userInterface';
import { CartItem } from './cartInterface';

export interface CartItemApiResponse {
  message: string,
  success: boolean;
  data: {
    created: Date,
    items: [CartItem],
    updated: Date,
    user: LoginResponseData
  }
}

class CartApi {
  private readonly BASE_URL: string;
  private readonly token: string | null;

  constructor() {
    this.BASE_URL = `${config.BASE_URL}/api/cart`;
    this.token = localStorage.getItem("token");
  }

  public async getCartItems(): Promise<CartItem[]> {
    try {
      const response: AxiosResponse<CartItemApiResponse> = await axios.get(`${this.BASE_URL}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        }
      });
      // Return only the items array part of the response data
      return response.data.data.items;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
    }
  }
  public async addCartItem(cartItemData: Partial<CartItem>): Promise<CartItem> {
    try {
      const response: AxiosResponse<CartItem> = await axios.post<CartItem>(`${this.BASE_URL}`, cartItemData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  }

  public async updateCartItem(cartItemId: string, updatedCartItemData: Partial<CartItem>): Promise<CartItem> {
    try {
      const response: AxiosResponse<CartItem> = await axios.patch<CartItem>(`${this.BASE_URL}/${cartItemId}`, updatedCartItemData);
      return response.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  }

  public async deleteCartItem(cartItemId: string): Promise<void> {
    try {
      await axios.delete(`${this.BASE_URL}/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        }      
      });
    } catch (error) {
      console.error('Error deleting cart item:', error);
      throw error;
    }
  }
}

const CartService = new CartApi();
export default CartService;
