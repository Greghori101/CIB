import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ConsultationForm({ visit, patient }) {
    const url = process.env.REACT_APP_GRDV_API_URL;
    const token = window.localStorage.getItem("token");

    const [date, setDate] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [dosage, setDosage] = useState("");
    const [quantity, setQuantity] = useState("");
    const [duration, setDuration] = useState("");
    const [drug_route, setDrugRoute] = useState("");
    const [note, setNote] = useState("");
    const [medications, setMedications] = useState([]);

    const add_medication = (event) => {
        event.preventDefault();
        let temp = [
            ...medications,
            {
                dosage: dosage,
                quantity: quantity,
                duration: duration,
                drug_route: drug_route,
                note: note,
            },
        ];
        console.log(temp);
        setMedications(temp);
    };

    const delete_medication = (event, id) => {
        event.preventDefault();
        let temp = [...medications];
        temp.splice(id, 1);
        console.log(temp);
        setMedications(temp);
    };

    let navigate = useNavigate();

    const submit = async (event) => {
        event.preventDefault();

        await axios({
            url: url + "/consultation-reports",
            method: "post",
            data: {
                date,
                symptoms,
                diagnosis,
                patient_id: patient.id,
                visit_id: visit.id,
                medications,
                note,
            },
            headers: {
                Accept: "Application/json",
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    iconColor: "#3dc00c",
                });
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    Swal.fire({
                        quantity: "Please sign in",
                        text: "You are not signed in",
                        icon: "error",
                    }).then(() => {
                        window.localStorage.clear();
                        navigate("/login");
                    });
                } else if (error.response.status === 500) {
                    navigate("/500");
                } else {
                    Swal.fire({
                        quantity: error.response?.statusText,
                        text: error.response.data.message,
                        icon: "error",
                    });
                }
            });
    };

    useEffect(() => {}, []);

    return (
        <form autoComplete="off">
            <div className="row">
                <div className="col">
                    <label className="text-slate-500 text-md"> Date</label>
                    <div className="input-group mb-4">
                        <input
                            value={date}
                            onChange={(event) => {
                                setDate(event.target.value);
                            }}
                            className="form-control"
                            placeholder="Date"
                            aria-label="Date"
                            type="date"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="text-slate-500 text-md"> Symptoms</label>
                    <div className="input-group mb-4">
                        <input
                            value={symptoms}
                            onChange={(event) => {
                                setSymptoms(event.target.value);
                            }}
                            className="form-control"
                            placeholder="Symptoms"
                            aria-label="Symptoms"
                            type="text"
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <label className="text-slate-500 text-md"> Diagnosis</label>
                    <div className="input-group mb-4">
                        <input
                            value={diagnosis}
                            onChange={(event) => {
                                setDiagnosis(event.target.value);
                            }}
                            className="form-control"
                            placeholder="Diagnosis"
                            aria-label="Diagnosis"
                            type="text"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="w-full my-2 mb-4">
                    <label
                        className="block capitalize text-slate-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        {" "}
                        Medications
                    </label>

                    <div className=" rounded shadow px-4 my-2 py-2 bg-white ">
                        <div className="mb-4 ">
                            <label className="text-slate-500 text-md flex flex-row justify-between">
                                {" "}
                                Create medication{" "}
                                <button
                                    onClick={(event) => {
                                        add_medication(event);
                                    }}
                                    className="ml-2"
                                >
                                    <i className="fa-solid fa-add  hover:text-blue-600 font-bold border-1 border-slate-100 rounded-full p-2 shadow-lg"></i>
                                </button>
                            </label>
                            <div className="flex flex-row">
                                <div className="flex flex-col mx-1">
                                    <label>Dosage</label>
                                    <input
                                        value={dosage}
                                        onChange={(event) => {
                                            setDosage(event.target.value);
                                        }}
                                        type="text"
                                        className="form-control ml-2"
                                        placeholder="dosage"
                                    />
                                </div>
                                <div className="flex flex-col mx-1">
                                    <label>Quantity</label>
                                    <input
                                        value={quantity}
                                        onChange={(event) => {
                                            setQuantity(event.target.value);
                                        }}
                                        type="number"
                                        className="form-control ml-2"
                                        placeholder="Quantity"
                                    />
                                </div>
                                <div className="flex flex-col mx-1">
                                    <label>Duration</label>
                                    <input
                                        value={duration}
                                        onChange={(event) => {
                                            setDuration(event.target.value);
                                        }}
                                        type="text"
                                        className="form-control ml-2"
                                        placeholder="dosage"
                                    />
                                </div>
                                <div className="flex flex-col mx-1">
                                    <label>Drug Route</label>
                                    <input
                                        value={drug_route}
                                        onChange={(event) => {
                                            setDrugRoute(event.target.value);
                                        }}
                                        type="text"
                                        className="form-control ml-2"
                                        placeholder="dosage"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mx-1">
                                <label>Note</label>
                                <input
                                    value={note}
                                    onChange={(event) => {
                                        setNote(event.target.value);
                                    }}
                                    type="text"
                                    className="form-control ml-2"
                                    placeholder="note"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label className="text-slate-500 text-md">
                                    {" "}
                                    Medications
                                </label>
                                <ul>
                                    {medications.length === 0 ||
                                    !medications ? (
                                        <div className="w-full flex justify-center flex-col items-center">
                                            <img
                                                className="w-fit"
                                                src={require("../../assets/img/file-not-found.png")}
                                            ></img>
                                            no medications
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                    {medications.map((medication, id) => {
                                        return (
                                            <li
                                                key={id}
                                                className="flex flex-row justify-between items-center my-1"
                                            >
                                                <div className="flex flex-row items-center justify-between w-full">
                                                    <span>
                                                        {medication.note}
                                                    </span>
                                                    <span>
                                                        {medication.dosage}
                                                    </span>
                                                    <span>
                                                        {medication.duration}
                                                    </span>
                                                    <span>
                                                        {medication.drug_route +
                                                            " DZD"}
                                                    </span>
                                                    <span>
                                                        {medication.dosage +
                                                            " DZD"}
                                                    </span>
                                                </div>

                                                <button
                                                    onClick={(event) => {
                                                        delete_medication(
                                                            event,
                                                            id
                                                        );
                                                    }}
                                                    className="w-fit ml-4"
                                                >
                                                    <i className="fa-solid fa-trash hover:text-red-600 font-bold border-1 border-slate-100 rounded-full p-2 shadow-lg"></i>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rest of the form */}

            <div className="row px-2">
                <button
                    onClick={(event) => submit(event)}
                    type="submit"
                    className="btn bg-gradient-info w-full "
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
