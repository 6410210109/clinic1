import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const ageData = [
    { ageGroup: "0-10 ปี", male: 50, female: 30 },
    { ageGroup: "11-20 ปี", male: 70, female: 40 },
    { ageGroup: "21-30 ปี", male: 120, female: 80 },
    { ageGroup: "31-40 ปี", male: 90, female: 60 },
    { ageGroup: "41-50 ปี", male: 80, female: 50 },
    { ageGroup: "51 ปีขึ้นไป", male: 60, female: 40 },
  ];

  const diseaseData = [
    { disease: "เบาหวาน", count: 25 },
    { disease: "ความดันโลหิตสูง", count: 30 },
    { disease: "โรคหัวใจ", count: 15 },
  ];

  const allergyData = [
    { allergen: "Penicillin", count: 10 },
    { allergen: "Aspirin", count: 8 },
    { allergen: "Sulfa drugs", count: 5 },
  ];

  const symptomData = [
    { symptom: "ปวดท้อง", count: 20 },
    { symptom: "ปวดศีรษะ", count: 18 },
    { symptom: "มึนงง", count: 15 },
  ];

  const navigate = useNavigate();

  const AgeStackedBarChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={ageData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ageGroup" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="male" stackId="a" fill="#8884d8" />
        <Bar dataKey="female" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );

  const DiseaseStackedBarChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={diseaseData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="disease" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );

  const AllergyStackedBarChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={allergyData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="allergen" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );

  const SymptomStackedBarChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={symptomData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="symptom" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>อายุของผู้ป่วย</h2>
      <AgeStackedBarChart />
      <h2>โรคประจำตัว</h2>
      <DiseaseStackedBarChart />
      <h2>แพ้ยา</h2>
      <AllergyStackedBarChart />
      <h2>อาการ</h2>
      <SymptomStackedBarChart />
    </div>
  );
};

export default Dashboard;
