import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loaders/Loading";
import IndexNavbar from "../../Components/Navbars/IndexNavbar";
import Footer from "../../Components/Footers/Footer";

export default function Login() {
    const url = process.env.REACT_APP_MED_GUARD_API_URL;
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const token = window.localStorage.getItem("token");

    let navigate = useNavigate();

    const login = () => {
        let data = {
            email,
            password,
        };
        axios({
            // Endpoint to send files
            url: url + "/login",
            method: "POST",

            headers: {
                Accept: "Application/json",
            },

            // Attaching the form data
            data: data,
        })
            // Handle the response from backend here
            .then((response) => {
                setLoading(false);
                Swal.fire({ 
                    title: "Go to dashboard",
                    text: "You are successfuly logged in .",
                    icon: "success",
                    iconColor: "#3dc00c",
                }).then(async () => {
                    const imgUrl = `data:image/${response.data.user.profile_picture.extension};base64,${response.data.user.profile_picture.content}`;
                    window.localStorage.setItem("profile_picture_url", imgUrl);
                    window.localStorage.setItem("token", response.data.token);
                    window.localStorage.setItem("role", response.data.user.role);
                    window.localStorage.setItem(
                        "user_id",
                        response.data.user.id
                    );
                    navigate("/dashboard");
                });
            })

            // Catch errors if any
            .catch((error) => {
                setLoading(false);
                Swal.fire({
                    title: "Bad credentials!",
                    text: "Verify your email or password.",
                    icon: "error",
                });
            });
    };

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, []);

    return (
        <main className=" z-20 bg-opacity-40">
            <IndexNavbar />
            <section className="relative w-full h-full py-40 min-h-screen">
                <img
                    src={require("../../assets/img/bg-auth.jpg")}
                    className="absolute top-0 left-0 -z-20 brightness-95 blur-[2px] h-full w-full"
                ></img>
                <div className="container mx-auto px-4">
                    <div className="flex content-center  justify-center">
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg bg-gradient-to-t from-white to-slate-100 border-1 border-sky-100 py-4">
                                <div className="flex-auto px-4 lg:px-10">
                                    <div className="text-slate-400 text-center mb-3 font-bold">
                                        <h3>Sign In</h3>
                                    </div>
                                    <form>
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Email"
                                                onChange={(event) => {
                                                    setEmail(
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                        </div>

                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block capitalize text-slate-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Password"
                                                onChange={(event) => {
                                                    setPassword(
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                        </div>

                                        <div className="text-center mt-6">
                                            <button
                                                className="btn bg-gradient-info w-100"
                                                type="button"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setLoading(true);
                                                    login();
                                                }}
                                            >
                                                {loading ? (
                                                    <Loading
                                                        width="20px"
                                                        height={"20px"}
                                                        color="white"
                                                        weight={"2px"}
                                                    ></Loading>
                                                ) : (
                                                    ""
                                                )}
                                                Sign In
                                            </button>
                                        </div>
                                        <Link to={"/forgotpassword"}>
                                            <u>Forgot your password?</u>
                                        </Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
