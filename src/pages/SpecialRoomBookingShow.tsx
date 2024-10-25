import React, { useState, useEffect } from "react";
import RootLayout from "@/component/layout/Layout";
import Button from "@/extra/Button";
import Table from "@/extra/Table";
import Title from "@/extra/Title";
import Pagination from "@/extra/Pagination";
import { openDialog } from "@/store/dialogSlice";
import { RootStore, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import RoomBookingDialogue from "@/component/vip/RoomBookingDialogue";

const SpecialRoomBookingShow = () => {
  const dispatch = useAppDispatch();
  const { rooms } = useSelector((state: RootStore) => state.roomvip);
  const { dialogueType } = useSelector((state: RootStore) => state.dialogue); // To track the open dialog
  const [data, setData] = useState<any[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [bookingDetails, setBookingDetails] = useState({
    hn: "",
    patientName: "",
    isEligible: false,
    plan: "",
    roomType: "",
    contactNumber: "",
  });

  useEffect(() => {
    setData(rooms); // assuming specialRooms is fetched from store
  }, [rooms]);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch form submission action
    console.log("Booking submitted:", bookingDetails);
  };

  const roomTableColumns = [
    {
      Header: "No",
      Cell: ({ index }: { index: any }) => (
        <span>{page * rowsPerPage + index + 1}</span>
      ),
    },
    {
      Header: "HN",
      Cell: ({ row }: { row: any }) => <span>{row.hn}</span>,
    },
    {
      Header: "Patient Name",
      Cell: ({ row }: { row: any }) => <span>{row.patientName}</span>,
    },
    {
      Header: "Status",
      Cell: ({ row }: { row: any }) => <span>{row.status}</span>,
    },
    {
      Header: "Action",
      Cell: ({ row }: { row: any }) => (
        <button className="btn btn-primary">View Details</button>
      ),
    },
  ];

  return (
    <RootLayout>
      <div className="mainCategory">
        <Title name="Special Room Booking" />
        <form onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="col-md-6">
              <label>HN / National ID</label>
              <input
                type="text"
                className="form-control"
                value={bookingDetails.hn}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, hn: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <label>Patient Name</label>
              <input
                type="text"
                className="form-control"
                value={bookingDetails.patientName}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    patientName: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-6">
              <label>Is the patient eligible?</label>
              <select
                className="form-control"
                value={bookingDetails.isEligible ? "yes" : "no"}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    isEligible: e.target.value === "yes",
                  })
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="col-md-6">
              <label>Plan</label>
              <select
                className="form-control"
                value={bookingDetails.plan}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, plan: e.target.value })
                }
              >
                <option>Select Plan</option>
                <option>Plan A</option>
                <option>Plan B</option>
              </select>
            </div>

            <div className="col-md-6">
              <label>Contact Number</label>
              <input
                type="text"
                className="form-control"
                value={bookingDetails.contactNumber}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    contactNumber: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-12">
              <label>Room Selection</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="roomType"
                  value="VIP"
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      roomType: e.target.value,
                    })
                  }
                />
                <label className="form-check-label">VIP</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="roomType"
                  value="Super VIP"
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      roomType: e.target.value,
                    })
                  }
                />
                <label className="form-check-label">Super VIP</label>
              </div>
            </div>

            <div className="col-md-12 mt-3">
              <Button text="Submit Booking" className="btn btn-success" />
              <Button
                text="ฟอร์มจองห้องพิเศษ"
                className="btn btn-success ms-2"
                onClick={() => {
                  dispatch(openDialog({ type: "RoomBookingDialogue" }));
                }}
              />
            </div>
          </div>
        </form>

        {/* Table to display booking list */}
        <div className="mt-5">
          <Table
            type={"client"}
            data={data}
            mapData={roomTableColumns}
            PerPage={rowsPerPage}
            Page={page}
          />
          <Pagination
            type={"client"}
            serverPage={page}
            setServerPage={setPage}
            serverPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            totalData={data?.length}
          />
        </div>

        {/* Conditionally render the RoomBookingDialogue */}
        {dialogueType === "RoomBookingDialogue" && <RoomBookingDialogue />}
      </div>
    </RootLayout>
  );
};

export default SpecialRoomBookingShow;
