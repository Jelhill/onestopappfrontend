import axios, { AxiosResponse } from 'axios';
import { CarData } from './carInterfaces';

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
  private readonly BASE_URL: string;

  constructor() {
    this.BASE_URL = 'http://localhost:3001/api/car/'
  }

  public async getAllCars(): Promise<Car[]> {
    try {
      const response: AxiosResponse<Car[]> = 
        await axios.get<Car[]>(`${this.BASE_URL}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all cars:', error);
      throw error;
    }
  }

  async uploadCarData(carData: CarData) {
    const formData = new FormData();
    Object.entries(carData).forEach(([key, value]) => {
        if (Array.isArray(value)) { // Check if it's an array
            // Handle arrays of strings or Files
            value.forEach(item => formData.append(key, item));
          } else if (value instanceof FileList) { // Check if it's a FileList
            // Convert FileList to array and append each file
            Array.from(value).forEach(file => formData.append(key, file));
          } else if (typeof value === 'string' || value instanceof Blob) {
            // Append strings and Blobs directly
            formData.append(key, value);
          } else if (typeof value === 'number') {
            // Convert numbers to strings before appending
            formData.append(key, value.toString());
        }
    });
    
    
    const response = await axios.post(`${this.BASE_URL}/car`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
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

  public async createCar(carData: Partial<Car>): Promise<Car> {
    try {
      const response: AxiosResponse<Car> = await axios.post<Car>(this.BASE_URL, carData);
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
