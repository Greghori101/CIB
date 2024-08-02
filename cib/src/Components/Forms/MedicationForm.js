import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import SelectOption from "../Dropdowns/SelectOption";

// components

export default function MedicationForm({ action, data, getMedications, hide }) {
    const token = window.localStorage.getItem("token");
    const url_gsm = process.env.REACT_APP_GSM_API_URL;
    const method = action === "add" ? "post" : "put";
    const [name, setName] = React.useState("");
    const [class_pharmacological, setClassPharmacological] = React.useState("");
    const [class_therapeutic, setClassTherapeutic] = React.useState("");
    const [generic, setGeneric] = React.useState("");
    const [commercial_name, setCommercialName] = React.useState("");
    const [dosage, setDosage] = React.useState("");
    const [form, setForm] = React.useState("");
    const [quantity, setQuantity] = React.useState(0);
    const [conditioning, setConditioning] = React.useState("");
    const navigate = useNavigate();

    const add_medication = async (event) => {
        event.preventDefault();
        await axios({
            url: url_gsm + "/medications",
            method: method,
            data: {
                name,
                class_pharmacological,
                conditioning,
                dosage,
                class_therapeutic,
                generic,
                commercial_name,
                form,
                quantity,
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
                getMedications();
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
        <div className="flex-auto px-4 pb-4">
            <form>
                <h6 className="text-slate-400 text-sm my-2 font-bold uppercase">
                    Medication Information
                </h6>
                <div className="flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                class pharmacological
                            </label>
                            <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="class pharmacological"
                                onChange={(event) => {
                                    setClassPharmacological(event.target.value);
                                }}
                                value={class_pharmacological}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                class therapeutic
                            </label>
                            <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="class therapeutic"
                                onChange={(event) => {
                                    setClassTherapeutic(event.target.value);
                                }}
                                value={class_therapeutic}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                form
                            </label>
                            <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="form"
                                onChange={(event) => {
                                    setForm(event.target.value);
                                }}
                                value={form}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                name
                            </label>
                            <input
                                type="name"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="name"
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
                                conditionning
                            </label>
                            <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="conditionning"
                                onChange={(event) => {
                                    setConditioning(event.target.value);
                                }}
                                value={conditioning}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Dosage
                            </label>
                            <input
                                type="number"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Dosage"
                                onChange={(event) => {
                                    setDosage(event.target.value);
                                }}
                                value={dosage}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                generic
                            </label>
                            <input
                                type="date"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="generic"
                                onChange={(event) => {
                                    setGeneric(event.target.value);
                                }}
                                value={generic}
                            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label
                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                commercial name
                            </label>
                            <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="commercial name"
                                onChange={(event) => {
                                    setCommercialName(event.target.value);
                                }}
                                value={commercial_name}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        className=" text-white bg-sky-600 active:bg-sky-700 font-bold capitalize text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={(event) => add_medication(event)}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
