import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import BasicCard from './BasicCard';
import { fetchCars } from '../../redux/features/cars/carSlice';

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

const MappedCards: React.FC = () => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector((state) => state.cars.cars);
  const carStatus = useAppSelector((state) => state.cars.status);
  const error = useAppSelector((state) => state.cars.error);
  console.log("state", useAppSelector((state) => state))
  console.log("===>", cars)
  useEffect(() => {
    if (carStatus === 'idle') {
      dispatch(fetchCars());
    }
  }, [carStatus, dispatch]);

  // Render UI based on the state
  if (carStatus === 'loading') {
    return <div>Loading...</div>;
  } else if (carStatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {cars.map((car) => (
        <BasicCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default MappedCards;
