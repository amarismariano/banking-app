import PaymentList from "./components/PaymentList";
import { Payment } from "./hooks/usePayments";

interface PaymentsProps {
  snackbarMessage: string;
  payments: Payment[];
  loading: boolean;
  showSnackbar: boolean;
  amountToPay: {
    [key: string]: number;
  };
  setAmountToPay: React.Dispatch<
    React.SetStateAction<{
      [key: string]: number;
    }>
  >;
  handleDeletePayment: (paymentId: string) => Promise<void>;
  handlePay: (paymentId: string) => Promise<void>;
  createPayment: (paymentData: {
    cardNumber: string;
    cardHolder: string;
    amount: number;
    paymentType: string;
  }) => Promise<void>;
}

const Payments = ({
  handleDeletePayment,
  handlePay,
  setAmountToPay,
  createPayment,
  amountToPay,
  payments,
  loading,
  showSnackbar,
  snackbarMessage,
}: PaymentsProps) => {
  const handleInputChange = (paymentId: string, value: string) => {
    const numericValue = parseFloat(value);
    setAmountToPay((prev) => ({
      ...prev,
      [paymentId]: isNaN(numericValue) ? 0 : numericValue,
    }));
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl mb-4">Payments List</h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : payments.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <p>No payments available.</p>
        </div>
      ) : (
        <div className="flex-1 relative py-4 overflow-hidden">
          <div className="overflow-auto max-h-full pr-4">
            <PaymentList
              createPayment={createPayment}
              payments={payments}
              amountToPay={amountToPay}
              handleInputChange={handleInputChange}
              handlePay={handlePay}
              handleDeletePayment={handleDeletePayment}
            />
          </div>
          {showSnackbar && (
            <div className="bg-green-500 text-white p-2 fixed bottom-0 left-0 right-0 text-center">
              {snackbarMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Payments;
