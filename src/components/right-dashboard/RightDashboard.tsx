import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Paper,
  Button,
} from '@mui/material';
import AppWidgetSummary from '../../pages/DashBoard/app-widget-summary';
import { useAppDispatch } from '../../redux/hooks';
import { fetchTransactionsBySeller } from '../../redux/features/transaction/transactionSlice';
import { fetchCarsBySeller } from '../../redux/features/cars/carSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useParams } from 'react-router-dom';
import img1 from "../../assets/icons/glass/ic_glass_message.png"
import img2 from "../../assets/icons/glass/ic_glass_buy.png"
import img3 from "../../assets/icons/glass/ic_glass_users.png"
import img4 from "../../assets/icons/glass/ic_glass_bag.png"
import { fetchUserData } from '../../redux/features/user/userSlice';
import { format } from 'date-fns';

const RightDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sellerId } = useParams();
  const cars = useSelector((state: RootState) => state.cars.cars);
  const user = useSelector((state: RootState) => state.user.user);
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  

  useEffect(() => {
    const token = localStorage.getItem("token")
    if( sellerId) {
      dispatch(fetchCarsBySeller(sellerId));
      dispatch(fetchTransactionsBySeller(sellerId));
    }
    if(token) {
      dispatch(fetchUserData(token));
    }
  }, [dispatch, sellerId]);
  
  const handleViewDetails = (transactionId: string) => {
    console.log("handleViewDetails", transactionId)
  }
  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1 }} style={{ marginTop: '100px' }}>
    <Typography variant="h4" sx={{ mb: 5 }}>
      Welcome {`${user?.firstName} ${user?.lastName}`} 👋
    </Typography>

    <Grid container spacing={3}>
     <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Total Cars Uploaded"
          total={cars.length}
          color="success"
          sx={{}}
          icon={<img alt="icon" src={img4} />}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Total Sold"
          total={(cars.filter((cars) => cars.sold === true)).length}
          color="info"
          sx={{}}
          icon={<img alt="icon" src={img3} />}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Pending Transaction"
          total={(transactions.filter((transaction) => transaction.status === "pending")).length}
          color="warning"
          sx={{}}
          icon={<img alt="icon" src={img2} />}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Total Transaction"
          total={transactions.length}
          color="error"
          sx={{}}
          icon={<img alt="icon" src={img1} />}
        />
      </Grid>

      <Grid item xs={12} sm={16} md={12}>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="transaction table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Transaction ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Car Info</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Buyer</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Payment Method</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{transaction._id}</TableCell>
                  <TableCell>{`${transaction?.carMake} ${transaction.carModel} ${transaction.carYear}`}</TableCell>
                  <TableCell>{`${transaction?.buyerFirstName} ${transaction.buyerLastName}`}</TableCell>
                  <TableCell>${transaction?.amount?.toLocaleString()}</TableCell>
                  <TableCell>{format(new Date(transaction?.transactionDate), 'yyyy-MM-dd')}</TableCell>
                  <TableCell>{format(new Date(transaction?.transactionDate), 'HH:mm')}</TableCell>
                  <TableCell>{transaction?.paymentMethod}</TableCell>
                  <TableCell>{transaction?.status}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleViewDetails(transaction._id)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid> 
    </Grid>
  </Container>     
  );
};

export default RightDashboard;
