import axios from "axios";

const API_URL = "http://localhost:5001/api";

// Obtener token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchPaymentsAPI = async () => {
  return await axios.get(`${API_URL}/payments`, getAuthHeader());
};

export const deletePaymentAPI = async (paymentId: string) => {
  return await axios.delete(
    `${API_URL}/payments/${paymentId}`,
    getAuthHeader(),
  );
};

export const updatePaymentAPI = async (paymentId: string, amount: number) => {
  return await axios.put(
    `${API_URL}/payments/${paymentId}`,
    { amount },
    getAuthHeader(),
  );
};

export const createPaymentAPI = async (paymentData: {
  cardNumber: string;
  cardHolder: string;
  amount: number;
  paymentType: string;
}) => {
  return await axios.post(`${API_URL}/payments`, paymentData, getAuthHeader());
};
