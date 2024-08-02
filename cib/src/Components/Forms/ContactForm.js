import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ContactForm() {
    const url = process.env.REACT_APP_MED_GUARD_API_URL;
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [agreed, setAgreed] = useState(true);
    const [message, setMessage] = useState("");
    let navigate = useNavigate();

    const submit = (event) => {
        event.preventDefault();
        if (agreed) {
            Swal.fire({
                icon: "success",
                iconColor: "#3dc00c",
            });
            axios({
                // Endpoint to send files
                url: url + "/contact/messages/create",
                method: "post",
                data: {
                    firstname,
                    lastname,
                    email,
                    phone_number,
                    message,
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
                                    <h3>Contact us</h3>
                                    <p>
                                        For further questions, including
                                        partnership opportunities, please email
                                        hello@loopple.com or contact using our
                                        contact form.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mx-auto">
                                <div className="card card-plain">
                                    <form
                                        id="contact-form"
                                        method="post"
                                        autoComplete="off"
                                    >
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
                                                            placeholder="Firstname"
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
                                                            placeholder="Lastname"
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
                                                        placeholder="email"
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
                                                            <a className="text-dark">
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
                                                        onClick={(event) => {
                                                            submit(event);
                                                        }}
                                                        type="submit"
                                                        className="btn bg-gradient-info w-100"
                                                    >
                                                        Send Message
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
                                src={require("../../assets/img/contact-bg.jpg")}
                                alt="img-blur-shadow"
                                className="img-fluid shadow border-radius-lg max-height-700"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
