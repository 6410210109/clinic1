import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Bill = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient;

  const handlePrint = () => {
    
  };

  const handleFinish = () => {
    // Handle next step logic
  };

  return (
    <div>
      <h2>ใบเสร็จ</h2>
      {patient && (
        <div>
          <p>Patient ID: {patient.patient_id}</p>
          <p>First Name: {patient.first_name}</p>
          <p>Last Name: {patient.last_name}</p>
          {/* Add more patient details as needed */}
        </div>
      )}
      <button onClick={handlePrint}>พิมพ์</button>
      <button onClick={handleFinish}>เสร็จสิ้น</button>
    </div>
  );
};

export default Bill;
