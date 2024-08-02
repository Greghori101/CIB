import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import SelectOption from "../Dropdowns/SelectOption";

// components

export default function DoctorForm({ action, data, getDoctors, hide }) {
    const token = window.localStorage.getItem("token");
    const url_gsm = process.env.REACT_APP_GSM_API_URL;
    const url_grdv = process.env.REACT_APP_GRDV_API_URL;
    const method = action === "add" ? "post" : "put";
    const role = window.localStorage.getItem("role");
    const [national_id, setNationalId] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [birth_date, setBirthDate] = useState("");
    const [birth_place, setBirthPlace] = useState("");
    const [state, setAddressState] = useState("");
    const [daira, setAddressDaira] = useState("");
    const [city, setAddressCity] = useState("");
    const [street, setAddressStreet] = useState("");
    const [services, setServices] = useState([]);
    const [service_id, setServiceId] = useState("");
    const [chief, setChief] = useState(false);
    const [loading, setloading] = useState(true);
    const navigate = useNavigate();

    const add_doctor = (event) => {
        event.preventDefault();

        axios({
            // Endpoint to send files
            url: url_gsm + "/doctors",
            method: method,
            data: {
                national_id,
                specialization,
                firstname,
                lastname,
                city,
                daira,
                state,
                street,
                phone_number,
                gender,
                birth_date,
                birth_place,
                service_id,
                chief,
                email,
                service_id,
            },
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
            .then(async(response) => {
                let data = response.data;
                data = await data.map( (option) => {
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

    useEffect(() => {
        get_services();
    }, []);
    return (
        <div className="relative flex px-4 py-4 justify-center">
            <form className="w-full">
                <div className="w-full my-4">
                    <div className="card w-full">
                        <div className="card-body pt-3">
                            <div className="flex flex-row">
                                <div className="relative w-full mb-3 ">
                                    <h5
                                       
                                    >
                                        Select Service
                                    </h5>
                                    {!loading ?<SelectOption
                                        onChange={change_service}
                                        multiple={false}
                                        data={services}
                                    ></SelectOption> :""}
                                    
                                </div>
                            </div>
                            <h5>Personal Inforamtion</h5>
                            <div className=" border border-slate-600 rounded-2xl px-4 my-2 py-2">
                                <div className="mb-4 ">
                                    <label className="text-slate-500 text-md">
                                        National Card Id
                                    </label>
                                    <div className="input-group">
                                        <input
                                            value={national_id}
                                            onChange={(event) => {
                                                setNationalId(
                                                    event.target.value
                                                );
                                            }}
                                            type="number"
                                            className="form-control"
                                            placeholder="National Card Id"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 ">
                                    <label className="text-slate-500 text-md">
                                        Specialization
                                    </label>
                                    <div className="input-group">
                                        <input
                                            value={specialization}
                                            onChange={(event) => {
                                                setSpecialization(
                                                    event.target.value
                                                );
                                            }}
                                            type="text"
                                            className="form-control"
                                            placeholder="specialization"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 ">
                                    <label className="text-slate-500 text-md">
                                        Email
                                    </label>
                                    <div className="input-group">
                                        <input
                                            value={email}
                                            onChange={(event) => {
                                                setEmail(
                                                    event.target.value
                                                );
                                            }}
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label className="text-slate-500 text-md">
                                            {" "}
                                            First Name
                                        </label>
                                        <div className="input-group mb-4">
                                            <input
                                                value={firstname}
                                                onChange={(event) => {
                                                    setFirstname(
                                                        event.target.value
                                                    );
                                                }}
                                                className="form-control"
                                                placeholder="Firstname"
                                                aria-label="First Name..."
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div className="col ps-2">
                                        <label className="text-slate-500 text-md">
                                            {" "}
                                            Last Name
                                        </label>
                                        <div className="input-group mb-4">
                                            <input
                                                value={lastname}
                                                onChange={(event) => {
                                                    setLastname(
                                                        event.target.value
                                                    );
                                                }}
                                                type="text"
                                                className="form-control"
                                                placeholder="Lastname"
                                                aria-label="Last Name..."
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="text-slate-500 text-md">
                                        {" "}
                                        Phone Number
                                    </label>
                                    <div className="input-group mb-4">
                                        <input
                                            value={phone_number}
                                            onChange={(event) => {
                                                setPhoneNumber(
                                                    event.target.value
                                                );
                                            }}
                                            type="number"
                                            className="form-control"
                                            placeholder="Phone Number"
                                            aria-label="Phone Number..."
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                    <label className="text-slate-500 text-md">
                                                {" "}
                                                Gender
                                            </label>
                                            <div className="input-group mb-4">
                                                <select
                                                    value={gender}
                                                    onChange={(event) => {
                                                        setGender(
                                                            event.target.value
                                                        );
                                                    }}
                                                    className="form-control"
                                                    aria-label="Gender"
                                                >
                                                    <option value="Male">
                                                        Male
                                                    </option>
                                                    <option value="Female">
                                                        Female
                                                    </option>
                                                </select>
                                            </div>
                                    </div>
                                    <div className="col ps-2">
                                        <label className="text-slate-500 text-md">
                                            {" "}
                                            date of birth
                                        </label>
                                        <div className="input-group mb-4">
                                            <input
                                                value={birth_date}
                                                onChange={(event) => {
                                                    setBirthDate(
                                                        event.target.value
                                                    );
                                                }}
                                                type="date"
                                                className="form-control"
                                                placeholder="date of birth"
                                                aria-label="date of birth..."
                                            />
                                        </div>
                                    </div>
                                    <div className="col ps-2">
                                        <label className="text-slate-500 text-md">
                                            {" "}
                                            Birth place
                                        </label>
                                        <div className="input-group mb-4">
                                            <input
                                                value={birth_place}
                                                onChange={(event) => {
                                                    setBirthPlace(
                                                        event.target.value
                                                    );
                                                }}
                                                type="text"
                                                className="form-control"
                                                placeholder="birth place"
                                                aria-label="Birth place..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="w-full my-2 mb-4">
                        <div className="card">
                            <div className="card-body pt-3">
                                <h5>Address</h5>
                                <div className=" border border-slate-600 rounded-2xl px-4 my-2 py-2">
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
                                                        setAddressState(
                                                            event.target.value
                                                        );
                                                    }}
                                                    className="form-control"
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
                                                        setAddressDaira(
                                                            event.target.value
                                                        );
                                                    }}
                                                    className="form-control"
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
                                                        setAddressCity(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="text"
                                                    className="form-control"
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
                                                    className="form-control"
                                                    placeholder="Street"
                                                    aria-label="Street..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row px-2">
                    <button
                        onClick={(event) => add_doctor(event)}
                        type="submit"
                        className="btn bg-gradient-info w-full "
                    >
                        submit
                    </button>
                </div>
            </form>
        </div>
    );
}
