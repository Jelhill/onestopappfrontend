import axios, { AxiosResponse } from 'axios';
import { config } from '../../config';
import { CarApiData } from './carInterfaces';

export interface Car {
    _id: string;
    sellerId: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage?: number;
    fuelType?: string;
    transmission?: string;
    engine?: string;
    color?: string;
    condition?: string;
    description?: string;
    features?: string[];
    imageIds: string[];
    sold: boolean;
    salePrice?: number | null;
    created: Date;
    updated: Date;
  }

class CarApi {
  private readonly BASE_URL: string;

  constructor() {
    this.BASE_URL = `${config.BASE_URL}/api/car`
  }

  public async getAllCars(): Promise<Car[]> {
    try {
      const response: AxiosResponse<CarApiData> = 
        await axios.get(`${this.BASE_URL}`);
      return response?.data?.data;
    } catch (error) {
      console.error('Error fetching all cars:', error);
      throw error;
    }
  }

  async uploadCarData(carData: FormData) {
    const token = localStorage.getItem("token")
    const response = await axios.post(`${this.BASE_URL}`, carData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }

  public async getCarById(carId: string): Promise<Car | null> {
    try {
      const response: AxiosResponse<Car> = await axios.get<Car>(`${this.BASE_URL}/${carId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching car by ID:', error);
      throw error;
    }
  }

  public async getAllCarsBySellerId(sellerId: string): Promise<CarApiData | null> {
    try {
      const response: AxiosResponse<CarApiData> = await axios.get<CarApiData>(`${this.BASE_URL}/seller/${sellerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching car by ID:', error);
      throw error;
    }
  }

  public async createCar(carData: Partial<Car>): Promise<Car> {
    try {
      const response: AxiosResponse<Car> = await axios.post<Car>(`${this.BASE_URL}`, carData);
      return response.data;
    } catch (error) {
      console.error('Error creating car:', error);
      throw error;
    }
  }

  public async updateCar(carId: string, updatedCarData: Partial<Car>): Promise<Car> {
    try {
      const response: AxiosResponse<Car> = await axios.patch<Car>(`${this.BASE_URL}/${carId}`, updatedCarData);
      return response.data;
    } catch (error) {
      console.error('Error updating car:', error);
      throw error;
    }
  }

  public async deleteCar(carId: string): Promise<void> {
    try {
      await axios.delete(`${this.BASE_URL}/${carId}`);
    } catch (error) {
      console.error('Error deleting car:', error);
      throw error;
    }
  }
}

const CarService = new CarApi()
export default CarService;
