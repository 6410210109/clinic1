import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OrderPay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient;

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleNext = () => {
    navigate("/bill");
  };

  return (
    <div>
      <h2>รายการสั่งยา</h2>
      {patient && (
        <div>
          <p>Patient ID: {patient.patient_id}</p>
          <p>First Name: {patient.first_name}</p>
          <p>Last Name: {patient.last_name}</p>
          {/* Add more patient details as needed */}
        </div>
      )}
      <button onClick={handleBack}>ย้อนกลับ</button>
      <button onClick={handleNext}>ต่อไป</button>
    </div>
  );
};

export default OrderPay;
