/*eslint-disable*/
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UserDropdown from "../Dropdowns/UserDropdown";
import GoogleTranslate from "../../GoogleTranslate";
// components

export default function IndexNavbar(props) {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const token = window.localStorage.getItem("token");

    const navigate = useNavigate();

    return (
        <div className=" bg-white m-0 shadow-lg">
            <div className="container ">
                <nav className="flex flex-row justify-between items-center py-3  ">
                    <Link
                        className="flex m-0 flex-nowrap items-center w-42"
                        to={"/"}
                    >
                        <img
                            src={require("../../assets/img/logo.png")}
                            className="mr-4 rounded-full w-12"
                            alt=""
                        />
                        Clinic Abdel-Hamid Ibn Badis
                    </Link>
                    <button
                        className="cursor-pointer text-nowrap text-black opacity-50 lg:hidden px-3 py-1 text-xl leading-none bg-transparent border-transparent"
                        type="button"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <div
                        className="hidden lg:flex justify-end w-100 p-0 py-lg-0 items-center "
                        id="navigation"
                    >
                        <ul className="flex  z-50 items-center m-0 h-12 flex-nowrap overflow-auto max-w-xl scrollbar-hidden p-0">
                            <li className="hover:border-b-4 border-b-2  hover:border-blue-500  h-full flex items-center px-3 transition-all ease-linear  duration-200">
                                <Link
                                    className="text-slate-950 cursor-pointer text-nowrap"
                                    to={"/news"}
                                >
                                    Latest News
                                </Link>
                            </li>
                            <li className="hover:border-b-4 border-b-2  hover:border-blue-500  h-full flex items-center px-3 transition-all ease-linear  duration-200">
                                <Link
                                    className="text-slate-950 cursor-pointer text-nowrap"
                                    to={"/services"}
                                >
                                    Our Services
                                </Link>
                            </li>
                            <li className="hover:border-b-4 border-b-2  hover:border-blue-500  h-full flex items-center px-3 transition-all ease-linear  duration-200">
                                <Link
                                    className="text-slate-950 cursor-pointer text-nowrap"
                                    to={"/appointment/form"}
                                >
                                    Make Appointment
                                </Link>
                            </li>
                            <li className="hover:border-b-4 border-b-2  hover:border-blue-500  h-full flex items-center px-3 transition-all ease-linear  duration-200">
                                <Link
                                    className="text-slate-950 cursor-pointer text-nowrap"
                                    to={"/services/palnning"}
                                >
                                    Planning
                                </Link>
                            </li>
                            <li className="hover:border-b-4 border-b-2  hover:border-blue-500  h-full flex items-center px-3 transition-all ease-linear  duration-200">
                                <Link
                                    className="text-slate-950 cursor-pointer text-nowrap"
                                    to={"/about"}
                                >
                                    About Us
                                </Link>
                            </li>
                            <li className="hover:border-b-4 border-b-2  hover:border-blue-500  h-full flex items-center px-3 transition-all ease-linear  duration-200">
                                <Link
                                    className="text-slate-950 cursor-pointer text-nowrap  "
                                    to={"/contact"}
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                        <ul className="m-0 flex flex-row items-center">
                            {token ? (
                                <li>
                                    <UserDropdown />
                                </li>
                            ) : (
                                <>
                                    <li className="">
                                        <GoogleTranslate />
                                    </li>
                                    <li>
                                        <button
                                            className="btn mb-0 cursor-pointer text-nowrap bg-gradient-info"
                                            onClick={() => {
                                                navigate("/login");
                                            }}
                                        >
                                            Login
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}
