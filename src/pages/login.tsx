"use client";
import React, { useState } from "react";
import Input, { ExInput } from "../extra/Input";
import Logo from "../assets/images/logo.png";
import Image from "next/image";
import Button from "../extra/Button";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handledashboardRedirect = () => {
    // ตรวจสอบข้อมูลการเข้าสู่ระบบ
    if (email === "admin@demo.com" && password === "1234") {
      sessionStorage.setItem("isAuth", "true"); // เก็บสถานะการเข้าสู่ระบบ
      router.push("/dashboard"); // เปลี่ยนเส้นทางไปยังหน้า Dashboard
    } else {
      setError({
        email: "Invalid email or password!",
        password: "Invalid email or password!",
      });
    }
  };

  const handleSubmit = () => {
    if (!email || !password) {
      let errorObj: any = {};
      if (!email) errorObj = { ...errorObj, email: "Email Is Required!" };
      if (!password)
        errorObj = { ...errorObj, password: "Password is required!" };
      return setError(errorObj);
    }
    handledashboardRedirect(); // เรียกใช้ฟังก์ชันเมื่อข้อมูลครบถ้วน
  };

  return (
    <div className="mainLoginPage">
      <div className="loginDiv" style={{ width: "100%" }}>
        <div className="loginPage m-auto">
          <div className="loginTitle mb-3 d-flex" style={{ width: "60px" }}>
            <Image src={Logo} width={60} height={60} alt="logo" />
          </div>
          <div className="fw-bold text-theme me-auto my-auto welComeTitle">
            Welcome Back
          </div>
          <h1>Login</h1>
          <h6 className="fw-bold text-theme me-auto my-auto fs-15 py-2 title">
            Please Enter Your Email id and Password
          </h6>
          <div>
            <div className="col-12">
              <ExInput
                type={`text`}
                id={`email`}
                name={`email`}
                label={`Email`}
                value={email}
                placeholder={`Email`}
                errorMessage={error.email && error.email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                  setError({
                    ...error,
                    email: "",
                  });
                }}
              />
            </div>
            <div className="col-12">
              <ExInput
                type={`password`}
                id={`password`}
                name={`password`}
                value={password}
                label={`Password`}
                placeholder={`Password`}
                errorMessage={error.password && error.password}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                  setError({
                    ...error,
                    password: "",
                  });
                }}
              />
            </div>
            <div className="loginButton d-flex gx-2 justify-content-center">
              <Button
                type={`submit`}
                className={`bg-theme text-light cursor m10-top col-6 mx-2`}
                text={`Login`}
                onClick={handleSubmit}
                style={{ borderRadius: "30px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
