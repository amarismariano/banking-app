import { useState, useEffect } from "react";
import {
  deletePaymentAPI,
  fetchPaymentsAPI,
  updatePaymentAPI,
  createPaymentAPI, // New API function
} from "../../../api/apiService";

export interface Payment {
  _id: string;
  cardNumber: string;
  cardHolder: string;
  amount: number;
  paymentType: string;
}

export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [amountToPay, setAmountToPay] = useState<{ [key: string]: number }>({});
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  console.log("payments", payments);

  const fetchPayments = async () => {
    try {
      const response = await fetchPaymentsAPI();

      console.log("response de fetch", response.data);
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleDeletePayment = async (paymentId: string) => {
    try {
      await deletePaymentAPI(paymentId);
      triggerSnackbar("Payment deleted successfully");
      fetchPayments();
    } catch (error) {
      console.error("Error deleting payment", error);
      alert("Error deleting payment");
    }
  };

  const handlePay = async (paymentId: string) => {
    try {
      const paymentToUpdate = payments.find(
        (payment) => payment._id === paymentId,
      );
      if (paymentToUpdate) {
        const amountToPayForPayment = amountToPay[paymentId] || 0;
        if (
          amountToPayForPayment <= 0 ||
          amountToPayForPayment > paymentToUpdate.amount
        ) {
          alert("Please enter a valid amount.");
          return;
        }
        const newAmount = paymentToUpdate.amount - amountToPayForPayment;
        await updatePaymentAPI(paymentId, newAmount);

        if (newAmount === 0) {
          triggerSnackbar("Please enter a valid amount.");
        }
        triggerSnackbar("Payment updated successfully");
        setAmountToPay((prev) => ({ ...prev, [paymentId]: 0 }));
        fetchPayments();
      }
    } catch (error) {
      console.error("Error during payment", error);
      alert("Error during payment");
    }
  };

  const createPayment = async (paymentData: {
    cardNumber: string;
    cardHolder: string;
    amount: number;
    paymentType: string;
  }) => {
    try {
      await createPaymentAPI(paymentData);
      await fetchPayments();
      triggerSnackbar("Payment created successfully");
    } catch (error) {
      console.error("Error creating payment", error);
      alert("Error creating payment");
    }
  };

  const triggerSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000); // Hide after 3 seconds
  };

  return {
    payments,
    loading,
    amountToPay,
    showSnackbar,
    snackbarMessage,
    setAmountToPay,
    handlePay,
    handleDeletePayment,
    createPayment,
    fetchPayments,
  };
};
