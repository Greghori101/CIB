import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

// components

export default function OrderForm({ action, data, getEmployees, hide }) {
    const token = window.localStorage.getItem("token");
    const url = process.env.REACT_APP_GSM_API_URL;
    const method = action === "add" ? "post" : "put";
    const role = window.localStorage.getItem("role");
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [gender, setGender] = React.useState("male");
    const [phone_number, setPhoneNumber] = React.useState("");
    const navigate = useNavigate();

    const add_employee = (event) => {
        event.preventDefault();
        axios({
            // Endpoint to send files
            url: url + "/orders",
            method: method,
            data: {
                role: role,
                employee_role: "student",
                email,
                name,
                phone_number,
                gender,
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
                getEmployees();
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
            <div className="rounded-t-2xl px-4 py-2 bg-white mb-0 align-middle">
                <div className="text-center flex justify-between">
                    <h6 className="text-slate-700 text-xl font-bold uppercase">
                        {action} Employee
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
                        Employee Information
                    </h6>
                    <div className="flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="relative w-full mb-3">
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
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Email"
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                    value={email}
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Gender
                                </label>
                                <select
                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    default="male"
                                    onChange={(event) => {
                                        setGender(event.target.value);
                                    }}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Phone Number"
                                    onChange={(event) => {
                                        setPhoneNumber(event.target.value);
                                    }}
                                    value={phone_number}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className=" text-white bg-sky-600 active:bg-sky-700 font-bold capitalize text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={(event) => add_employee(event)}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
