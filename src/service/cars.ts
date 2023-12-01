import axios, { AxiosResponse } from 'axios';

export interface Car {
    id: string;
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
  private readonly baseURL: string;

  constructor() {
    this.baseURL = 'http://localhost:3001/api/car/'
  }

  public async getAllCars(): Promise<Car[]> {
    try {
      const response: AxiosResponse<Car[]> = 
        await axios.get<Car[]>(`${this.baseURL}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all cars:', error);
      throw error;
    }
  }

  public async getCarById(carId: string): Promise<Car | null> {
    try {
      const response: AxiosResponse<Car> = await axios.get<Car>(`${this.baseURL}/${carId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching car by ID:', error);
      throw error;
    }
  }

  public async createCar(carData: Partial<Car>): Promise<Car> {
    try {
      const response: AxiosResponse<Car> = await axios.post<Car>(this.baseURL, carData);
      return response.data;
    } catch (error) {
      console.error('Error creating car:', error);
      throw error;
    }
  }

  public async updateCar(carId: string, updatedCarData: Partial<Car>): Promise<Car> {
    try {
      const response: AxiosResponse<Car> = await axios.patch<Car>(`${this.baseURL}/${carId}`, updatedCarData);
      return response.data;
    } catch (error) {
      console.error('Error updating car:', error);
      throw error;
    }
  }

  public async deleteCar(carId: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/${carId}`);
    } catch (error) {
      console.error('Error deleting car:', error);
      throw error;
    }
  }
}

const CarService = new CarApi()
export default CarService;
