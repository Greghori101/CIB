import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { ReactComponent as Icon } from "../../assets/img/no-result.svg";
import PatientDischargeForm from "../../Components/Forms/PatientDischargeForm";
import AdminDischargeForm from "../../Components/Forms/AdminDischargeForm";
import Discharge from "../../Components/Forms/Discharge";

export default function Patients() {
    const token = window.localStorage.getItem("token");
    const url = process.env.REACT_APP_GSM_API_URL;
    const role = window.localStorage.getItem("role");

    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [discharge_form, setDischargeForm] = useState(false);
    const [patients, setPatients] = React.useState([]);

    const hide = (event) => {
        event.preventDefault();
        setDischargeForm(false);
    };

    const show_discharge = (patient) => {
        setPatient(patient);
        setDischargeForm(true);
    };
    const getPatients = async () => {
        let options = {
            method: "get",
            url: url + "/patients",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        };
        axios(options)
            .then((response) => {
                setPatients(response.data);
            })
            .catch((error) => {
                if (error.response) {
                } else if (error.response.status == 401) {
                    Swal.fire({
                        title: "Please sign in",
                        text: "You are not signed in",
                        icon: "error",
                    }).then(() => {
                        window.localStorage.clear();
                        navigate("/login");
                    });
                } else if (error.response) {
                } else if (error.response.status === 500) {
                    navigate("/500");
                } else {
                    Swal.fire({
                        title: error.response?.statusText,
                        text: error.response.data.message,
                        icon: "error",
                    });
                }
            });
    };

    useEffect(() => {
        getPatients();
    }, []);

    return (
        <>
            {discharge_form ? (
                <div className="fixed bg-black bg-opacity-25 top-0 left-0 z-50 w-full h-screen flex justify-center align-middle items-center overflow-auto py-4">
                    <div
                        className="relative flex flex-col max-w-[70%] break-words w-full bg-slate-100  shadow-lg rounded-2xl border-0 m-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className=" px-4 pt-4 align-middle">
                            <div className="text-center flex justify-between">
                                <h6 className="text-slate-700 text-xl font-bold uppercase">
                                    Patient Discharge
                                </h6>
                                <button
                                    className="text-white bg-red-600 hover:bg-white hover:border hover:border-solid hover:!text-red-600 w-[32px] h-8 rounded-full shadow hover:shadow-lg outline-none  ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={(event) => {
                                        hide(event);
                                    }}
                                >
                                    <i className="fa-solid fa-close"></i>
                                </button>
                            </div>
                        </div>
                        {role === "doctor" ? (
                            <PatientDischargeForm
                                patient={patient}
                                hide={hide}
                            ></PatientDischargeForm>
                        ) : role === "admin" ? (
                            <Discharge
                                patient={patient}
                                hide={hide}
                            ></Discharge>
                        ) : (
                            " "
                        )}
                    </div>
                </div>
            ) : (
                ""
            )}
            <section className="py-3">
                <div className="container">
                    <div className="row ">
                        <div className="card relative w-full my-2 mb-4 py-2 bg-slate-200">
                            <div className="flex w-full justify-between align-middle items-center mb-4 z-10 ">
                                <h4>Patient Table</h4>
                                <div>
                                    <form className="flex flex-row ">
                                        <div className="border-0  placeholder-slate-300 text-slate-600 bg-white rounded-full text-sm shadow  w-full ease-linear transition-all duration-150 m-2 h-fit py-2 px-4">
                                            <input
                                                className="focus:outline-none"
                                                type="text"
                                            ></input>
                                            <button>
                                                <i className="fa-solid fa-search"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {patients.length === 0 ? (
                                <div className="flex w-full justify-center items-center flex-col mb-2">
                                    <Icon />

                                    <h2 className="mt-4">No Result Found</h2>
                                    <spam className="max-w-lg text-center">
                                        Please try again or more generic word,
                                        If there is no patient.
                                    </spam>
                                </div>
                            ) : (
                                <div
                                    className={
                                        "relative flex flex-col  break-words w-full mb-6 shadow-lg rounded bg-white"
                                    }
                                >
                                    {/* Projects table */}

                                    <table className="items-center w-full bg-transparent border-collapse">
                                        <thead>
                                            <tr>
                                                <th
                                                    className={
                                                        " rounded-tl  px-4 align-middle border-b border-solid py-3 text-xs capitalize border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100"
                                                    }
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    className={
                                                        "px-4 align-middle border-b border-solid py-3 text-xs capitalize border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100"
                                                    }
                                                >
                                                    Email
                                                </th>
                                                <th
                                                    className={
                                                        "px-4 align-middle border-b border-solid py-3 text-xs capitalize border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100"
                                                    }
                                                >
                                                    Phone Number
                                                </th>
                                                <th
                                                    className={
                                                        "px-4 align-middle border-b border-solid py-3 text-xs capitalize border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100"
                                                    }
                                                >
                                                    Gender
                                                </th>
                                                <th
                                                    className={
                                                        "px-4 align-middle border-b border-solid py-3 text-xs capitalize border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100"
                                                    }
                                                >
                                                    NIN
                                                </th>
                                                <th
                                                    className={
                                                        "px-4 align-middle border-b border-solid py-3 text-xs capitalize border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100"
                                                    }
                                                >
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {patients.map((patient, id) => {
                                                return (
                                                    <tr key={id}>
                                                        <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                                            <span
                                                                className={
                                                                    "ml-3 font-bold text-slate-600"
                                                                }
                                                            >
                                                                {
                                                                    patient.user
                                                                        .firstname
                                                                }
                                                            </span>
                                                        </th>
                                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            {patient.user.email}
                                                        </td>
                                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            {
                                                                patient.user
                                                                    .phone_number
                                                            }
                                                        </td>
                                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            {
                                                                patient.user
                                                                    .gender
                                                            }
                                                        </td>
                                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            {
                                                                patient.user
                                                                    .national_id
                                                            }
                                                        </td>
                                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex flex-row items-center justify-around">
                                                            <Link
                                                                to={
                                                                    "/patients/" +
                                                                    patient.id
                                                                }
                                                                className="hover:text-blue-600 transition duration-150 ease-in-out"
                                                            >
                                                                <i class="fa-solid fa-info"></i>
                                                            </Link>
                                                            <Link
                                                                role={"button"}
                                                                onClick={() =>
                                                                    show_discharge(
                                                                        patient
                                                                    )
                                                                }
                                                                className="hover:text-red-600 transition duration-150 ease-in-out"
                                                            >
                                                                <i class="fa-solid fa-right-from-bracket"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
