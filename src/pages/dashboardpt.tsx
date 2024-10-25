"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import AuthCheck from "./AuthCheck";
import RootLayout from "@/component/layout/Layout";
import Title from "@/extra/Title";

// Dynamic import for the ApexCharts component to avoid SSR issues
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Sample data for wards and their bed categories (to match your chart)
const sampleWardData = [
  { ward: "ชาย 11", beds: 30, categories: { "4a": 2, "3a": 5, "3b": 0, "2a": 26, "2b": 0 } },
  { ward: "ชาย 2 บน", beds: 21, categories: { "4a": 0, "3a": 4, "3b": 4, "2a": 12, "2b": 0 } },
  { ward: "ชาย 2 ล่าง", beds: 27, categories: { "4a": 0, "3a": 12, "3b": 7, "2a": 7, "2b": 0 } },
  { ward: "ชาย 3", beds: 28, categories: { "4a": 1, "3a": 2, "3b": 2, "2a": 20, "2b": 3 } },
  { ward: "ชาย 4", beds: 16, categories: { "4a": 0, "3a": 8, "3b": 7, "2a": 1, "2b": 0 } },
  // Add more wards as needed
];

// Chart options
const chartOptions = {
  chart: {
    type: "bar",
    stacked: true,
    height: 350,
    toolbar: { show: true },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "50%",
    },
  },
  xaxis: {
    categories: sampleWardData.map((ward) => ward.ward), // Ward names as categories
  },
  yaxis: {
    title: { text: "Number of Patients" },
  },
  legend: { position: "bottom" },
  fill: {
    opacity: 1,
  },
  dataLabels: {
    enabled: false,
  },
};

// Dashboard Component with Chart
const DashboardPt = () => {
  const [loader, setLoader] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Simulate loading data and then update the chart
    setLoader(true);
    setTimeout(() => {
      // Generate the series data from the sample data
      const series = [
        { name: "4a", data: sampleWardData.map((ward) => ward.categories["4a"]) },
        { name: "3a", data: sampleWardData.map((ward) => ward.categories["3a"]) },
        { name: "3b", data: sampleWardData.map((ward) => ward.categories["3b"]) },
        { name: "2a", data: sampleWardData.map((ward) => ward.categories["2a"]) },
        { name: "2b", data: sampleWardData.map((ward) => ward.categories["2b"]) },
      ];

      setChartData(series);
      setLoader(false);
    }, 1000); // Simulate 1 second of loading
  }, []);

  return (
    <AuthCheck>
      <div className="mainDashboard">
        <div className="dashBoardHead">
          <h3 className="m3-bottom text-start">ข้อมูลผู้ป่วยใน [Real Time]</h3>
        </div>

        {/* Chart Section */}
        <div className="m20-top tsBox p-3">
          <Title name="สถิติผู้ป่วย Admit จำแนกประเภทแยกตามหอผู้ป่วย" />
          {loader ? (
            <Skeleton height={400} />
          ) : (
            <ApexChart options={chartOptions} series={chartData} type="bar" height={400} />
          )}
        </div>

        {/* Add other dashboard stats or sections here */}
      </div>
    </AuthCheck>
  );
};

// Layout wrapper for Dashboard
DashboardPt.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default DashboardPt;
