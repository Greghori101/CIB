import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SelectOption from "../Dropdowns/SelectOption";
import PatientForm from "../Forms/PatientForm";
import moment from "moment/moment";
import ConsultationForm from "../Forms/ConsultaionForm";

export default function VisitInfo({ element, close }) {
    const url = process.env.REACT_APP_GRDV_API_URL;
    const token = window.localStorage.getItem("token");
    const [step, setStep] = useState("info");
    const [patient, setPatient] = useState(null);

    let navigate = useNavigate();

    const create_patient = async () => {
        setStep("patient");
    };

    useEffect(() => {
        console.log(element);
    }, []);

    return (
        <div
            className="relative flex flex-col max-w-[70%]  break-words w-full bg-slate-100  shadow-lg rounded-2xl border-0 m-auto"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="rounded-t-2xl px-4 py-4 mb-0 align-middle">
                <div className="text-center flex justify-between">
                    <h6 className="text-slate-700 text-xl font-bold uppercase">
                        Visit Information
                    </h6>
                    <button
                        className="text-white bg-red-600 hover:bg-white hover:border hover:border-solid hover:!text-red-600 w-[32px] h-8 rounded-full shadow hover:shadow-lg outline-none  ease-linear transition-all duration-150"
                        type="button"
                        onClick={(event) => {
                            close(event);
                        }}
                    >
                        <i className="fa-solid fa-close"></i>
                    </button>
                </div>
            </div>
            <div className="flex-auto px-4 pb-4">
                {step === "info" ? (
                    <>
                        <div className="flex flex-row justify-between items-center">
                            <h6 className="text-slate-400 text-sm my-2 font-bold uppercase">
                                Visit Details
                            </h6>
                            <div className="flex justify-center">
                                <button
                                    className=" text-white bg-sky-600 active:bg-sky-700 font-bold capitalize text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={(event) => create_patient(event)}
                                >
                                    Consultaion
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap my-2 bg-white shadow-lg rounded px-2 py-4">
                            <div className="w-full">
                                <div className="flex flex-col font-normal text-md">
                                    <div className="flex flex-row justify-around">
                                        <div className="relative w-full mb-3 px-1">
                                            <h6>Start Time:</h6>
                                            <label className="text-slate-500 text-md">
                                                {moment(
                                                    element.starts_at
                                                ).format(
                                                    "MMMM Do YYYY, h:mm a"
                                                )}
                                            </label>
                                        </div>
                                        <div className="relative w-full mb-3 px-1">
                                            <h6>End Time:</h6>
                                            <label className="text-slate-500 text-md">
                                                {moment(element.ends_at).format(
                                                    "MMMM Do YYYY, h:mm a"
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-around">
                                        <div className="relative w-full mb-3 px-1">
                                            <h6>Doctor:</h6>
                                            <label className="text-slate-500 text-md">
                                                {element.doctor.firstname +
                                                    " " +
                                                    element.doctor.lastname}
                                            </label>
                                        </div>
                                        <div className="relative w-full mb-3 px-1">
                                            <h6>Service:</h6>
                                            <label className="text-slate-500 text-md">
                                                {element.doctor.service.name}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : step === "patient" ? (
                    <>
                        <div className="flex flex-row justify-between items-center">
                            <h6 className="text-slate-400 text-sm my-2 font-bold uppercase">
                                Patient iscription
                            </h6>
                            <div className="flex justify-center">
                                <button
                                    className=" text-white bg-sky-600 active:bg-sky-700 font-bold capitalize text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setStep("info")}
                                >
                                    <i className="fa-solid fa-close mr-2"></i>
                                    Cancel
                                </button>
                            </div>
                        </div>
                        <PatientForm
                            next={(patient) => {
                                if (patient) {
                                    setPatient(patient);
                                    setStep("consultation");
                                } else {
                                    Swal.fire({
                                        title: "Please sign in",
                                        text: "You are not signed in",
                                        icon: "error",
                                    });
                                }
                            }}
                        ></PatientForm>
                    </>
                ) : (
                    <>
                        <div className="flex flex-row justify-between items-center">
                            <h6 className="text-slate-400 text-sm my-2 font-bold uppercase">
                                Consultaion Report
                            </h6>
                            <div className="flex justify-center">
                                <button
                                    className=" text-white bg-sky-600 active:bg-sky-700 font-bold capitalize text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setStep("info")}
                                >
                                    <i className="fa-solid fa-close mr-2"></i>
                                    Cancel
                                </button>
                            </div>
                        </div>
                        <ConsultationForm
                            visit={element}
                            patient={patient}
                        ></ConsultationForm>
                    </>
                )}
            </div>
        </div>
    );
}
