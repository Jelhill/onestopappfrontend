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

  export interface CarData {
    [key: string]: string | number | undefined | string[] | File[] | Blob;
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
    image: File[];
  }

  export interface CarApiData {
    success: boolean,
    data: Car[]
    message: string
  }