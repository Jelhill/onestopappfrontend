import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { thousandSeparator } from '../../utils/thousandSeparator';

interface Car {
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

interface Props {
  car: Car;
  onViewCarInfo: () => void; // Add this line
}


const BasicCard: React.FC<Props> = ({ car, onViewCarInfo }) => {
  return (
    <Card sx={{ maxWidth: 250, margin: 5 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={car?.imageIds[0]} // Make sure this is the correct path to the image
        alt={`${car.make} ${car.model}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {car.make} {car.model}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {car.description}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {thousandSeparator(car.price)}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary" onClick={onViewCarInfo}>
        View Car Info
      </Button>
    </CardActions>
  </Card>
  );
};

export default BasicCard;
