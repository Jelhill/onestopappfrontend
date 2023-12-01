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
    imageFiles: File[];
  }