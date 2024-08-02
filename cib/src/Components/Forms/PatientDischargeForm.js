import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function PatientDischargeForm({ patient, hide }) {
    const url = process.env.REACT_APP_GSM_API_URL;
    const token = window.localStorage.getItem("token");

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [discharge_mode, setDischargeMode] = useState("");
    const [enter_reason, setEnterReason] = useState("");
    const [discharge_diagnosis, setDischargeDiagnosis] = useState("");

    let navigate = useNavigate();

    const submit = (event) => {
        event.preventDefault();
        axios({
            // Endpoint to send files
            url: url + "/discharges/doctors",
            method: "post",
            data: {
                date,
                time,
                discharge_mode,
                enter_reason,
                discharge_diagnosis,
                patient_id: patient.id,
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
                hide();
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

    useEffect(() => {}, []);
    return (
        <section className="py-3">
            <div className="container">
                <h2 spellCheck="false" className="text-gradient text-info">
                    Discharge Form
                </h2>
                <form autoComplete="off">
                    <div className="row">
                        <div className="w-full my-2 mb-4 ">
                            <div className="card">
                                <div className="card-body pt-3">
                                    <div className="mb-4 ">
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
                                                placeholder="Invoice Id"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="text-slate-500 text-md">
                                            {" "}
                                            Time
                                        </label>
                                        <div className="input-group mb-4">
                                            <input
                                                value={time}
                                                onChange={(event) => {
                                                    setTime(event.target.value);
                                                }}
                                                className="form-control"
                                                placeholder="time"
                                                aria-label="Time..."
                                                type="time"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-slate-500 text-md">
                                            {" "}
                                            Discharge mode
                                        </label>
                                        <div className="input-group mb-4">
                                            <input
                                                value={discharge_mode}
                                                onChange={(event) => {
                                                    setDischargeMode(
                                                        event.target.value
                                                    );
                                                }}
                                                type="text"
                                                className="form-control"
                                                placeholder="Discharge Mode"
                                                aria-label="Discharge Mode..."
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-slate-500 text-md">
                                            {" "}
                                            Reason of enter
                                        </label>
                                        <div className="input-group mb-4">
                                            <textarea
                                                value={enter_reason}
                                                onChange={(event) => {
                                                    setEnterReason(
                                                        event.target.value
                                                    );
                                                }}
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Reason"
                                                aria-label="Enter Reason..."
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-slate-500 text-md">
                                            {" "}
                                            Discharge diagnosis
                                        </label>
                                        <div className="input-group mb-4">
                                            <textarea
                                                value={discharge_diagnosis}
                                                onChange={(event) => {
                                                    setDischargeDiagnosis(
                                                        event.target.value
                                                    );
                                                }}
                                                type="number"
                                                className="form-control"
                                                placeholder="Discharge diagnosis"
                                                aria-label="Discharge diagnosis..."
                                            />
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
