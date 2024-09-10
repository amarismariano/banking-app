import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Payment } from "../Payments/hooks/usePayments";

interface DebtChartProps {
  payments: Payment[];
}

const DebtChart: React.FC<DebtChartProps> = ({ payments }) => {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const chartData = payments.map((payment) => ({
    cardHolder: payment.cardHolder,
    amount: payment.amount,
    paymentId: payment._id,
  }));

  const handleBarClick = (data: {
    cardHolder: string;
    amount: number;
    paymentId: string;
  }) => {
    const payment = payments.find((p) => p._id === data.paymentId);
    if (payment) {
      setSelectedPayment(payment);
    }
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-xl font-bold mb-4">Debt Level by Card Holder</h2>
      <ResponsiveContainer
        width="100%"
        height={400}
      >
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cardHolder" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="amount"
            fill="#8884d8"
            onClick={(_, index) => handleBarClick(chartData[index])}
          />
        </BarChart>
      </ResponsiveContainer>

      {selectedPayment && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-bold mb-4">
            Details for {selectedPayment.cardHolder}
          </h3>
          <p>
            <strong>Card Number:</strong> {selectedPayment.cardNumber}
          </p>
          <p>
            <strong>Amount:</strong> $ {selectedPayment.amount}
          </p>
          <p>
            <strong>Payment Type:</strong> {selectedPayment.paymentType}
          </p>
        </div>
      )}
    </div>
  );
};

export default DebtChart;
