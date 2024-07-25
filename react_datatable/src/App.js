import "./App.css";
import Signin from "./Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Queue from "./Queue";
import Queue2 from "./Queue2";
import OrderPay from "./OrderPay";
import Bill from "./Bill";
import HeaderBar from "./layouts/HeaderBar";
import HeaderBar2 from "./layouts/HeaderBar2";
import Dashboard from "./Dashboard";
import Patient from "./Patient";
import DDashboard from "./DDashboard"; // Import your new dashboard components
import NDashboard from "./NDashboard"; // Import your new dashboard components
import Modal from "react-modal";
import { useState, useEffect } from "react";

Modal.setAppElement("#root");

function App() {
  const token = localStorage.getItem("accessToken");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserRole(user.role_id);
    }
  }, []);

  if (!token) {
    return <Signin />;
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        {userRole === 1 ? <HeaderBar /> : <HeaderBar2 />}
        <Routes>
          <Route path="/" element={<DDashboard />} />
          <Route path="queue" element={<Queue2 />} />
          <Route path="orderpay" element={<OrderPay />} />
          <Route path="bill" element={<Bill />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patient" element={<Patient />} />
          <Route path="ddashboard" element={<DDashboard />} />
          <Route path="ndashboard" element={<NDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
