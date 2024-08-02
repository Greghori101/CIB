import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import SelectOption from "../Dropdowns/SelectOption";

// components

export default function NurseForm({ action, data, getNurses, hide }) {
    const token = window.localStorage.getItem("token");
    const url_gsm = process.env.REACT_APP_GSM_API_URL;
    const url_grdv = process.env.REACT_APP_GRDV_API_URL;
    const method = action === "add" ? "post" : "put";
    const [email, setEmail] = React.useState("");
    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [birth_date, setBirthDate] = React.useState("");
    const [birth_place, setBirthPlace] = React.useState("");
    const [gender, setGender] = React.useState("male");
    const [national_id, setNationalId] = React.useState("male");
    const [phone_number, setPhoneNumber] = React.useState("");
    const [state, setAddressState] = useState("");
    const [daira, setAddressDaira] = useState("");
    const [city, setAddressCity] = useState("");
    const [street, setAddressStreet] = useState("");
    
    const navigate = useNavigate();

    const add_nurse = (event) => {
        event.preventDefault();
        axios({
            // Endpoint to send files
            url: url_gsm + "/nurses",
            method: method,
            data: {
                email,
                firstname,
                phone_number,
                gender,
                lastname,
                birth_date,
                birth_place,
                national_id,
                city,
                daira,
                state,
                street,
                service_id,
            },
            headers: {
                Accept: "Application/json",
                Authorization: "Bearer " + token,
            },
        })
            // Handle the response from backend here
            .then((response) => {
                hide();
                Swal.fire({
                    title: "Go to dashboard",
                    text: "You are successfuly logged in .",
                    icon: "success",

                    iconColor: "#3dc00c",
                });
                getNurses();
            })

            // Catch errors if any
            .catch((error) => {
                if (error.response.status === 401) {
                    Swal.fire({
                        title: "Please sign in",
                        text: "You are not signed in",
                        icon: "error",
                    }).then(() => {
                        window.localStorage.clear();
                        navigate("/login");
                    });
                }
                if (error.response.status === 500) {
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

    const change_service = (event, option) => {
        event.preventDefault();
        console.log(option);
        setServiceId(option.id);
    };
    const get_services = async () => {
        await axios({
            // Endpoint to send files
            url: url_grdv + "/services",
            method: "get",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        })
            // Handle the response from backend here
            .then(async (response) => {
                let data = response.data;
                data = await data.map((option) => {
                    return {
                        ...option,
                        label: ` ${option.name}`,
                        value: option.id,
                    };
                });
                setServices(data);
                setloading(false);
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
const [services, setServices] = useState([]);
    const [service_id, setServiceId] = useState("");
    const [loading, setloading] = useState(true);
    useEffect(() => {
        get_services();
    }, []);
    return (
        <div className="flex-auto px-4 pb-4">
            <form>
                <h6 className="text-slate-400 text-sm my-2 font-bold uppercase">
                    Nurse Information
                </h6>
                <div className="flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="flex flex-row">
                            <div className="relative w-full mb-3 ml-2">
                                <label
                                    className="block capitalize text-slate-600 text-md font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Select Service
                                </label>
                                {!loading ? (
                                    <SelectOption
                                        onChange={change_service}
                                        multiple={false}
                                        data={services}
                                    ></SelectOption>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Firstanme
                            </label>
                            <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="firstname"
                                onChange={(event) => {
                                    setFirstname(event.target.value);
                                }}
                                value={firstname}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Lastname
                            </label>
                            <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="lastname"
                                onChange={(event) => {
                                    setLastname(event.target.value);
                                }}
                                value={lastname}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                national id
                            </label>
                            <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="national id"
                                onChange={(event) => {
                                    setNationalId(event.target.value);
                                }}
                                value={national_id}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Email"
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                                value={email}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Gender
                            </label>
                            <select
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                default="male"
                                onChange={(event) => {
                                    setGender(event.target.value);
                                }}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Phone Number
                            </label>
                            <input
                                type="number"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Phone Number"
                                onChange={(event) => {
                                    setPhoneNumber(event.target.value);
                                }}
                                value={phone_number}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                birth date
                            </label>
                            <input
                                type="date"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="birth date"
                                onChange={(event) => {
                                    setBirthDate(event.target.value);
                                }}
                                value={birth_date}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Birth place
                            </label>
                            <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="birth place"
                                onChange={(event) => {
                                    setBirthPlace(event.target.value);
                                }}
                                value={birth_place}
                            />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="text-slate-500 text-md">
                                    {" "}
                                    State
                                </label>
                                <div className="input-group mb-4">
                                    <input
                                        value={state}
                                        onChange={(event) => {
                                            setAddressState(event.target.value);
                                        }}
                                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="State"
                                        aria-label="State..."
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="text-slate-500 text-md">
                                    {" "}
                                    Daira
                                </label>
                                <div className="input-group mb-4">
                                    <input
                                        value={daira}
                                        onChange={(event) => {
                                            setAddressDaira(event.target.value);
                                        }}
                                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="daira"
                                        aria-label="daira..."
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 ps-2">
                                <label className="text-slate-500 text-md">
                                    {" "}
                                    City
                                </label>
                                <div className="input-group mb-4">
                                    <input
                                        value={city}
                                        onChange={(event) => {
                                            setAddressCity(event.target.value);
                                        }}
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="city"
                                        aria-label="city..."
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 ps-2">
                                <label className="text-slate-500 text-md">
                                    {" "}
                                    Street
                                </label>
                                <div className="input-group mb-4">
                                    <input
                                        value={street}
                                        onChange={(event) => {
                                            setAddressStreet(
                                                event.target.value
                                            );
                                        }}
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Street"
                                        aria-label="Street..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        className=" text-white bg-sky-600 active:bg-sky-700 font-bold capitalize text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={(event) => add_nurse(event)}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
