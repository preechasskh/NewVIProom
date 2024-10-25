import React, { useState } from "react";
import RootLayout from "@/component/layout/Layout";
import Title from "@/extra/Title";

const SpecialRoomBookingForm = () => {
  const [inpatient, setInpatient] = useState<string>("no");
  const [department, setDepartment] = useState<string>("");
  const [roomType, setRoomType] = useState<string>("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Handle form submission logic here
    alert("Form submitted");
  };

  return (
    <div className="container">
      <Title name="บันทึกการจองห้อง" />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>วันที่:</label>
          <input type="date" className="form-control" />
        </div>

        <div className="form-group">
          <label>เลขบัตรประชาชน (HN):</label>
          <input type="text" className="form-control" placeholder="รหัสHN" />
        </div>

        <div className="form-group">
          <label>เลขบัตรประชาชนของแพทย์เจ้าของไข้:</label>
          <input type="text" className="form-control" placeholder="เลขบัตรแพทย์" />
        </div>

        <div className="form-group">
          <label>ชื่อผู้ป่วยใน:</label>
          <div>
            <input
              type="radio"
              name="inpatient"
              value="yes"
              checked={inpatient === "yes"}
              onChange={() => setInpatient("yes")}
            />
            <label>ใช่</label>
            <input
              type="radio"
              name="inpatient"
              value="no"
              checked={inpatient === "no"}
              onChange={() => setInpatient("no")}
            />
            <label>ไม่ใช่</label>
          </div>
          {inpatient === "yes" && (
            <div className="form-group">
              <label>กรุณาเลือกหมวดผู้ป่วยใน:</label>
              <select className="form-control">
                <option value="">เลือกหมวดผู้ป่วย</option>
                <option value="ป่วยหนัก">ป่วยหนัก</option>
                <option value="ป่วยปานกลาง">ป่วยปานกลาง</option>
              </select>
            </div>
          )}
        </div>

        <div className="form-group">
          <label>ใช้สิทธิ์เบิกจาก:</label>
          <select className="form-control">
            <option value="">กรุณาเลือกสิทธิ์</option>
            <option value="สิทธิประกันสุขภาพ">สิทธิประกันสุขภาพ</option>
            <option value="สิทธิราชการ">สิทธิราชการ</option>
          </select>
        </div>

        <div className="form-group">
          <label>แผนกตรวจ:</label>
          <select
            className="form-control"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">กรุณาเลือกแผนก</option>
            <option value="อายุรกรรม">อายุรกรรม</option>
            <option value="ศัลยกรรม">ศัลยกรรม</option>
          </select>
        </div>

        <div className="form-group">
          <label>จุดประสงค์จองห้องพิเศษ:</label>
          <select className="form-control">
            <option value="">กรุณาเลือกจุดประสงค์</option>
            <option value="พักฟื้น">พักฟื้น</option>
            <option value="ตรวจสุขภาพ">ตรวจสุขภาพ</option>
          </select>
        </div>

        <div className="form-group">
          <label>เลือกห้องพิเศษ:</label>
          <div>
            <input
              type="radio"
              name="roomType"
              value="Super VIP"
              checked={roomType === "Super VIP"}
              onChange={() => setRoomType("Super VIP")}
            />
            <label>Super VIP ราคา 3,300 บาท</label>
          </div>

          <div>
            <input
              type="radio"
              name="roomType"
              value="VIP(A)"
              checked={roomType === "VIP(A)"}
              onChange={() => setRoomType("VIP(A)")}
            />
            <label>VIP(A) ราคา 2,800 บาท</label>
          </div>

          <div>
            <input
              type="radio"
              name="roomType"
              value="VIP(B)"
              checked={roomType === "VIP(B)"}
              onChange={() => setRoomType("VIP(B)")}
            />
            <label>VIP(B) ราคา 2,300 บาท</label>
          </div>
        </div>

        <div className="form-group">
          <label>ระบุชื่อผู้จอง:</label>
          <input type="text" className="form-control" placeholder="ชื่อผู้จอง" />
        </div>

        <div className="form-group">
          <label>เบอร์โทรติดต่อ:</label>
          <input type="text" className="form-control" placeholder="ระบุเบอร์โทรติดต่อ" />
        </div>

        <button type="submit" className="btn btn-success">
          บันทึก
        </button>
        <button type="button" className="btn btn-danger">
          ยกเลิก
        </button>
      </form>
    </div>
  );
};

SpecialRoomBookingForm.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default SpecialRoomBookingForm;
