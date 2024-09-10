import { useEffect, useState } from "react";
import Payments from "./Payments/Payments";
import axios from "axios";
import { usePayments } from "./Payments/hooks/usePayments";
import DebtChart from "./DebtCharts/DebtChartComponent";

interface User {
  username: string;
  role: string;
}

const Sidebar = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState("payments");
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const {
    payments,
    loading,
    amountToPay,
    showSnackbar,
    snackbarMessage,
    handlePay,
    handleDeletePayment,
    setAmountToPay,
    createPayment,
  } = usePayments();

  const tabs = [
    {
      label: "Payments",
      value: "payments",
      content: (
        <Payments
          createPayment={createPayment}
          handleDeletePayment={handleDeletePayment}
          handlePay={handlePay}
          loading={loading}
          payments={payments}
          setAmountToPay={setAmountToPay}
          amountToPay={amountToPay}
          showSnackbar={showSnackbar}
          snackbarMessage={snackbarMessage}
        />
      ),
    },
    {
      label: "Debt Level",
      value: "debt",
      content: <DebtChart payments={payments} />,
    },
  ];

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <p className="text-lg font-bold">User: {userInfo?.username}</p>
          <div
            onClick={onLogout}
            className="p-2 mt-auto cursor-pointer bg-red-600 text-white"
          >
            Cerrar Sesión
          </div>
        </div>
        <ul className="p-4">
          {tabs.map((tab) => (
            <li
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`p-2 cursor-pointer ${
                activeTab === tab.value ? "bg-gray-700" : ""
              }`}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-4">
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </main>
    </div>
  );
};

export default Sidebar;
