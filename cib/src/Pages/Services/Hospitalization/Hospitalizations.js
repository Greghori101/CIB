import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import HospitalizationRequestForm from "../../../Components/Forms/HospitalizationRequestForm";
import { ReactComponent as Icon } from "../../../assets/img/no-result.svg";
import InformedConsent from "../../../Components/Forms/InformedConsent";

export default function Hospitalizations() {
    const token = window.localStorage.getItem("token");
    const url = process.env.REACT_APP_GSM_API_URL;
    const role = window.localStorage.getItem("role");
    const [step, setStep] = useState(0);
    const [hospitalization, setHospitalization] = React.useState({});
    const [method, setMethod] = useState("add");
    const navigate = useNavigate();
    const [hospitalizations, setHospitalizations] = React.useState([]);

    const getHospitalizations = async () => {
        let options = {
            method: "get",
            url: url + "/hospitalizations",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        };
        axios(options)
            .then((response) => {
                setHospitalizations(response.data);
            })
            .catch((error) => {
                if (error.response) {
                } else if (error.response.status === 401) {
                    Swal.fire({
                        title: "Please sign in",
                        text: "You are not signed in",
                        icon: "error",
                    }).then(() => {
                        window.localStorage.clear();
                        navigate("/login");
                    });
                }
                if (error.response) {
                } else if (error.response.status === 500) {
                    navigate("/500");
                } else if (error.response) {
                } else if (error.response.status === 403) {
                    Swal.fire({
                        title: "Please verify your email",
                        text: "You are not verified press ok to verify your email",
                        icon: "error",
                    }).then(() => {
                        navigate("/email.verify");
                    });
                } else {
                    Swal.fire({
                        title: error.response?.statusText,
                        text: error.response.data.message,
                        icon: "error",
                    });
                }
            });
    };

    const showForm = () => {
        setStep(1);
    };
    const next = (action, data) => {
        document.body.style.overflow = "hidden";
        setMethod(action);
        setHospitalization(data);
        setStep(2);
    };
    const hide = () => {
        document.body.style.overflow = "auto";
        setStep(0);
    };
    const destroy = (id) => {
        axios({
            // Endpoint to send files
            url: url + "/hospitalizations/" + id,
            method: "delete",
            headers: {
                Accept: "Application/json",
                Authorization: "Bearer " + token,
            },
        })
            // Handle the response from backend here
            .then((response) => {
                Swal.fire({
                    title: "Go to dashboard",
                    text: "You are successfuly logged in .",
                    icon: "success",

                    iconColor: "#3dc00c",
                });
                getHospitalizations();
            })

            // Catch errors if any
            .catch((error) => {
                if (error.response) {
                } else if (error.response.status === 401) {
                    Swal.fire({
                        title: "Please sign in",
                        text: "You are not signed in",
                        icon: "error",
                    }).then(() => {
                        window.localStorage.clear();
                        navigate("/login");
                    });
                }
                if (error.response) {
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
        getHospitalizations();
    }, []);

    return (
        <>
            {step === 2 ? (
                <div className="fixed bg-black bg-opacity-25 top-0 left-0 z-50 w-full h-screen flex justify-center align-middle items-center overflow-auto py-4">
                    <div
                        className="relative flex flex-col max-w-[70%] break-words w-full bg-slate-100  shadow-lg rounded-2xl border-0 m-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className=" px-4 pt-4 align-middle">
                            <div className="text-center flex justify-between">
                                <h6 className="text-slate-700 text-xl font-bold uppercase">
                                    Add Hospitalization
                                </h6>
                                <button
                                    className="text-white bg-red-600 hover:bg-white hover:border hover:border-solid hover:!text-red-600 w-[32px] h-8 rounded-full shadow hover:shadow-lg outline-none  ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => {
                                        hide();
                                    }}
                                >
                                    <i className="fa-solid fa-close"></i>
                                </button>
                            </div>
                        </div>
                        <div className=" px-4 pt-4">
                            <button
                                onClick={() => showForm()}
                                type="button"
                                className="btn bg-gradient-info w-full"
                            >
                                Back
                            </button>
                        </div>
                        <HospitalizationRequestForm
                            action={method}
                            data={hospitalization}
                            hide={hide}
                            getHospitalizations={getHospitalizations}
                        ></HospitalizationRequestForm>
                    </div>
                </div>
            ) : step === 1 ? (
                <div className="fixed bg-black bg-opacity-25 top-0 left-0 z-50 w-full h-screen flex justify-center align-middle items-center overflow-auto py-4">
                    <div
                        className="relative flex flex-col max-w-[70%] break-words w-full bg-slate-100  shadow-lg rounded-2xl border-0 m-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className=" px-4 pt-4 align-middle">
                            <div className="text-center flex justify-between">
                                <h6 className="text-slate-700 text-xl font-bold uppercase">
                                    Create Patient
                                </h6>
                                <button
                                    className="text-white bg-red-600 hover:bg-white hover:border hover:border-solid hover:!text-red-600 w-[32px] h-8 rounded-full shadow hover:shadow-lg outline-none  ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => {
                                        hide();
                                    }}
                                >
                                    <i className="fa-solid fa-close"></i>
                                </button>
                            </div>
                        </div>
                        <div className=" px-4 pt-4">
                            <button
                                onClick={() => next()}
                                type="button"
                                className="btn bg-gradient-info w-full"
                            >
                                Skip
                            </button>
                        </div>
                        <InformedConsent next={next}></InformedConsent>
                    </div>
                </div>
            ) : (
                ""
            )}
            <section className="py-3">
                <div className="container">
                    <div className="row ">
                        <div className="card relative w-full my-2 mb-4 py-2 bg-slate-200 ">
                            <div className="flex w-full justify-between align-middle items-center mb-4 z-10 ">
                                <h4>Hospitalization Table</h4>
                                <div>
                                    <step className="flex flex-row ">
                                        <div className="border-0  placeholder-slate-300 text-slate-600 bg-white rounded-full text-sm shadow  w-full ease-linear transition-all duration-150 m-2 h-fit py-2 px-4">
                                            <input
                                                className="focus:outline-none"
                                                type="text"
                                            ></input>
                                            <button>
                                                <i className="fa-solid fa-search"></i>
                                            </button>
                                        </div>
                                    </step>
                                </div>
                            </div>

                            {hospitalizations.length === 0 ? (
                                <div className="flex w-full justify-center items-center flex-col mb-2">
                                    <Icon />

                                    <h2 className="mt-4">No Result Found</h2>
                                    <spam className="max-w-lg text-center">
                                        Please try again or more generic word,
                                        If there is no data yet inserted please
                                        click the link to{" "}
                                        <Link
                                            className=""
                                            onClick={() => {
                                                showForm();
                                            }}
                                        >
                                            add hospitalization
                                        </Link>{" "}
                                    </spam>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        className="bg-white shadow-lg px-4 py-2 my-2 rounded hover:cursor-pointer hover:scale-105 hover:bg-slate-100 transition-all duration-200  mx-4 "
                                        onClick={() => {
                                            showForm();
                                        }}
                                    >
                                        <i className="fa-solid fa-plus text-xl mr-2"></i>
                                        Hospitalization hospitalization
                                    </Link>
                                    <div
                                        className={
                                            "relative flex flex-col  break-words  mb-6 shadow-lg rounded bg-white mx-4 my-2"
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
                                                        date
                                                    </th>
                                                    <th
                                                        className={
                                                            "px-4 align-middle border-b border-solid py-3 text-xs capitalize border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100"
                                                        }
                                                    >
                                                        doctor
                                                    </th>
                                                    <th
                                                        className={
                                                            "px-4 align-middle border-b border-solid py-3 text-xs capitalize border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100"
                                                        }
                                                    >
                                                        patient
                                                    </th>
                                                    <th
                                                        className={
                                                            "px-4 align-middle border-b border-solid py-3 text-xs capitalize border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100"
                                                        }
                                                    >
                                                        service
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {hospitalizations.map(
                                                    (hospitalization, id) => {
                                                        return (
                                                            <tr key={id}>
                                                                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                                                    <span
                                                                        className={
                                                                            "ml-3 font-bold text-slate-600"
                                                                        }
                                                                    >
                                                                        {hospitalization.date +
                                                                            " " +
                                                                            hospitalization.time}
                                                                    </span>
                                                                </th>
                                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    {
                                                                        hospitalization
                                                                            .doctor
                                                                            .name
                                                                    }
                                                                </td>
                                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    {
                                                                        hospitalization
                                                                            .patient
                                                                            .name
                                                                    }
                                                                </td>
                                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    {
                                                                        hospitalization
                                                                            .service
                                                                            .name
                                                                    }
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
