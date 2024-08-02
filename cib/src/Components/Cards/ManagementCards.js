import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CardLink from "./CardLink.js";
import { useNavigate } from "react-router-dom";
import Patients from "../../Pages/EMR/Patients.js";
import Doctors from "../../Pages/Services/Doctors/Doctors.js";
import Employees from "../../Pages/Management/Employees.js";
import Rooms from "../../Pages/Management/BedManagement/Rooms.js";
import ServicesCard from "./ServicesCard.js";
import Nurses from "../../Pages/Services/Nurses/Nurses.js";
import Medications from "../../Pages/Pharmacy/Medications.js";
import ServicePlanning from "../../Pages/Services/ServicePlanning.js";
import Requests from "../../Pages/Services/Hospitalization/Requests.js";
import VisitPlanning from "../../Pages/Appointments/VisitPlanning.js";

export default function ManagementCards() {
    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    const [title, setTitle] = React.useState("");

    const [patients, setPatients] = useState(0);
    const [doctors, setDoctors] = React.useState(0);
    const [employees, setEmployees] = useState(0);
    const [rooms, setRooms] = React.useState(0);

    const [invoice, setAttendance] = React.useState(0);
    const [services, setServices] = React.useState(0);
    const [medications, setMedications] = React.useState(0);
    const [planning, setPlanning] = React.useState(0);

    const [roomtickets, setRoomTickets] = React.useState(0);
    const [admissionForms, setAdmissionForm] = React.useState(0);
    const [nurse, setPatientDischarge] = React.useState(0);
    const [hospitalizationRequests, setHospitalizationRequests] =
        React.useState(0);

    const token = window.localStorage.getItem("token");
    const url = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
        }
    }, []);
    return (
        <>
            {modalIsOpen ? (
                <div
                    className=" fixed m-0 py-6 flex align-middle justify-center bg-black bg-opacity-40 z-50 top-0 left-0 w-full h-screen overflow-auto "
                    onClick={() => {
                        document.body.style.overflow = "auto";
                        setModalIsOpen(false);
                    }}
                >
                    <div
                        className="m-auto bg-slate-100 lg:w-3/4 w-10/12  py-4 rounded-xl  flex flex-col align-middle "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-row align-middle px-4 justify-between">
                            <h2 className="text-black capitalize text-lg">
                                {title}
                            </h2>
                            <div
                                onClick={() => {
                                    document.body.style.overflow = "auto";
                                    setModalIsOpen(false);
                                }}
                            >
                                <i className="fa-solid fa-close hover:text-red-600 hover:cursor-pointer transition-all"></i>
                            </div>
                        </div>
                        <div className="  w-full  flex flex-col">
                            {title === "patients" ? (
                                <Patients />
                            ) : title === "doctors" ? (
                                <Doctors />
                            ) : title === "employees" ? (
                                <Employees />
                            ) : title === "rooms" ? (
                                <Rooms />
                            ) : title === "invoice" ? (
                                <Patients />
                            ) : title === "services" ? (
                                <ServicesCard />
                            ) : title === "medications" ? (
                                <Medications />
                            ) : title === "planning" ? (
                                <VisitPlanning />
                            ) : title === "rooms ticket" ? (
                                <Patients />
                            ) : title === "admission forms" ? (
                                <Doctors />
                            ) : title === "hospitalization requests" ? (
                                <Requests />
                            ) : title === "staff medical" ? (
                                <Nurses />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            {/* Header */}
            <section className="py-3">
                <div className="container">
                    <div className="row ">
                        <div className="card relative w-full my-2 mb-4 py-5 gap-4 px-2 !bg-sky-600">
                            {/* Card stats */}
                            <div className="flex flex-wrap ">
                                <div className="w-full lg:w-6/12 xl:w-1/4 px-4">
                                    <CardLink
                                        show={() => {
                                            document.body.style.overflow =
                                                "hidden";
                                            setTitle("employees");
                                            setModalIsOpen(true);
                                        }}
                                        statSubtitle="employees"
                                        statTitle={employees}
                                        statIconName="fa-solid fa-user-tie"
                                        statIconColor="bg-blue-500"
                                    />
                                </div>
                                <div className="w-full lg:w-6/12 xl:w-1/4 px-4">
                                    <CardLink
                                        show={() => {
                                            document.body.style.overflow =
                                                "hidden";
                                            setTitle("doctors");
                                            setModalIsOpen(true);
                                        }}
                                        statSubtitle="doctors"
                                        statTitle={doctors}
                                        statIconName="fa-solid fa-user-doctor"
                                        statIconColor="bg-slate-500"
                                    />
                                </div>

                                <div className="w-full lg:w-6/12 xl:w-1/4 px-4">
                                    <CardLink
                                        show={() => {
                                            document.body.style.overflow =
                                                "hidden";
                                            setTitle("patients");
                                            setModalIsOpen(true);
                                        }}
                                        statSubtitle="patients"
                                        statTitle={patients}
                                        statIconName="fa-solid fa-user-injured"
                                        statIconColor="bg-green-500"
                                    />
                                </div>
                                <div className="w-full lg:w-6/12 xl:w-1/4 px-4">
                                    <CardLink
                                        show={() => {
                                            document.body.style.overflow =
                                                "hidden";
                                            setTitle("staff medical");
                                            setModalIsOpen(true);
                                        }}
                                        statSubtitle="staff medical"
                                        statTitle={nurse}
                                        statIconName="fa-solid fa-user-nurse"
                                        statIconColor="bg-orange-500"
                                    />
                                </div>
                            </div>
                            {/* Card stats */}
                            <div className="flex flex-wrap ">
                                <div className="w-full lg:w-6/12 xl:w-1/4 px-4">
                                    <CardLink
                                        show={() => {
                                            document.body.style.overflow =
                                                "hidden";
                                            setTitle("services");
                                            setModalIsOpen(true);
                                        }}
                                        statSubtitle="services"
                                        statTitle={services}
                                        statIconName="fa-solid fa-hospital"
                                        statIconColor="bg-blue-900"
                                    />
                                </div>
                                <div className="w-full lg:w-6/12 xl:w-1/4 px-4">
                                    <CardLink
                                        show={() => {
                                            document.body.style.overflow =
                                                "hidden";
                                            setTitle("medications");
                                            setModalIsOpen(true);
                                        }}
                                        statSubtitle="medications"
                                        statTitle={medications}
                                        statIconName="fa-solid fa-pills"
                                        statIconColor="bg-slate-700"
                                    />
                                </div>
                                <div className="w-full lg:w-6/12 xl:w-1/4 px-4">
                                    <CardLink
                                        show={() => {
                                            document.body.style.overflow =
                                                "hidden";
                                            setTitle("rooms");
                                            setModalIsOpen(true);
                                        }}
                                        statSubtitle="rooms"
                                        statTitle={rooms}
                                        statIconName="fa-solid fa-bed"
                                        statIconColor="bg-green-900"
                                    />
                                </div>{" "}
                                <div className="w-full lg:w-6/12 xl:w-1/4 px-4">
                                    <CardLink
                                        show={() => {
                                            document.body.style.overflow =
                                                "hidden";
                                            setTitle(
                                                "hospitalization requests"
                                            );
                                            setModalIsOpen(true);
                                        }}
                                        statSubtitle="hospitalization requests"
                                        statTitle={hospitalizationRequests}
                                        statIconName="fa-solid fa-bed-pulse"
                                        statIconColor="bg-red-600"
                                    />
                                </div>
                            </div>
                            {/* Card stats */}
                            <div className="flex flex-wrap ">
                                <div className="w-full lg:w-6/12 xl:w-1/4 px-4 ">
                                    <CardLink
                                        show={() => {
                                            document.body.style.overflow =
                                                "hidden";
                                            setTitle("rooms ticket");
                                            setModalIsOpen(true);
                                        }}
                                        statSubtitle="rooms ticket"
                                        statTitle={roomtickets}
                                        statIconName="fa-solid fa-person-booth"
                                        statIconColor="bg-cyan-400"
                                    />
                                </div>
                                <div className="w-full lg:w-6/12 xl:w-1/4 px-4">
                                    <CardLink
                                        show={() => {
                                            document.body.style.overflow =
                                                "hidden";
                                            setTitle("admission forms");
                                            setModalIsOpen(true);
                                        }}
                                        statSubtitle="admission forms"
                                        statTitle={admissionForms}
                                        statIconName="fa-solid fa-file-contract"
                                        statIconColor="bg-slate-500"
                                    />
                                </div>

                                <div className="w-full lg:w-6/12 xl:w-1/4 px-4">
                                    <CardLink
                                        show={() => {
                                            document.body.style.overflow =
                                                "hidden";
                                            setTitle("planning");
                                            setModalIsOpen(true);
                                        }}
                                        statSubtitle="planning"
                                        statTitle={planning}
                                        statIconName="fa-solid fa-calendar"
                                        statIconColor="bg-lime-500"
                                    />
                                </div>
                                <div className="w-full lg:w-6/12 xl:w-1/4 px-4 ">
                                    <CardLink
                                        show={() => {
                                            document.body.style.overflow =
                                                "hidden";
                                            setTitle("invoice");
                                            setModalIsOpen(true);
                                        }}
                                        statSubtitle="invoice"
                                        statTitle={invoice}
                                        statIconName="fa-solid fa-file-invoice-dollar"
                                        statIconColor="bg-yellow-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
