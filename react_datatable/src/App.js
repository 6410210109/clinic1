import "./App.css";
import Signin from "./Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Queue from "./Queue";
import OrderPay from "./OrderPay";
import Bill from "./ฺBill";
import HeaderBar from "./layouts/HeaderBar";
import Dashboard from "./Dashboard";
import Patient from "./Patient";

function App() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Signin />;
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <HeaderBar />
        <Routes>
          <Route path="/" element={<Queue />} />
          <Route path="queue" element={<Queue />} />
          <Route path="orderpay" element={<OrderPay />} />
          <Route path="bill" element={<Bill />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patient" element={<Patient />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
