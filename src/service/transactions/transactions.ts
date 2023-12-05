import axios from 'axios';
import { config } from '../../config';
import { TransactionData } from './transactionInterface'; // Replace with your actual path and interface

class TransactionService {
    private readonly BASE_URL: string;

    constructor() {
        this.BASE_URL = `${config.BASE_URL}/api/transaction`
    }

    // Function to fetch all transactions
    async getAllTransactions() {
        const token = localStorage.getItem("token");
        const response = await axios.get(this.BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }

    // Function to fetch a single transaction by ID
    async getTransactionById(transactionId: string) {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${this.BASE_URL}${transactionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }

    async getTransactionBySellerId(sellerId: string) {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${this.BASE_URL}/seller/${sellerId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("response", response)
        return response.data;
    }
    // Function to create a new transaction
    async createTransaction(transactionData: TransactionData) {
        const token = localStorage.getItem("token");
        const response = await axios.post(this.BASE_URL, transactionData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }

    // Function to update a transaction
    async updateTransaction(transactionId: string, transactionData: TransactionData) {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${this.BASE_URL}${transactionId}`, transactionData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }

    // Function to delete a transaction
    async deleteTransaction(transactionId: string) {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${this.BASE_URL}${transactionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
}

const transactionService = new TransactionService();
export default transactionService;
