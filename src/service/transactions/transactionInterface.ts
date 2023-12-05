export interface TransactionData {
    status: string;
    _id: string;
    sellerId: string;
    carId: string;
    buyerId: string;
    carMake: string;
    carModel: string;
    carYear: Date;
    buyerFirstName: string;
    buyerLastName: string
    transactionDate: string;
    amount: string,
    paymentMethod: string
}
  
  // You can also define a type for the response if your API returns additional data
  export interface TransactionResponse {
    data: TransactionData[];
  }