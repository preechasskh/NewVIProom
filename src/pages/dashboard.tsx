"use client";

import RootLayout from "@/component/layout/Layout";
import Analytics from "@/extra/Analytic";
import Table from "@/extra/Table";
import Title from "@/extra/Title";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Male from "../assets/images/male.png";
import doctor from "../assets/images/doctor.png";
import Skeleton from "react-loading-skeleton";
import AuthCheck from "./AuthCheck";

// จำลองข้อมูล
const sampleDashboardData = {
  users: 150,
  appointments: 32,
  doctors: 10,
  earning: 25000,
  revenue: 15000,
};

const sampleTopDoctors = [
  {
    doctorImage: doctor,
    name: "Dr. John Doe",
    doctorEarning: 5000,
    appointment: 10,
  },
  {
    doctorImage: doctor,
    name: "Dr. Jane Smith",
    doctorEarning: 4000,
    appointment: 8,
  },
];
const topDoctorData = [
    {
      Header: "No",
      Cell: ({ index }: { index: number }) => <span>{index + 1}</span>,
    },
    {
        Header: "Image",
        Cell: ({ row }: { row: any }) => (
          <div className="userProfile">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2785/2785482.png"//{row?.doctorImage} // Make sure this refers to the correct image property
              style={{ height: "70px", width: "70px", overflow: "hidden" }}
              alt="doctor"
            />
          </div>
        ),
    },
    {
      Header: "Name",
      Cell: ({ row }: { row: any }) => <span>{row?.name}</span>,
    },
    {
      Header: "Doctor Earnings",
      Cell: ({ row }: { row: any }) => <span>{row?.doctorEarning}</span>,
    },
    {
      Header: "Appointments",
      Cell: ({ row }: { row: any }) => <span>{row?.appointment}</span>,
    },
  ];
  // Define table column headers and mapping for Upcoming Bookings
const upcomingBookingsData = [
    {
      Header: "User",
      Cell: ({ row }: { row: any }) => (
        <div className="d-flex">
          <img
            src="https://cdn-icons-png.flaticon.com/128/1256/1256650.png"//{row?.user?.image}
            height={50}
            width={50}
            alt="user"
            style={{ borderRadius: "50%" }}
          />
          <span className="ms-3">
            {row?.user?.name}
            <div>{row?.date}</div>
          </span>
        </div>
      ),
    },
    {
      Header: "Doctor",
      Cell: ({ row }: { row: any }) => <span>{row?.doctor?.name}</span>,
    },
    {
      Header: "Time",
      Cell: ({ row }: { row: any }) => <span>{row?.time}</span>,
    },
  ];
const sampleUpcomingBookings = [
  {
    user: { image: Male, name: "Alice Brown" },
    doctor: { name: "Dr. John Doe" },
    date: "2024-10-20",
    time: "10:00 AM",
  },
  {
    user: { image: Male, name: "Bob Smith" },
    doctor: { name: "Dr. Jane Smith" },
    date: "2024-10-21",
    time: "11:30 AM",
  },
];

// Dashboard Component
const Dashboard = () => {
  const [startDate, setStartDate] = useState("ALL");
  const [endDate, setEndDate] = useState("ALL");
  const [loader, setLoader] = useState(false); // จำลองการโหลดข้อมูล
  const router = useRouter();

  useEffect(() => {
    // จำลองการดึงข้อมูล
    setLoader(true);
    setTimeout(() => setLoader(false), 1000); // จำลองการโหลดเป็นเวลา 1 วินาที
  }, []);

  return (
    <AuthCheck>
      <div className="mainDashboard">
        <div className="dashBoardHead">
          <h3 className="m3-bottom text-start">WELCOME ADMIN!</h3>
          <div className="row mb-0">
            <div className="col-3 mb-0 d-flex align-items-center">
              <Title name="DASHBOARD" display="none" bottom="0" />
            </div>
            <div className="col-9 mb-0 d-flex justify-content-end">
              <Analytics
                analyticsStartDate={startDate}
                analyticsStartEnd={endDate}
                analyticsStartDateSet={setStartDate}
                analyticsStartEndSet={setEndDate}
                direction="end"
              />
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="mainDashbox">
          <div className="row">
            {/* TOTAL CUSTOMERS */}
            <DashBox
              title="TOTAL CUSTOMERS"
              amount={sampleDashboardData.users.toFixed() || "0"}
              loader={loader}
              onClick={() => router.push("/User")}
            />
            {/* APPOINTMENTS */}
            <DashBox
              title="APPOINTMENTS"
              amount={sampleDashboardData.appointments.toFixed() || "0"}
              loader={loader}
              onClick={() => router.push("/bookings/booking")}
            />
            {/* TOTAL DOCTORS */}
            <DashBox
              title="TOTAL DOCTORS"
              amount={sampleDashboardData.doctors.toFixed() || "0"}
              loader={loader}
              onClick={() => router.push("/DoctorTable")}
            />
            {/* DOCTOR EARNINGS */}
            <DashBox
              title="DOCTOR EARNINGS"
              amount={sampleDashboardData.earning.toFixed() || "0"}
              loader={loader}
              onClick={() => router.push("/Withdrawal")}
            />
          </div>
        </div>

        {/* Chart Section */}
        <div className="m20-top apexChart tsBox">
          {loader ? (
            <Skeleton height={400} />
          ) : (
            <ApexChart />
          )}
        </div>

        {/* Top Doctors and Upcoming Bookings */}
        <div className="row bg-white">
          <div className="col-lg-6 col-md-12 ">
            <div className="m40-top tsBox p-3 br-2">
              <h5 className="text-center text-theme">TOP DOCTORS</h5>
              <Table data={sampleTopDoctors} mapData={topDoctorData} type="client" className="border-0" />
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="m40-top tsBox p-3 br-2">
              <h5 className="text-center text-theme">TODAY UPCOMING BOOKINGS</h5>
              <Table data={sampleUpcomingBookings} mapData={upcomingBookingsData} type="client" className="border-0" />
            </div>
          </div>
        </div>
      </div>
    </AuthCheck>
  );
};

// Dashboard Layout
Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default Dashboard;

// DashBox Component
const DashBox = ({ title, amount, loader, onClick }: any) => {
  return (
    <div className="dashBox d-flex cursor" onClick={onClick}>
      {loader ? (
        <Skeleton height={100} width={100} />
      ) : (
        <>
          <div className="dashIconBox midBox col-xl-4 col-md-5 col-6">
            <div className="dashIcon midBox"></div>
          </div>
          <div className="boxContent text-center col-xl-8 col-md-7 col-6">
            <div className="boxTitle midBox">
              <p className="text-decoration-underline">{title}</p>
            </div>
            <div className="boxAmount midBox mt-2">
              <p>{amount}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ApexChart Component
const ApexChart = () => {
  const ChartChart = dynamic(() => import("react-apexcharts"), { ssr: false });
  
  // ใช้ข้อมูลจำลองแทนข้อมูลจริง
  const label = ["01 Oct 2024", "02 Oct 2024", "03 Oct 2024"];
  const dataAmount = [5000, 15000, 20000];
  const dataCount = [10, 20, 30];

  const optionsTotal: any = {
    chart: {
      type: "area",
      height: 500,
      background: "#fff",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    xaxis: {
      categories: label,
    },
    title: {
      text: "REVENUE AND APPOINTMENT DATA",
      align: "center",
    },
    colors: ["#259ACD", "#0f7085"],
  };

  const totalSeries = [
    {
      name: "Total Revenue",
      data: dataAmount,
    },
    {
      name: "Total Count",
      data: dataCount,
    },
  ];

  return <ChartChart options={optionsTotal} series={totalSeries} type="area" height={400} />;
};
