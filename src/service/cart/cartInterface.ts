interface Car {
  make: string;
  model: string;
  imageIds: string[];
  _id: string;
}
  
  export interface CartItem {
    id?: string;
    carId: string;
    priceAtTimeOfAddition: number;
    // make: string;
    // model: string;
    // price: number;
    // imageUrl: string;
    car: Car
  }