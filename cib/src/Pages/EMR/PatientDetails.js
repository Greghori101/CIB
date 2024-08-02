import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function PatientDetails() {
    let { id } = useParams();
    const url = process.env.REACT_APP_GSM_API_URL;
    const token = window.localStorage.getItem("token");
    const [patient, setPatient] = useState("");

    let navigate = useNavigate();

    const get_patient = () => {
        axios({
            // Endpoint to send files
            url: url + "/patients/" + id,
            method: "get",
            headers: {
                Accept: "Application/json",
                Authorization: "Bearer " + token,
            },
        })
            // Handle the response from backend here
            .then((response) => {
                setPatient(response.data);
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
        get_patient();
    }, []);

    return (
        <>
            {patient ? (
                <section className="py-3">
                    <div className="flex-auto px-4 pb-4">
                        <div className="row">
                        <h2
                            spellCheck="false"
                            className="text-gradient text-info"
                        >
                            Patient Details
                        </h2>
                            <div className="w-full my-2 mb-4">
                                <div className="card">
                                    <div className="card-body pt-3">
                                        <h5>Patient Informations</h5>
                                        <div className=" border border-slate-600 rounded-2xl px-4 my-2 py-2">
                                            <div className="mb-4 ">
                                                <label className="text-slate-500 text-md">
                                                    National Card Id
                                                </label>
                                                <div className="input-group">
                                                    <label className="form-control">
                                                        {
                                                            patient.user
                                                                .national_id
                                                        }
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col">
                                                    <label className="text-slate-500 text-md">
                                                        {" "}
                                                        First Name
                                                    </label>
                                                    <div className="input-group mb-4">
                                                        <label className="form-control">
                                                            {
                                                                patient.user
                                                                    .firstname
                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col ps-2">
                                                    <label className="text-slate-500 text-md">
                                                        {" "}
                                                        Last Name
                                                    </label>
                                                    <div className="input-group mb-4">
                                                        <label className="form-control">
                                                            {
                                                                patient.user
                                                                    .lastname
                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col ps-2">
                                                    <label className="text-slate-500 text-md">
                                                        {" "}
                                                        Blood Group
                                                    </label>
                                                    <div className="input-group mb-4">
                                                        <label className="form-control">
                                                            {
                                                                patient.blood_group
                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="text-slate-500 text-md">
                                                    {" "}
                                                    Phone Number
                                                </label>
                                                <div className="input-group mb-4">
                                                    <label className="form-control">
                                                        {
                                                            patient.user
                                                                .phone_number
                                                        }
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="text-slate-500 text-md">
                                                    {" "}
                                                    Email
                                                </label>
                                                <div className="input-group mb-4">
                                                    <label className="form-control">
                                                        {patient.user.email}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <label className="text-slate-500 text-md">
                                                        {" "}
                                                        Gender
                                                    </label>
                                                    <div className="input-group mb-4">
                                                        <label className="form-control">
                                                            {
                                                                patient.user
                                                                    .gender
                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col ps-2">
                                                    <label className="text-slate-500 text-md">
                                                        {" "}
                                                        Nationality
                                                    </label>
                                                    <div className="input-group mb-4">
                                                        <label className="form-control">
                                                            {
                                                                patient.nationality
                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col ps-2">
                                                    <label className="text-slate-500 text-md">
                                                        {" "}
                                                        date of birth
                                                    </label>
                                                    <div className="input-group mb-4">
                                                        <label className="form-control">
                                                            {
                                                                patient.user
                                                                    .birth_date
                                                            }
                                                        </label>
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
                                                        <label className="form-control">
                                                            {
                                                                patient.family_situation
                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col ps-2">
                                                    <label className="text-slate-500 text-md">
                                                        {" "}
                                                        Birth place
                                                    </label>
                                                    <div className="input-group mb-4">
                                                        <label className="form-control">
                                                            {
                                                                patient.user
                                                                    .birth_place
                                                            }
                                                        </label>
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
                                                        <label className="form-control">
                                                            {patient.weight}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col ps-2">
                                                    <label className="text-slate-500 text-md">
                                                        {" "}
                                                        height
                                                    </label>
                                                    <div className="input-group mb-4">
                                                        <label className="form-control">
                                                            {patient.height}
                                                        </label>
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
                                                        <label className="form-control">
                                                            {
                                                                patient.person_contact
                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col ps-2">
                                                    <label className="text-slate-500 text-md">
                                                        {" "}
                                                        His Phone number
                                                    </label>
                                                    <div className="input-group mb-4">
                                                        <label className="form-control">
                                                            {
                                                                patient.person_contact_phone
                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col ps-2">
                                                    <label className="text-slate-500 text-md">
                                                        {" "}
                                                        Wilaya
                                                    </label>
                                                    <div className="input-group mb-4">
                                                        <label className="form-control">
                                                            {
                                                                patient.person_contact_wilaya
                                                            }
                                                        </label>
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
                                                        <label className="form-control">
                                                            {
                                                                patient.user
                                                                    .address
                                                                    ?.state
                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="text-slate-500 text-md">
                                                        {" "}
                                                        Daira
                                                    </label>
                                                    <div className="input-group mb-4">
                                                        <label className="form-control">
                                                            {
                                                                patient.user
                                                                    .address
                                                                    .daira
                                                            }
                                                        </label>
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
                                                        <label className="form-control">
                                                            {
                                                                patient.user
                                                                    .address
                                                                    .city
                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 ps-2">
                                                    <label className="text-slate-500 text-md">
                                                        {" "}
                                                        Street
                                                    </label>
                                                    <div className="input-group mb-4">
                                                        <label className="form-control">
                                                            {
                                                                patient.user
                                                                    .address
                                                                    .street
                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <h2
                            spellCheck="false"
                            className="text-gradient text-info"
                        >
                            Admission Slip Form
                        </h2>

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
                                                    <label className="form-control">
                                                        {
                                                            patient.admission
                                                                .insurance_id
                                                        }
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mb-4 ">
                                                <label className="text-slate-500 text-md">
                                                    {" "}
                                                    Number Support
                                                </label>
                                                <div className="input-group">
                                                    <label className="form-control">
                                                        {
                                                            patient.admission
                                                                .number_support
                                                        }
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <label className="text-slate-500 text-md">
                                                        {" "}
                                                        Profession
                                                    </label>
                                                    <div className="input-group mb-4">
                                                        <label className="form-control">
                                                            {
                                                                patient
                                                                    .admission
                                                                    .profession
                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col ps-2">
                                                    <label className="text-slate-500 text-md">
                                                        {" "}
                                                        Profession Code
                                                    </label>
                                                    <div className="input-group mb-4">
                                                        <label className="form-control">
                                                            {
                                                                patient
                                                                    .admission
                                                                    .profession_code
                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                                <label className="text-slate-500 text-md">
                                                    {" "}
                                                    Affiliate Fund
                                                </label>
                                                <div className="input-group">
                                                    <label className="form-control">
                                                        {
                                                            patient.admission
                                                                .affiliate_fund
                                                        }
                                                    </label>
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
                                                                <label className="form-control">
                                                                    {
                                                                        patient
                                                                            .admission
                                                                            .insurance_address
                                                                            ?.state
                                                                    }
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="text-slate-500 text-md">
                                                                {" "}
                                                                Daira
                                                            </label>
                                                            <div className="input-group mb-4">
                                                                <label className="form-control">
                                                                    {
                                                                        patient
                                                                            .admission
                                                                            .insurance_address
                                                                            ?.daira
                                                                    }
                                                                </label>
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
                                                                <label className="form-control">
                                                                    {
                                                                        patient
                                                                            .admission
                                                                            .insurance_address
                                                                            ?.city
                                                                    }
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 ps-2">
                                                            <label className="text-slate-500 text-md">
                                                                {" "}
                                                                Street
                                                            </label>
                                                            <div className="input-group mb-4">
                                                                <label className="form-control">
                                                                    {
                                                                        patient
                                                                            .admission
                                                                            .insurance_address
                                                                            ?.street
                                                                    }
                                                                </label>
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
                    </div>
                    <div className="container">
                        <h2
                            spellCheck="false"
                            className="text-gradient text-info"
                        >
                            Shuttle Sheet
                        </h2>

                        <div className="row">
                            <div className="w-full my-2 mb-4">
                                <div className="card">
                                    <div className="card-body pt-3">
                                        <div className="mb-4 ">
                                            <h5>Hospitalization</h5>
                                            <div></div>
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Service
                                            </label>
                                            <div className="input-group">
                                                <label className="form-control">
                                                    {patient.service.name}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Date
                                            </label>
                                            <div className="input-group">
                                                <label className="form-control">
                                                    {
                                                        patient.hospitalization
                                                            .date
                                                    }
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                ""
            )}
        </>
    );
}
