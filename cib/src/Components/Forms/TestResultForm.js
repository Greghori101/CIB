import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

// components

export default function TestResultForm({ getTests, hide, service, patient }) {
    const token = window.localStorage.getItem("token");
    const url = process.env.REACT_APP_API_URL;
    const [title, setTitle] = useState("");
    const [type, setType] = React.useState("");
    const [service_id, setServiceId] = React.useState("");
    const [summary, setSummry] = useState("");
    const [results, setResults] = useState(null);
    const [details, setDetails] = useState("");
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState([]);
    const [uploaded_results, setUploadedImages] = useState([]);

    const handleFileUpload = (event) => {
        event.preventDefault();
        const files = event.target.files;
        const updatedImages = [...uploaded_results];

        for (let i = 0; i < files.length; i++) {
            if (updatedImages.length < 20) {
                updatedImages.push(files[i]);
            }
        }

        setUploadedImages(updatedImages);
    };

    const handleRemoveImage = (event, index) => {
        event.preventDefault();
        const updatedImages = [...uploaded_results];
        updatedImages.splice(index, 1);
        setUploadedImages(updatedImages);
    };

    const add_note = (event) => {
        event.preventDefault();
        if (note) {
            let temp = [...notes, note];
            setNotes(temp);
        }
    };

    const delete_note = (event, note) => {
        event.preventDefault();
        setNotes(notes.filter((element) => element !== note));
    };
    const navigate = useNavigate();

    const submit = (event) => {
        event.preventDefault();
        axios({
            // Endpoint to send files
            url: url + "/tests/requests/create",
            method: "post",
            data: {
                title,
                type,
                service_id,
                notes,
                summary,
                details,
                results,
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
                        Create Test
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
                        Test details
                    </h6>
                    <div className="flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="relative w-full mb-3">
                                <label
                                    className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    title
                                </label>
                                <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Name"
                                    onChange={(event) => {
                                        setTitle(event.target.value);
                                    }}
                                    value={title}
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Service
                                </label>
                                <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Name"
                                    onChange={(event) => {
                                        setServiceId(event.target.value);
                                    }}
                                    value={service_id}
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    type
                                </label>
                                <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Email"
                                    onChange={(event) => {
                                        setType(event.target.value);
                                    }}
                                    value={type}
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    summary
                                </label>
                                <textarea
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Email"
                                    onChange={(event) => {
                                        setSummry(event.target.value);
                                    }}
                                    value={summary}
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Details
                                </label>
                                <textarea
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Email"
                                    onChange={(event) => {
                                        setDetails(event.target.value);
                                    }}
                                    value={details}
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    results
                                </label>
                                <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Email"
                                    onChange={(event) => {
                                        setResults(event.target.value);
                                    }}
                                    value={results}
                                />
                            </div>
                            <div>
                                <label className="block capitalize text-slate-600 text-xs font-bold mb-2">
                                    Service results
                                </label>
                                <div className="flex flex-row  w-full  overflow-auto">
                                    <div>
                                        <label className="text-slate-500 text-md">
                                            <div className="w-[100px] h-[120px] rounded border-dashed border-2 border-slate-300 text-slate-500 flex  items-center p-4 hover:cursor-pointer hover:border-blue-500 transition-all duration-200 ease-in-out  hover:text-blue-500 hover:border-solid justify-evenly">
                                                <i className="fa-solid fa-add"></i>{" "}
                                                Upload
                                            </div>
                                            <input
                                                type="file"
                                                multiple
                                                accept="application/pdf,application/docx,image/*"
                                                onChange={handleFileUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    {uploaded_results.map((result, index) => (
                                        <div
                                            key={index}
                                            className="relative !w-[100px] mx-2 flex flex-col"
                                        >
                                            <img
                                                src={
                                                    result.type ===
                                                    "application/pdf"
                                                        ? require("../../assets/img/pdf.png")
                                                        : result.type ===
                                                          "application/doc"
                                                        ? require("../../assets/img/docx-file.png")
                                                        : result.type ===
                                                          "application/docx"
                                                        ? require("../../assets/img/docx.png")
                                                        : URL.createObjectURL(
                                                              result
                                                          )
                                                }
                                                className="w-[100px] h-[120px] object-fit rounded "
                                                alt={`uploaded-result-${index}`}
                                            />
                                            {result.name}
                                            <button
                                                className="absolute top-0 right-0 m-2 rounded-full bg-black bg-opacity-50 text-white !w-8 h-8 hover:text-red-600 transition-all duration-200"
                                                onClick={(event) =>
                                                    handleRemoveImage(
                                                        event,
                                                        index
                                                    )
                                                }
                                            >
                                                <i className="fa-solid fa-close"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="row">
                                <div className="w-full my-2 mb-4">
                                    <label
                                        className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        {" "}
                                        Notes
                                    </label>

                                    <div className=" rounded shadow px-4 my-2 py-2 bg-white ">
                                        <div className="mb-4 ">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Create note
                                            </label>
                                            <div className="flex flex-row">
                                                <input
                                                    value={note}
                                                    onChange={(event) => {
                                                        setNote(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="chief doctor"
                                                />

                                                <button
                                                    onClick={(event) => {
                                                        add_note(event);
                                                    }}
                                                >
                                                    <i className="fa-solid fa-add mx-4 hover:text-blue-600 font-bold border-1 border-slate-100 rounded-full p-2 shadow-lg"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <label className="text-slate-500 text-md">
                                                    {" "}
                                                    Notes
                                                </label>
                                                <ul>
                                                    {notes.length === 0 ||
                                                    !notes ? (
                                                        <div className="w-full flex justify-center flex-col items-center">
                                                            <img
                                                                className="w-fit"
                                                                src={require("../../assets/img/no-files.png")}
                                                            ></img>
                                                            no notes
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}

                                                    {notes.map((note, id) => {
                                                        return (
                                                            <li
                                                                key={id}
                                                                className="flex flex-row justify-between items-center my-1"
                                                            >
                                                                {note}
                                                                <button
                                                                    onClick={(
                                                                        event
                                                                    ) => {
                                                                        delete_note(
                                                                            event,
                                                                            note
                                                                        );
                                                                    }}
                                                                >
                                                                    <i className="fa-solid fa-trash mx-4 hover:text-red-600 font-bold border-1 border-slate-100 rounded-full p-2 shadow-lg"></i>
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
