import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

// components

export default function RoomForm({ getRooms, hide }) {
    const token = window.localStorage.getItem("token");
    const url = process.env.REACT_APP_GSM_API_URL;
    const [name, setName] = React.useState("");
    const [number, setNumber] = React.useState("");
    const [nb_bed, setNbBed] = React.useState("");
    const navigate = useNavigate();
    const [bed, setBed] = useState("");
    const [beds, setBeds] = useState([]);

    const add_bed = (event) => {
        event.preventDefault();
        if (bed) {
            let temp = [...beds, bed];
            setBeds(temp);
        }
    };
    const delete_bed = (event, id) => {
        event.preventDefault();
        var temp = [...beds];
        temp.splice(id, 1);

        setBeds(temp);
    };
    const submit = (event) => {
        event.preventDefault();
        axios({
            // Endpoint to send files
            url: url + "/rooms",
            method: "post",
            data: {
                number,
                nb_bed,
                name,
                beds,
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
                getRooms();
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
            className="relative flex flex-col max-w-[70%] break-words w-full bg-slate-100  shadow-lg rounded-2xl border-0 m-auto"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="rounded-t-2xl px-4 py-4 mb-0 align-middle">
                <div className="text-center flex justify-between">
                    <h6 className="text-slate-700 text-xl font-bold uppercase">
                        Create Room
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
                        Room Information
                    </h6>
                    <div className="flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="relative w-full mb-3">
                                <label
                                    className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    number
                                </label>
                                <input
                                    type="number"
                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Name"
                                    onChange={(event) => {
                                        setNumber(event.target.value);
                                    }}
                                    value={number}
                                />
                            </div><div className="relative w-full mb-3">
                                <label
                                    className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Name"
                                    onChange={(event) => {
                                        setName(event.target.value);
                                    }}
                                    value={name}
                                />
                            </div><div className="relative w-full mb-3">
                                <label
                                    className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Number of Beds
                                </label>
                                <input
                                    type="number"
                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Name"
                                    onChange={(event) => {
                                        setNbBed(event.target.value);
                                    }}
                                    value={nb_bed}
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <h5>All Beds</h5>

                                <div className=" border border-slate-600 rounded-2xl px-4 my-2 py-2 ">
                                    <div className="mb-4 ">
                                        <label className="text-slate-500 text-md">
                                            {" "}
                                            Create Bed
                                        </label>
                                        <div className="flex flex-row">
                                            <input
                                                value={bed}
                                                onChange={(event) => {
                                                    setBed(event.target.value);
                                                }}
                                                type="text"
                                                className="form-control"
                                                placeholder="chief doctor"
                                            />

                                            <button
                                                onClick={(event) => {
                                                    add_bed(event);
                                                }}
                                            >
                                                <i className="fa-solid fa-add ml-4 hover:text-blue-600 font-bold border-1 bg-white rounded-full p-2 shadow-lg"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Beds
                                            </label>
                                            <ul>
                                                {beds.length === 0 || !beds ? (
                                                    <div className="w-full flex justify-center flex-col items-center">
                                                        <img
                                                            className="w-fit"
                                                            src={require("../../assets/img/no-files.png")}
                                                        ></img>
                                                        no beds
                                                    </div>
                                                ) : (
                                                    ""
                                                )}

                                                {beds.map((bed, id) => {
                                                    return (
                                                        <li
                                                            key={id}
                                                            className="flex flex-row justify-between items-center my-2 bg-white rounded-xl p-2 "
                                                        >
                                                            {bed}
                                                            <button
                                                                onClick={(
                                                                    event
                                                                ) => {
                                                                    delete_bed(
                                                                        event,
                                                                        id
                                                                    );
                                                                }}
                                                            >
                                                                <i className="fa-solid fa-trash ml-4 hover:text-red-600 font-bold border-1 border-slate-100 rounded-full p-2 shadow-lg"></i>
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
