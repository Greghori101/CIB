import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdmissionSlipForm({ hospitalization}) {
    const url = process.env.REACT_APP_GSM_API_URL;
    const token = window.localStorage.getItem("token");

    const [admission_id, setAdmissionId] = useState("");
    const [date, setDate] = useState("");

    const [insurance_id, setInsuranceId] = useState("");
    const [profession, setProfession] = useState("");
    const [profession_code, setProfessionCode] = useState("");
    const [number_support, setNumberSupport] = useState("");
    const [insurance_address_state, setInsuranceAddressState] = useState("");
    const [insurance_address_daira, setInsuranceAddressDaira] = useState("");
    const [insurance_address_city, setInsuranceAddressCity] = useState("");
    const [insurance_address_street, setInsuranceAddressStreet] = useState("");
    const [affiliate_fund, setAffiliateFund] = useState("");

    let navigate = useNavigate();

    const submit = (event) => {
        event.preventDefault();
        axios({
            // Endpoint to send files
            url: url + "/admissions",
            method: "post",
            data: {
                admission_id,
                date,
                insurance_id,
                insurance_address_country:'algeria',
                insurance_address_city,
                insurance_address_daira,
                insurance_address_state,
                insurance_address_street,
                profession,
                profession_code,
                number_support,
                affiliate_fund,
                patient_id:hospitalization.patient_id,
                hospitalization_id:hospitalization.id,
            },
            headers: {
                Accept: "Application/json",
                Authorization: "Bearer " + token,
            },
        })
            // Handle the response from backend here
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    iconColor: "#3dc00c",
                });
            });

        // Catch errors if any
        // .catch((error) => {
        //     if (error.response.status === 401) {
        //         Swal.fire({
        //             title: "Please sign in",
        //             text: "You are not signed in",
        //             icon: "error",
        //         }).then(() => {
        //             window.localStorage.clear();
        //             navigate("/login");
        //         });
        //     }
        //     if (error.response.status === 500) {
        //         navigate("/500");
        //     } else {
        //         Swal.fire({
        //             title: error.response?.statusText,
        //             text: error.response.data.message,
        //             icon: "error",
        //         });
        //     }
        // });
    };

    useEffect(() => {}, []);

    return (
        <section className="py-3">
            <div className="container">
                <h2 spellCheck="false" className="text-gradient text-info">
                    Admission Slip Form
                </h2>

                <form autoComplete="off">
                    <div className="row">
                        <div className="w-full my-2 mb-4">
                            <div className="card">
                                <div className="card-body pt-3">
                                    <div className="mb-4 ">
                                        <h5>Hospitalization</h5>
                                        <div></div>
                                        <label className="text-slate-500 text-md">
                                            {" "}
                                            Admission Id
                                        </label>
                                        <div className="input-group">
                                            <input
                                                value={admission_id}
                                                onChange={(event) => {
                                                    setAdmissionId(
                                                        event.target.value
                                                    );
                                                }}
                                                type="text"
                                                className="form-control"
                                                placeholder="Admission Id"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-slate-500 text-md">
                                            {" "}
                                            Date
                                        </label>
                                        <div className="input-group">
                                            <input
                                                value={date}
                                                onChange={(event) => {
                                                    setDate(event.target.value);
                                                }}
                                                type="date"
                                                className="form-control"
                                                placeholder="Date"
                                            />
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
                                    <h5>Insurance Identification</h5>

                                    <div className=" border border-slate-600 rounded-2xl px-4 my-2 py-2">
                                        <div className="mb-4 ">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Insurance Id
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    value={insurance_id}
                                                    onChange={(event) => {
                                                        setInsuranceId(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Insurance Id"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4 ">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Number Support
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    value={number_support}
                                                    onChange={(event) => {
                                                        setNumberSupport(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Number Support"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <label className="text-slate-500 text-md">
                                                    {" "}
                                                    Profession
                                                </label>
                                                <div className="input-group mb-4">
                                                    <input
                                                        value={profession}
                                                        onChange={(event) => {
                                                            setProfession(
                                                                event.target
                                                                    .value
                                                            );
                                                        }}
                                                        className="form-control"
                                                        placeholder="Profession"
                                                        aria-label="Profession..."
                                                        type="text"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col ps-2">
                                                <label className="text-slate-500 text-md">
                                                    {" "}
                                                    Profession Code
                                                </label>
                                                <div className="input-group mb-4">
                                                    <input
                                                        value={profession_code}
                                                        onChange={(event) => {
                                                            setProfessionCode(
                                                                event.target
                                                                    .value
                                                            );
                                                        }}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Profession code"
                                                        aria-label="Profession Code..."
                                                    />
                                                </div>
                                            </div>
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Affiliate Fund
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    value={affiliate_fund}
                                                    onChange={(event) => {
                                                        setAffiliateFund(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Affiliate Fund"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4 mt-4">
                                            <h5>Insurance Address</h5>
                                            <div className=" border border-slate-600 rounded-2xl px-4 my-2 py-2">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className="text-slate-500 text-md">
                                                            {" "}
                                                            State
                                                        </label>
                                                        <div className="input-group mb-4">
                                                            <input
                                                                value={
                                                                    insurance_address_state
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    setInsuranceAddressState(
                                                                        event
                                                                            .target
                                                                            .value
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
                                                                value={
                                                                    insurance_address_daira
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    setInsuranceAddressDaira(
                                                                        event
                                                                            .target
                                                                            .value
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
                                                                value={
                                                                    insurance_address_city
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    setInsuranceAddressCity(
                                                                        event
                                                                            .target
                                                                            .value
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
                                                                value={
                                                                    insurance_address_street
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    setInsuranceAddressStreet(
                                                                        event
                                                                            .target
                                                                            .value
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
                        </div>
                    </div>
                    <div className="row px-2">
                        <button
                            onClick={(event) => submit(event)}
                            type="submit"
                            className="btn bg-gradient-info w-full "
                        >
                            submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
