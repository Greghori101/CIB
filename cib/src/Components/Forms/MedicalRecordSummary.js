import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

// components

export default function MedicalRecordSummary({
    getTests,
    hide,
    record,
    patient,
}) {
    const token = window.localStorage.getItem("token");
    const url = process.env.REACT_APP_GDME_API_URL;
    const [from, setFrom] = useState("");
    const [to, setTo] = React.useState("");
    const [date, setDate] = useState("");
    const [time, setProviderId] = useState("");
    const [title, setTitle] = useState("");
    const [provider, setProvider] = useState("");
    const [summary, setSummary] = useState([]);
    const [records, setRecords] = useState([]);

    const add_serivce = (event) => {
        event.preventDefault();
        let temp = [
            ...records,
            {
                time: time,
                date: date,
                title: title,
                provider: provider,
                summary: summary,
            },
        ];
        setRecords(temp);
        console.log(temp);
    };

    const delete_serivce = (event, id) => {
        event.preventDefault();
        let temp = records;
        temp.splice(id, 1);
        setRecords(temp);
    };
    const navigate = useNavigate();

    const submit = (event) => {
        event.preventDefault();
        axios({
            // Endpoint to send files
            url: url + "/invoices/create",
            method: "post",
            data: {
                to,
                records,
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
                getTests();
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
        <div
            className="relative flex flex-col max-w-[70%]  break-words w-full bg-slate-100  shadow-lg rounded-2xl border-0 m-auto"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="rounded-t-2xl px-4 py-4 mb-0 align-middle">
                <div className="text-center flex justify-between">
                    <h6 className="text-slate-700 text-xl font-bold uppercase">
                        Create Medical Record Summary
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
            <div className="flex-auto px-4 pb-4">
                <form>
                    <h6 className="text-slate-400 text-sm my-2 font-bold uppercase">
                        Medical Record Summary Details
                    </h6>
                    <div className="flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="flex flex-row">
                                <div className="relative w-full mb-3 mr-2">
                                    <label
                                        className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        from
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="From"
                                        onChange={(event) => {
                                            setFrom(event.target.value);
                                        }}
                                        value={from}
                                    />
                                </div>
                                <div className="relative w-full mb-3 ml-2">
                                    <label
                                        className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        To
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Name"
                                        onChange={(event) => {
                                            setTo(parseInt(event.target.value));
                                        }}
                                        value={to}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="w-full my-2 mb-4">
                                    <label
                                        className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        {" "}
                                        Chronological Medical Records Summary
                                    </label>

                                    <div className=" rounded shadow px-4 my-2 py-2 bg-white ">
                                        <div className="mb-4 ">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Create record
                                            </label>
                                            <div className="flex flex-row">
                                                <input
                                                    value={date}
                                                    onChange={(event) => {
                                                        setDate(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="text"
                                                    className="form-control "
                                                    placeholder="provided record"
                                                />
                                                <input
                                                    value={time}
                                                    onChange={(event) => {
                                                        setProviderId(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="text"
                                                    className="form-control ml-2"
                                                    placeholder="time"
                                                />

                                                <input
                                                    value={title}
                                                    onChange={(event) => {
                                                        setTitle(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="text"
                                                    className="form-control ml-2"
                                                    placeholder="provided record"
                                                />
                                                <input
                                                    value={provider}
                                                    onChange={(event) => {
                                                        setProvider(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="text"
                                                    className="form-control ml-2"
                                                    placeholder="time"
                                                />
                                                <input
                                                    value={summary}
                                                    onChange={(event) => {
                                                        setSummary(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="text"
                                                    className="form-control ml-2"
                                                    placeholder="time"
                                                />

                                                <button
                                                    onClick={(event) => {
                                                        add_serivce(event);
                                                    }}
                                                    className="ml-2"
                                                >
                                                    <i className="fa-solid fa-add  hover:text-blue-600 font-bold border-1 border-slate-100 rounded-full p-2 shadow-lg"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <label className="text-slate-500 text-md">
                                                    {" "}
                                                    Records
                                                </label>
                                                <ul>
                                                    {records.length === 0 ||
                                                    !records ? (
                                                        <div className="w-full flex justify-center flex-col items-center">
                                                            <img
                                                                className="w-fit"
                                                                src={require("../../assets/img/file-not-found.png")}
                                                            ></img>
                                                            no records
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}

                                                    {records.map(
                                                        (record, id) => {
                                                            console.log(record);
                                                            return (
                                                                <li
                                                                    key={id}
                                                                    className="flex flex-row justify-between items-center my-1"
                                                                >
                                                                    <div className="flex flex-row items-center justify-evenly w-full">
                                                                        <span>
                                                                            {
                                                                                record.date
                                                                            }
                                                                        </span>
                                                                        <span>
                                                                            {record.time +
                                                                                " DZD"}
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                record.provider
                                                                            }
                                                                        </span>
                                                                        <span>
                                                                            {record.summary +
                                                                                " DZD"}
                                                                        </span>
                                                                        <span>
                                                                            {record.time +
                                                                                " DZD"}
                                                                        </span>
                                                                    </div>

                                                                    <button
                                                                        onClick={(
                                                                            event
                                                                        ) => {
                                                                            delete_serivce(
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
                                                        }
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
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
            </div>
        </div>
    );
}
