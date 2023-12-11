import React, { useEffect, useState } from 'react';
import { fetchCars } from '../../redux/features/cars/carSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CarDetailsModal from '../carModalDetails/CarModalDetails';
import BasicCard from './BasicCard';

interface Car {
  _id: string; // Use _id instead of id
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
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (carStatus === 'idle') {
      dispatch(fetchCars());
    }
  }, [carStatus, dispatch]);

  if (carStatus === 'loading') {
    return <div>Loading...</div>;
  } else if (carStatus === 'failed') {
    return <div>Error: {error}</div>;
  }



  const handleViewCarInfo = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };


  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: "100px"}}>
      {cars.map((car) => (
        <BasicCard key={car._id} car={car} onViewCarInfo={() => handleViewCarInfo(car)} />
      ))}
      {selectedCar && (
        <CarDetailsModal 
          open={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          car={selectedCar} 
        />
      )}
    </div>
  );
};

export default MappedCards;
