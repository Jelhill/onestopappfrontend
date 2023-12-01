import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

interface Car {
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

interface Props {
  car: Car;
}

const BasicCard: React.FC<Props> = ({ car }) => {
  return (
    <Card sx={{ maxWidth: 250, margin: 5 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={car?.imageIds[0]}
          alt={`${car.make} ${car.model}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {car.make} {car.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {car.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View Car Info
        </Button>
      </CardActions>
    </Card>
  );
};

export default BasicCard;
