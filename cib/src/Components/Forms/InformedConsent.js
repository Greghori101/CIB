import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

// components

export default function InformedConsent({ next }) {
    const token = window.localStorage.getItem("token");
    const url_gsm = process.env.REACT_APP_GSM_API_URL;

    const [national_id, setNationalId] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [blood_group, setBloodGroup] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [nationality, setNationality] = useState("");
    const [birth_date, setBirthDate] = useState("");
    const [family_situation, setFamilySituation] = useState("");
    const [birth_place, setBirthPlace] = useState("");
    const [person_contact, setPersonContact] = useState("");
    const [person_contact_phone, setPersonContactPhoneNumber] = useState("");
    const [person_contact_wilaya, setPersonContactWilaya] = useState("");
    const [state, setAddressState] = useState("");
    const [daira, setAddressDaira] = useState("");
    const [city, setAddressCity] = useState("");
    const [street, setAddressStreet] = useState("");
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const navigate = useNavigate();

    const add_patient = (event) => {
        event.preventDefault();

        axios({
            // Endpoint to send files
            url: url_gsm + "/patients",
            method: "post",
            data: {
                national_id,
                nationality,
                firstname,
                lastname,
                city,
                daira,
                state,
                street,
                blood_group,
                phone_number,
                gender,
                birth_date,
                birth_place,
                family_situation,
                person_contact,
                person_contact_phone,
                person_contact_wilaya,
                email,
                height,
                weight,
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
                }).then(() => {
                    next(response.data);
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

    useEffect(() => {
        // get_patients();
    }, []);
    return (
        <div className="flex-auto px-4 pb-4">
            <form autoComplete="off">
                <div className="row">
                    <div className="w-full my-2 mb-4">
                        <div className="card">
                            <div className="card-body pt-3">
                                <h5>Patient inscription</h5>
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
                                                    placeholder="lastname"
                                                    aria-label="Last Name..."
                                                />
                                            </div>
                                        </div>
                                        <div className="col ps-2">
                                        <label className="text-slate-500 text-md">
                                                {" "}
                                                Blood Group
                                            </label>
                                            <div className="input-group mb-4">
                                                <select
                                                    value={blood_group}
                                                    onChange={(event) => {
                                                        setBloodGroup(
                                                            event.target.value
                                                        );
                                                    }}
                                                    className="form-control"
                                                    aria-label="Blood Group"
                                                >
                                                    <option value="">
                                                        Select Blood Group
                                                    </option>
                                                    <option value="A+">
                                                        A+
                                                    </option>
                                                    <option value="A-">
                                                        A-
                                                    </option>
                                                    <option value="B+">
                                                        B+
                                                    </option>
                                                    <option value="B-">
                                                        B-
                                                    </option>
                                                    <option value="AB+">
                                                        AB+
                                                    </option>
                                                    <option value="AB-">
                                                        AB-
                                                    </option>
                                                    <option value="O+">
                                                        O+
                                                    </option>
                                                    <option value="O-">
                                                        O-
                                                    </option>
                                                </select>
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
                                    <div className="mb-4">
                                        <label className="text-slate-500 text-md">
                                            {" "}
                                            Email
                                        </label>
                                        <div className="input-group mb-4">
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
                                                aria-label="Email..."
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
                                                Nationality
                                            </label>
                                            <div className="input-group mb-4">
                                                <input
                                                    value={nationality}
                                                    onChange={(event) => {
                                                        setNationality(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="nationality"
                                                    aria-label="nationality..."
                                                />
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
                                                    placeholder="date of birth "
                                                    aria-label="date of birth..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Family Situation
                                            </label>
                                            <div className="input-group mb-4">
                                                <input
                                                    value={family_situation}
                                                    onChange={(event) => {
                                                        setFamilySituation(
                                                            event.target.value
                                                        );
                                                    }}
                                                    className="form-control"
                                                    placeholder="Family Situation"
                                                    aria-label="Family Situation..."
                                                    type="text"
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
                                    <div className="row">
                                        <div className="col">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                weight
                                            </label>
                                            <div className="input-group mb-4">
                                                <input
                                                    value={weight}
                                                    onChange={(event) => {
                                                        setWeight(
                                                            event.target.value
                                                        );
                                                    }}
                                                    className="form-control"
                                                    placeholder="weight"
                                                    aria-label="weight..."
                                                    type="number"
                                                />
                                            </div>
                                        </div>
                                        <div className="col ps-2">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                height
                                            </label>
                                            <div className="input-group mb-4">
                                                <input
                                                    value={height}
                                                    onChange={(event) => {
                                                        setHeight(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="height"
                                                    aria-label="height..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Person Contact
                                            </label>
                                            <div className="input-group mb-4">
                                                <input
                                                    value={person_contact}
                                                    onChange={(event) => {
                                                        setPersonContact(
                                                            event.target.value
                                                        );
                                                    }}
                                                    className="form-control"
                                                    placeholder="Person contact"
                                                    aria-label="Person Contact..."
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col ps-2">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                               His Phone number
                                            </label>
                                            <div className="input-group mb-4">
                                                <input
                                                    value={person_contact_phone}
                                                    onChange={(event) => {
                                                        setPersonContactPhoneNumber(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Phone Number"
                                                    aria-label="Phone number..."
                                                />
                                            </div>
                                        </div>
                                        <div className="col ps-2">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Wilaya
                                            </label>
                                            <div className="input-group mb-4">
                                                <input
                                                    value={
                                                        person_contact_wilaya
                                                    }
                                                    onChange={(event) => {
                                                        setPersonContactWilaya(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="date"
                                                    className="form-control"
                                                    placeholder="wilaya"
                                                    aria-label="Wilaya..."
                                                />
                                            </div>
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
                        onClick={(event) => add_patient(event)}
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
