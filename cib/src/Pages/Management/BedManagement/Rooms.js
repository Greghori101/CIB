import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { ReactComponent as Icon } from "../../../assets/img/no-result.svg";
import RoomForm from "../../../Components/Forms/RoomForm";

export default function Rooms() {
    const token = window.localStorage.getItem("token");
    const url = process.env.REACT_APP_GSM_API_URL;
    const [form, setForm] = useState(false);
    const [room, setRoom] = React.useState({});
    const [method, setMethod] = useState("add");
    const navigate = useNavigate();
    const [rooms, setRooms] = React.useState([]);

    const getRooms = async () => {
        let options = {
            method: "get",
            url: url + "/rooms",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        };
        axios(options)
            .then((response) => {
                setRooms(response.data);
            })
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
                } else if (error.response) {
                } else if (error.response.status === 403) {
                    Swal.fire({
                        title: "Please verify your email",
                        text: "You are not verified press ok to verify your email",
                        icon: "error",
                    }).then(() => {
                        navigate("/email.verify");
                    });
                } else {
                    Swal.fire({
                        title: error.response?.statusText,
                        text: error.response.data.message,
                        icon: "error",
                    });
                }
            });
    };

    const showForm = (action, data) => {
        document.body.style.overflow = "hidden";
        setMethod(action);
        setRoom(data);
        setForm(true);
    };
    const hide = () => {
        document.body.style.overflow = "auto";
        setForm(false);
    };
    const destroy = (id) => {
        axios({
            // Endpoint to send files
            url: url + "/rooms/" + id,
            method: "delete",
            headers: {
                Accept: "Application/json",
                Authorization: "Bearer " + token,
            },
        })
            // Handle the response from backend here
            .then((response) => {
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
        getRooms();
    }, []);

    return (
        <>
            {form ? (
                <div className="fixed bg-black bg-opacity-25 top-0 left-0 z-50 w-full h-screen flex justify-center align-middle items-center overflow-auto py-4">
                    <RoomForm
                        action={method}
                        data={room}
                        hide={hide}
                        getRooms={getRooms}
                    ></RoomForm>
                </div>
            ) : (
                ""
            )}
            <section className="py-3">
                <div className="container">
                    <div className="row ">
                        <div className="card relative w-full my-2 mb-4 py-2 bg-slate-200">
                            <div className="flex w-full justify-between align-middle items-center mb-4 z-10 ">
                                <h4>Room Table</h4>
                                <div>
                                    <form className="flex flex-row ">
                                        <div className="border-0  placeholder-slate-300 text-slate-600 bg-white rounded-full text-sm shadow  w-full ease-linear transition-all duration-150 m-2 h-fit py-2 px-4">
                                            <input
                                                className="focus:outline-none"
                                                type="text"
                                            ></input>
                                            <button>
                                                <i className="fa-solid fa-search"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <Link
                                        className="bg-white shadow-lg px-4 py-2 my-2 rounded hover:cursor-pointer hover:scale-105 hover:bg-slate-100 transition-all duration-200  mx-4 "
                                        onClick={() => {
                                            showForm("add");
                                        }}
                                    >
                                        <i className="fa-solid fa-plus text-xl mr-2"></i>
                                        Add Room
                                    </Link>
                            {rooms.length === 0 ? (
                                <div className="flex w-full justify-center items-center flex-col mb-2">
                                    <Icon />

                                    <h2 className="mt-4">No Result Found</h2>
                                    <spam className="max-w-lg text-center">
                                        Please try again or more generic word,
                                        If there is no data yet inserted please
                                        click the link to{" "}
                                        <Link
                                            className="underline"
                                            onClick={() => {
                                                showForm("add");
                                            }}
                                        >
                                            add room
                                        </Link>{" "}
                                    </spam>
                                </div>
                            ) : (
                                <div
                                    className={
                                        "relative flex flex-row  break-words w-full mb-6 flex-wrap"
                                    }
                                >
                                    {/* Projects table */}

                                    {rooms.map((room, id) => {
                                        return (
                                            <div className="text-md !w-1/4">
                                                <div className="bg-slate-50 rounded-lg px-2 py-4 m-2  shadow-lg flex flex-col">
                                                    <div>
                                                        <label>Room: </label>{" "}
                                                        {room.name}
                                                    </div>
                                                    <div>
                                                        <label>
                                                            bed capacity:{" "}
                                                        </label>{" "}
                                                        {room.nb_bed}
                                                    </div>
                                                    <div>
                                                        <label>
                                                            Room Number:{" "}
                                                        </label>{" "}
                                                        {room.number}
                                                    </div>
                                                    <div className="flex flex-row items-center justify-around w-1/3 !place-self-end ">
                                                        <Link
                                                            role={"button"}
                                                            onClick={() => {
                                                                showForm(
                                                                    "edit",
                                                                    room
                                                                );
                                                            }}
                                                            className="hover:text-yellow-400 transition duration-150 ease-in-out "
                                                        >
                                                            <i class="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                        <Link
                                                            role={"button"}
                                                            onClick={() =>
                                                                destroy(room.id)
                                                            }
                                                            className="hover:text-red-600 transition duration-150 ease-in-out"
                                                        >
                                                            <i class="fa-solid fa-trash"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
