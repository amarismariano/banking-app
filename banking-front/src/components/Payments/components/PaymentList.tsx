import React, { useState } from "react";
import { Payment } from "../hooks/usePayments";
import Modal from "../../Modal/Modal";
import PaymentForm from "./PaymentForm";

interface PaymentListProps {
  payments: Payment[];
  amountToPay: { [key: string]: number };
  handleInputChange: (paymentId: string, value: string) => void;
  handlePay: (paymentId: string) => void;
  handleDeletePayment: (paymentId: string) => void;
  createPayment: (paymentData: {
    cardNumber: string;
    cardHolder: string;
    amount: number;
    paymentType: string;
  }) => Promise<void>;
}

const PaymentList: React.FC<PaymentListProps> = ({
  payments,
  amountToPay,
  handleInputChange,
  handlePay,
  handleDeletePayment,
  createPayment,
}) => {
  const [activePaymentId, setActivePaymentId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const toggleInput = (paymentId: string) => {
    setActivePaymentId(activePaymentId === paymentId ? null : paymentId);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="flex flex-col h-full relative">
      <ul className="grid grid-cols-1 gap-4 relative h-full  overflow-auto">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Create a New Payment
        </button>

        {payments &&
          payments?.map((payment) => (
            <li
              key={payment._id}
              className="bg-white p-4 shadow-md rounded-md border border-gray-200"
            >
              <p>
                <strong>Card Number:</strong> {payment.cardNumber}
              </p>
              <p>
                <strong>Card Owner:</strong> {payment.cardHolder}
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p>
                    <strong>Current Debt:</strong> {payment.amount}{" "}
                    {payment.amount > 0 && (
                      <span
                        onClick={() => toggleInput(payment._id)}
                        className="bg-blue-500 text-white rounded-full px-2 py-2 cursor-pointer ml-2 text-sm"
                        style={{ borderRadius: "4px" }}
                      >
                        Pay
                      </span>
                    )}
                  </p>
                  <p className="mt-4">
                    <strong>Payment Type:</strong> {payment.paymentType}
                  </p>
                </div>
                {payment.amount === 0 && (
                  <p className="bg-green-500 text-white px-2 py-1 rounded-full">
                    Free of debt
                  </p>
                )}
              </div>

              {activePaymentId === payment._id && payment.amount > 0 && (
                <div className="mt-4 flex flex-col w-[500px]">
                  <input
                    type="number"
                    placeholder="Type the amount to pay"
                    value={amountToPay[payment._id] || ""}
                    onChange={(e) =>
                      handleInputChange(payment._id, e.target.value)
                    }
                    className="border border-gray-300 p-2 rounded-md mb-2 w-full"
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={() => handlePay(payment._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Pay
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={() => handleDeletePayment(payment._id)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </li>
          ))}
      </ul>

      <Modal
        isOpen={showModal}
        onClose={closeModal}
      >
        <PaymentForm
          onClose={closeModal}
          createPayment={createPayment}
        />
      </Modal>
    </div>
  );
};

export default PaymentList;
