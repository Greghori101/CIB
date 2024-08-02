import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ReportForm({ patient, doctor }) {
    const url = process.env.REACT_APP_MED_GUARD_API_URL;
    const token = window.localStorage.getItem("token");

    const [admission_id, setAdmissionId] = useState("");
    const [date, setDate] = useState("");

    const [patient_id, setPAtientId] = useState("");
    const [chief_complaint, setChiefComplaint] = useState("");
    const [hpi, setHpi] = useState("");
    const [pmh, setPmh] = useState("");
    const [ros, setRos] = useState("");
    const [physical_examination, setPhysicalExamination] = useState("");
    const [diagnostic_tests, setDiagnosticTests] = useState([]);
    const [ad, setAd] = useState("");
    const [treatment_plan, setTreatmentPlan] = useState("");
    const [conclusion, setConclusion] = useState("");

    let navigate = useNavigate();

    const submit = (event) => {
        event.preventDefault();
        axios({
            // Endpoint to send files
            url: url,
            method: "post",
            data: {
                admission_id,
                date,
                patient_id,
                diagnostic_tests,
                chief_complaint,
                hpi,
                pmh,
                ros,
                physical_examination,
                ad,
                conclusion,
                treatment_plan,
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
                    Report Form
                </h2>

                <form autoComplete="off">
                    <div className="row">
                        <div className="w-full my-2 mb-4">
                            <div className="card">
                                <div className="card-body pt-3">
                                    <div className="mb-4 ">
                                        <label className="text-slate-500 text-md">
                                            {" "}
                                            patient
                                        </label>
                                        <div className="input-group">
                                            <input
                                                value={patient_id}
                                                onChange={(event) => {
                                                    setPAtientId(
                                                        event.target.value
                                                    );
                                                }}
                                                type="text"
                                                className="form-control"
                                                placeholder="Patient"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Chief Complaint
                                            </label>
                                            <div className="input-group mb-4">
                                                <input
                                                    value={chief_complaint}
                                                    onChange={(event) => {
                                                        setChiefComplaint(
                                                            event.target.value
                                                        );
                                                    }}
                                                    className="form-control"
                                                    placeholder="Chief Complaint:"
                                                    aria-label="Chief Complaint:..."
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label className="text-slate-500 text-md">
                                                History of Present Illness
                                            </label>
                                            <div className="input-group mb-4">
                                                <textarea
                                                    value={hpi}
                                                    onChange={(event) => {
                                                        setHpi(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="text"
                                                    className="form-control !min-h-[150px]"
                                                    placeholder="eg. Jordan"
                                                    aria-label="History of Present Illness..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Past Medical History
                                            </label>
                                            <div className="input-group mb-4">
                                                <textarea
                                                    value={pmh}
                                                    onChange={(event) => {
                                                        setPmh(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="text"
                                                    className="form-control !min-h-[150px]"
                                                    placeholder="eg. Jordan"
                                                    aria-label="Past Medical History..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-slate-500 text-md">
                                            {" "}
                                            Review of Systems
                                        </label>
                                        <div className="input-group mb-4">
                                            <textarea
                                                value={ros}
                                                onChange={(event) => {
                                                    setRos(event.target.value);
                                                }}
                                                type="number"
                                                className="form-control !min-h-[150px]"
                                                placeholder="Review of Systems"
                                                aria-label="Review of Systems..."
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Physical Examination
                                            </label>
                                            <div className="input-group mb-4">
                                                <textarea
                                                    value={physical_examination}
                                                    onChange={(event) => {
                                                        setPhysicalExamination(
                                                            event.target.value
                                                        );
                                                    }}
                                                    className="form-control  !min-h-[150px]"
                                                    placeholder="eg. Michael"
                                                    aria-label="Physical Examination..."
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label className="text-slate-500 text-md">
                                                Assessment and Diagnosis
                                            </label>
                                            <div className="input-group mb-4">
                                                <input
                                                    value={ad}
                                                    onChange={(event) => {
                                                        setAd(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Assessment and Diagnosis"
                                                    aria-label="Assessment and Diagnosis..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Treatment Plan
                                            </label>
                                            <div className="input-group mb-4">
                                                <input
                                                    value={treatment_plan}
                                                    onChange={(event) => {
                                                        setTreatmentPlan(
                                                            event.target.value
                                                        );
                                                    }}
                                                    className="form-control"
                                                    placeholder="eg. Michael"
                                                    aria-label="Family Situation..."
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Conclusion
                                            </label>
                                            <div className="input-group mb-4">
                                                <textarea
                                                    value={conclusion}
                                                    onChange={(event) => {
                                                        setConclusion(
                                                            event.target.value
                                                        );
                                                    }}
                                                    className="form-control !min-h-[150px]"
                                                    placeholder="eg. Michael"
                                                    aria-label="Family Situation..."
                                                    type="text"
                                                />
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
