import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SelectOption from "../Dropdowns/SelectOption";

export default function AppointmentInfo({ element, close }) {
    const url = process.env.REACT_APP_GRDV_API_URL;
    const token = window.localStorage.getItem("token");
    const [prescription_url, setPrescriptionUrl] = useState("");
    const [step, setStep] = useState("info");
    const [starts_at, setStartsAt] = useState(null);
    const [ends_at, setEndsAt] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [doctor_id, setDoctorId] = useState("");
    const [title, setTitle] = useState("");

    let navigate = useNavigate();
const change_doctor = (event, option) => {
        event.preventDefault();
        setDoctorId(option.id);
    };
    const get_doctors = async () => {
        await axios({
            // Endpoint to send files
            url: url + "/doctors",
            method: "get",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        })
            // Handle the response from backend here
            .then((response) => {
                let data = response.data;
                data = data.map((option) => {
                    return {
                        ...option,
                        label: `Dr. ${option.firstname} ${option.lastname} ${option.service.name} ${option.specialization}`,
                        value: option.id,
                    };
                });
                setDoctors(data);
            })

            // Catch errors if any
            .catch((error) => {
                if (error.response?.status === 401) {
                    Swal.fire({
                        title: "Please sign in",
                        text: "You are not signed in",
                        icon: "error",
                    }).then(() => {
                        window.localStorage.clear();
                        navigate("/login");
                    });
                } else if (error.response?.status === 500) {
                    navigate("/500");
                } else {
                    if (error.response) {
                        Swal.fire({
                            title: error.response?.statusText,
                            text: error.response?.data.message,
                            icon: "error",
                        });
                    } else {
                        Swal.fire({
                            title: "Request failed",
                            text: "network error failed to load response",
                            icon: "error",
                        });
                    }
                }
            });
    };
    const validate = async () => {
        await get_doctors();
        setStep("validate");
    };
    const submit = async (event) => {
        event.preventDefault();
        await axios({
            // Endpoint to send files
            url: url + "/visits",
            method: "post",
            data: {
                starts_at,
                ends_at,
                doctor_id,
                title,
                email: element.email,
            },
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        })
            // Handle the response from backend here
            .then((response) => {
                document.body.style.overflow = "auto";

                Swal.fire({
                    icon: "success",
                    title: "Appointment request schedule",
                    text: "thank you for chosing us we'll contact you as soon as possible ",
                    iconColor: "#3dc00c",
                });
            })

            // Catch errors if any
            .catch((error) => {
                if (error.response?.status === 401) {
                    document.body.style.overflow = "auto";

                    Swal.fire({
                        title: "Please sign in",
                        text: "You are not signed in",
                        icon: "error",
                    }).then(() => {
                        window.localStorage.clear();
                        navigate("/login");
                    });
                } else if (error.response?.status === 500) {
                    navigate("/500");
                } else {
                    if (error.response) {
                        Swal.fire({
                            title: error.response?.statusText,
                            text: error.response?.data.message,
                            icon: "error",
                        });
                    } else {
                        Swal.fire({
                            title: "Request failed",
                            text: "network error failed to load response",
                            icon: "error",
                        });
                    }
                }
            });
    };

    
    useEffect(() => {
        var url = `data:image/${element.prescription.extension};base64,${element.prescription.content}`;

        fetch(url).then(async (res) => {
            const blob = await res.blob();
            setPrescriptionUrl(URL.createObjectURL(blob));
        });
    }, []);

    return (
        <div
            className="relative flex flex-col max-w-[70%]  break-words w-full bg-slate-100  shadow-lg rounded-2xl border-0 m-auto"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="rounded-t-2xl px-4 py-4 mb-0 align-middle">
                <div className="text-center flex justify-between">
                    <h6 className="text-slate-700 text-xl font-bold uppercase">
                        Appointment Information
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
                                Appointment Details
                            </h6>
                            <div className="flex justify-center">
                                <button
                                    className=" text-white bg-sky-600 active:bg-sky-700 font-bold capitalize text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={(event) => validate(event)}
                                >
                                    Validate
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap my-2 bg-white shadow-lg rounded px-2 py-4">
                            <div className="w-full">
                                <div className="flex flex-col font-normal text-md">
                                    <div className="flex flex-row justify-around">
                                        <div className="relative w-full mb-3 px-1">
                                            <h6>Patient:</h6>
                                            <label className="text-slate-500 text-md">
                                                {element.firstname +
                                                    " " +
                                                    element.lastname}
                                            </label>
                                        </div>
                                        <div className="relative w-full mb-3 px-1">
                                            <h6>Phone Number:</h6>
                                            <label className="text-slate-500 text-md">
                                                {element.phone_number}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-around">
                                        <div className="relative w-full mb-3 px-1">
                                            <h6>Email:</h6>
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                {element.email}
                                            </label>
                                        </div>
                                        <div className="relative w-full mb-3 px-1">
                                            <h6>Message:</h6>
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                {element.message}
                                            </label>
                                        </div>
                                    </div>{" "}
                                    <div className="relative w-full mb-3 px-1">
                                        <Link
                                            to={prescription_url}
                                            target="_blank"
                                            download={element.prescription.name}
                                        >
                                            <i className="fa-solid fa-download text-blue-500 mr-2"></i>
                                            Download Prescription
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <form>
                            <div className="flex flex-row justify-between items-center">
                                <h6 className="text-slate-400 text-sm my-2 font-bold uppercase">
                                    Appointment Details
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
                            <div className="flex flex-wrap">
                                <div className="w-full px-4">
                                    <div className="flex flex-row">
                                        <div className="relative w-full mb-3 ml-2">
                                            <label
                                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Name"
                                                onChange={(event) => {
                                                    setTitle(
                                                        event.target.value
                                                    );
                                                }}
                                                value={title}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="relative w-full mb-3 ml-2">
                                            <label
                                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Doctor
                                            </label>
                                            <SelectOption
                                                onChange={change_doctor}
                                                multiple={false}
                                                data={doctors}
                                            ></SelectOption>
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="relative w-full mb-3 ml-2">
                                            <label
                                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                End Time
                                            </label>
                                            <input
                                                type="datetime-local"
                                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Name"
                                                onChange={(event) => {
                                                    setEndsAt(
                                                        event.target.value
                                                    );
                                                }}
                                                value={ends_at}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="relative w-full mb-3 ml-2">
                                            <label
                                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Start Time
                                            </label>
                                            <input
                                                type="datetime-local"
                                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Name"
                                                onChange={(event) => {
                                                    setStartsAt(
                                                        event.target.value
                                                    );
                                                }}
                                                value={starts_at}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className=" text-white bg-sky-600 active:bg-sky-700 font-bold capitalize text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={(event) => submit(event)}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </>
                )}{" "}
            </div>
        </div>
    );
}
