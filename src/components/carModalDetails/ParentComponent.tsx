import React, { useState } from 'react';
import { BasicCard } from '../card';
import { Car } from '../card/Cards';


import CarDetailsModal from './CarDetailsModal'; // Import the modal component

const ParentComponent: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleOpenModal = (car: Car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  return (
    <div>
      {cars.map(car => (
        <BasicCard key={car.id} car={car} onViewCarInfo={() => handleOpenModal(car)} />
      ))}
      <CarDetailsModal open={modalOpen} onClose={() => setModalOpen(false)} car={selectedCar} />
    </div>
  );
};

export default ParentComponent