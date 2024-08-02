import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AppointmentForm() {
    const url = process.env.REACT_APP_GRDV_API_URL;
    const token = window.localStorage.getItem("token");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [prescription, setPrescription] = useState("");
    const [message, setMessage] = useState("");
    const [agreed, setAgreed] = useState(true);
    let navigate = useNavigate();

    const submit = (event) => {
        event.preventDefault();
        if (agreed) {
            axios({
                // Endpoint to send files
                url: url + "/appointments",
                method: "post",
                data: {
                    firstname,
                    lastname,
                    email,
                    phone_number,
                    prescription,
                    message,
                },
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                // Handle the response from backend here
                .then((response) => {
                    Swal.fire({
                        icon: "success",
                        title: "Appointment request schedule",
                        text: "thank you for chosing us we'll contact you as soon as possible ",
                        iconColor: "#3dc00c",
                    });
                })

                // Catch errors if any
                .catch((error) => {
                    if (error.response?.status === 401) {
                        Swal.fire({
                            title: "Please sign in",
                            text: "You are not signed in",
                            icon: "error",
                        }).then(() => {
                            window.localStorage.clear();
                            navigate("/login");
                        });
                    } else if (error.response?.status === 500) {
                        navigate("/500");
                    } else {
                        if (error.response) {
                            Swal.fire({
                                title: error.response?.statusText,
                                text: error.response?.data.message,
                                icon: "error",
                            });
                        } else {
                            Swal.fire({
                                title: "Request failed",
                                text: "network error failed to load response",
                                icon: "error",
                            });
                        }
                    }
                });
        } else {
            Swal.fire({
                title: "Terms and Conditions",
                text: "you must agreed to our terms and conditions",
                icon: "error",
            });
        }
    };

    useEffect(() => {}, []);

    return (
        <section className>
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="row align-items-center">
                            <div className="mx-auto text-center">
                                <div className="ms-3 mb-md-5">
                                    <h3>Request Appointment Now!</h3>
                                    <p>
                                        Make an Appointment Please fill out this
                                        form.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mx-auto">
                                <div className="card card-plain">
                                    <form autoComplete="off">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label className="text-slate-500 text-md">
                                                        {" "}
                                                        First Name
                                                    </label>
                                                    <div className="input-group mb-4">
                                                        <input
                                                            value={firstname}
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                setFirstname(
                                                                    event.target
                                                                        .value
                                                                );
                                                            }}
                                                            className="form-control"
                                                            placeholder="firstname"
                                                            aria-label="First Name..."
                                                            type="text"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 ps-2">
                                                    <label className="text-slate-500 text-md">
                                                        {" "}
                                                        Last Name
                                                    </label>
                                                    <div className="input-group mb-4">
                                                        <input
                                                            value={lastname}
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                setLastname(
                                                                    event.target
                                                                        .value
                                                                );
                                                            }}
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="lastname"
                                                            aria-label="Last Name..."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="text-slate-500 text-md">
                                                    {" "}
                                                    Email Address
                                                </label>
                                                <div className="input-group">
                                                    <input
                                                        value={email}
                                                        onChange={(event) => {
                                                            setEmail(
                                                                event.target
                                                                    .value
                                                            );
                                                        }}
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Email"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="text-slate-500 text-md">
                                                    {" "}
                                                    Phone Number
                                                </label>
                                                <div className="input-group">
                                                    <input
                                                        value={phone_number}
                                                        onChange={(event) => {
                                                            setPhoneNumber(
                                                                event.target
                                                                    .value
                                                            );
                                                        }}
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Phone Number"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="text-slate-500 text-md">
                                                    Letter (only Pdf and
                                                    Images png or jpg)
                                                </label>
                                                <div className="input-group">
                                                    <input
                                                        onChange={(event) => {
                                                            setPrescription(
                                                                event.target
                                                                    .files[0]
                                                            );
                                                        }}
                                                        type="file"
                                                        accept="application/pdf,image/*"
                                                        className="form-control"
                                                        placeholder="letter"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group mb-4">
                                                <label className="text-slate-500 text-md">
                                                    {" "}
                                                    Your message
                                                </label>
                                                <textarea
                                                    value={message}
                                                    onChange={(event) => {
                                                        setMessage(
                                                            event.target.value
                                                        );
                                                    }}
                                                    name="message"
                                                    className="form-control"
                                                    placeholder="Type here"
                                                    id="message"
                                                    rows={6}
                                                    defaultValue={""}
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-check form-switch mb-4">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="flexSwitchCheckDefault"
                                                            defaultChecked
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                setAgreed(
                                                                    !agreed
                                                                );
                                                            }}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexSwitchCheckDefault"
                                                        >
                                                            I agree to the{" "}
                                                            <a
                                                                href="javascript:;"
                                                                className="text-dark"
                                                            >
                                                                <u>
                                                                    Terms and
                                                                    Conditions
                                                                </u>
                                                            </a>
                                                            .
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <button
                                                        type="submit"
                                                        className="btn bg-gradient-info w-100"
                                                        onClick={(event) => {
                                                            submit(event);
                                                        }}
                                                    >
                                                        Send Appointment Request
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-0 my-4 col-md-6">
                        <div className="blur-shadow-image text-center">
                            <img
                                src={require("../../assets/img/appointment-bg.jpg")}
                                alt="img-blur-shadow"
                                className="img-fluid shadow border-radius-lg max-h-[900px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
