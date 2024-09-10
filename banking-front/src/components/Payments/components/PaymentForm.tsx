import { useState } from "react";

interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  amount: string;
  paymentType: string;
}

interface PaymentFormProps {
  onClose: () => void;
  createPayment: (paymentData: {
    cardNumber: string;
    cardHolder: string;
    amount: number;
    paymentType: string;
  }) => Promise<void>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  onClose,
  createPayment,
}) => {
  const [paymentData, setPaymentData] = useState<PaymentFormData>({
    cardNumber: "",
    cardHolder: "",
    amount: "",
    paymentType: "credit",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amount = parseFloat(paymentData.amount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    createPayment({
      cardNumber: paymentData.cardNumber,
      cardHolder: paymentData.cardHolder,
      amount,
      paymentType: paymentData.paymentType,
    });

    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="cardNumber"
          className="block text-gray-700"
        >
          Card Number:
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={paymentData.cardNumber}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      <div>
        <label
          htmlFor="cardHolder"
          className="block text-gray-700"
        >
          Card Holder:
        </label>
        <input
          type="text"
          id="cardHolder"
          name="cardHolder"
          value={paymentData.cardHolder}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-gray-700"
        >
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={paymentData.amount}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      <div>
        <label
          htmlFor="paymentType"
          className="block text-gray-700"
        >
          Payment Type:
        </label>
        <select
          id="paymentType"
          name="paymentType"
          value={paymentData.paymentType}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2"
        >
          <option value="credit">Credit Card</option>
          <option value="debit">Debit Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md mt-4"
      >
        Create Payment
      </button>
    </form>
  );
};

export default PaymentForm;
