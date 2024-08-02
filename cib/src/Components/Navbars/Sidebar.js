/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    let location = useLocation();
    const [role, setRole] = useState("admin");
    useEffect(() => {
        setRole(window.localStorage.getItem("role"));
    }, []);
    return (
        <>
            <div className="h-screen fixed w-72">
                <aside className="inset-0 z-50 my-[1rem] bg-white h-[calc(100vh-32px)] w-64 rounded-2xl transition-transform duration-300  px-4 py-4 shadow-xl mx-auto">
                    <header className="min-w-full block pb-4 mb-4 border-b border-solid border-slate-200 px-2">
                        <div className="flex flex-wrap ">
                            <Link
                                className="flex m-0 flex-nowrap items-center "
                                to={"/"}
                            >
                                <img
                                    src={require("../../assets/img/logo.png")}
                                    className="mr-4 rounded-full w-12"
                                    alt=""
                                />
                                Clinic Abdel-Hamid Ibn Badis
                            </Link>
                        </div>
                    </header>
                    <div className=" overflow-auto h-[calc(100vh-175px)]">
                        {/* Heading */}
                        <h6 className="md:min-w-full text-slate-500 text-xs capitalize font-bold block  no-underline">
                            Main pages
                        </h6>
                        <ul className="m-0 p-2">
                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs capitalize py-3 font-bold block rounded-lg px-2 " +
                                        (location.pathname == "/dashboard"
                                            ? "text-white hover:bg-blue-500 bg-sky-500"
                                            : "text-slate-700 hover:text-slate-500")
                                    }
                                    to="/dashboard"
                                >
                                    <i
                                        className={
                                            "fa-solid w-8 fa-tv mr-2 text-sm " +
                                            (location.pathname == "/dashboard"
                                                ? ""
                                                : "text-slate-300")
                                        }
                                    ></i>{" "}
                                    Dashboard
                                </Link>
                            </li>
                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs capitalize py-3 font-bold block rounded-lg px-2 " +
                                        (location.pathname == "/patients"
                                            ? "text-white hover:bg-blue-500 bg-sky-500"
                                            : "text-slate-700 hover:text-slate-500")
                                    }
                                    to="/patients"
                                >
                                    <i
                                        className={
                                            "fa-solid w-8 fa-user-injured mr-2 text-sm " +
                                            (location.pathname == "/patients"
                                                ? ""
                                                : "text-slate-300")
                                        }
                                    ></i>{" "}
                                    Patients
                                </Link>
                            </li>
                            {role === "admin" ? (
                                <li className="items-center">
                                    <Link
                                        className={
                                            "text-xs capitalize py-3 font-bold block rounded-lg px-2 " +
                                            (location.pathname == "/employees"
                                                ? "text-white hover:bg-blue-500 bg-sky-500"
                                                : "text-slate-700 hover:text-slate-500")
                                        }
                                        to="/employees"
                                    >
                                        <i
                                            className={
                                                "fa-solid w-8 fa-user-tie mr-2 text-sm " +
                                                (location.pathname ==
                                                "/employees"
                                                    ? ""
                                                    : "text-slate-300")
                                            }
                                        ></i>{" "}
                                        employees
                                    </Link>
                                </li>
                            ) : (
                                ""
                            )}
                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs capitalize py-3 font-bold block rounded-lg px-2 " +
                                        (location.pathname.includes(
                                            "/dashboard/services"
                                        )
                                            ? "text-white hover:bg-blue-500 bg-sky-500"
                                            : "text-slate-700 hover:text-slate-500")
                                    }
                                    to="/dashboard/services"
                                >
                                    <i
                                        className={
                                            "fa-solid w-8  fa-hospital mr-2 text-sm " +
                                            (location.pathname.includes(
                                                "/dashboard/services"
                                            )
                                                ? ""
                                                : "text-slate-300")
                                        }
                                    ></i>{" "}
                                    services
                                </Link>
                            </li>
                            {role === "admin" ? (
                                <li className="items-center">
                                    <Link
                                        className={
                                            "text-xs capitalize py-3 font-bold block rounded-lg px-2 " +
                                            (location.pathname.includes(
                                                "/management"
                                            )
                                                ? "text-white hover:bg-blue-500 bg-sky-500"
                                                : "text-slate-700 hover:text-slate-500")
                                        }
                                        to="/management"
                                    >
                                        <i
                                            className={
                                                "fa-solid w-8 fa-gear mr-2 text-sm " +
                                                (location.pathname.includes(
                                                    "/management"
                                                )
                                                    ? ""
                                                    : "text-slate-300")
                                            }
                                        ></i>{" "}
                                        management
                                    </Link>
                                </li>
                            ) : (
                                ""
                            )}
                            {role === "admin" ? (
                                <li className="items-center">
                                    <Link
                                        className={
                                            "text-xs capitalize py-3 font-bold block rounded-lg px-2 " +
                                            (location.pathname ==
                                            "/dashboard/appointments"
                                                ? "text-white hover:bg-blue-500 bg-sky-500"
                                                : "text-slate-700 hover:text-slate-500")
                                        }
                                        to="/dashboard/appointments"
                                    >
                                        <i
                                            className={
                                                "fa-solid w-8 fa-calendar-check mr-2 text-sm " +
                                                (location.pathname ==
                                                "/dashboard/appointments"
                                                    ? ""
                                                    : "text-slate-300")
                                            }
                                        ></i>{" "}
                                        appointments
                                    </Link>
                                </li>
                            ) : (
                                ""
                            )}
                            {role === "doctor" ? (
                                <li className="items-center">
                                    <Link
                                        className={
                                            "text-xs capitalize py-3 font-bold block rounded-lg px-2 " +
                                            (location.pathname.includes(
                                                "/hospitalizations"
                                            )
                                                ? "text-white hover:bg-blue-500 bg-sky-500"
                                                : "text-slate-700 hover:text-slate-500")
                                        }
                                        to="/hospitalizations"
                                    >
                                        <i
                                            className={
                                                "fa-solid w-8 fa-bed-pulse mr-2 text-sm " +
                                                (location.pathname.includes(
                                                    "/hospitalizations"
                                                )
                                                    ? ""
                                                    : "text-slate-300")
                                            }
                                        ></i>{" "}
                                        hospitalizations
                                    </Link>
                                </li>
                            ) : (
                                ""
                            )}
                            {role === "doctor" ? (
                                <>
                                    {" "}
                                    <li className="items-center">
                                        <Link
                                            className={
                                                "text-xs capitalize py-3 font-bold block rounded-lg px-2 " +
                                                (location.pathname == "/orders"
                                                    ? "text-white hover:bg-blue-500 bg-sky-500"
                                                    : "text-slate-700 hover:text-slate-500")
                                            }
                                            to="/orders"
                                        >
                                            <i
                                                className={
                                                    "fa-solid w-8 fa-clipboard-list mr-2 text-sm " +
                                                    (location.pathname ==
                                                    "/orders"
                                                        ? ""
                                                        : "text-slate-300")
                                                }
                                            ></i>{" "}
                                            orders
                                        </Link>
                                    </li>
                                    <li className="items-center">
                                        <Link
                                            className={
                                                "text-xs capitalize py-3 font-bold block rounded-lg px-2 " +
                                                (location.pathname == "/reports"
                                                    ? "text-white hover:bg-blue-500 bg-sky-500"
                                                    : "text-slate-700 hover:text-slate-500")
                                            }
                                            to="/reports"
                                        >
                                            <i
                                                className={
                                                    "fa-solid w-8 fa-file-signature mr-2 text-sm " +
                                                    (location.pathname ==
                                                    "/reports"
                                                        ? ""
                                                        : "text-slate-300")
                                                }
                                            ></i>{" "}
                                            reports
                                        </Link>
                                    </li>
                                    <li className="items-center">
                                        <Link
                                            className={
                                                "text-xs capitalize py-3 font-bold block rounded-lg px-2 " +
                                                (location.pathname ==
                                                "/pharmacy"
                                                    ? "text-white hover:bg-blue-500 bg-sky-500"
                                                    : "text-slate-700 hover:text-slate-500")
                                            }
                                            to="/pharmacy"
                                        >
                                            <i
                                                className={
                                                    "fa-solid w-8 fa-pills mr-2 text-sm " +
                                                    (location.pathname ==
                                                    "/pharmacy"
                                                        ? ""
                                                        : "text-slate-300")
                                                }
                                            ></i>{" "}
                                            pharmacy
                                        </Link>
                                    </li>
                                    <li className="items-center">
                                        <Link
                                            className={
                                                "text-xs capitalize py-3 font-bold block rounded-lg px-2 " +
                                                (location.pathname == "/tasks"
                                                    ? "text-white hover:bg-blue-500 bg-sky-500"
                                                    : "text-slate-700 hover:text-slate-500")
                                            }
                                            to="/tasks"
                                        >
                                            <i
                                                className={
                                                    "fa-solid w-8 fa-file-pen mr-2 text-sm " +
                                                    (location.pathname ==
                                                    "/tasks"
                                                        ? ""
                                                        : "text-slate-300")
                                                }
                                            ></i>{" "}
                                            tasks
                                        </Link>
                                    </li>
                                    <li className="items-center">
                                        <Link
                                            className={
                                                "text-xs capitalize py-3 font-bold block rounded-lg px-2 " +
                                                (location.pathname.includes(
                                                    "tests"
                                                )
                                                    ? "text-white hover:bg-blue-500 bg-sky-500"
                                                    : "text-slate-700 hover:text-slate-500")
                                            }
                                            to="/tests"
                                        >
                                            <i
                                                className={
                                                    "fa-solid w-8 fa-paste mr-2 text-sm " +
                                                    (location.pathname.includes(
                                                        "tests"
                                                    )
                                                        ? ""
                                                        : "text-slate-300")
                                                }
                                            ></i>{" "}
                                            tests
                                        </Link>
                                    </li>
                                    <li className="items-center">
                                        <Link
                                            className={
                                                "text-xs capitalize py-3 font-bold block rounded-lg px-2 " +
                                                (location.pathname == "/scanner"
                                                    ? "text-white hover:bg-blue-500 bg-sky-500"
                                                    : "text-slate-700 hover:text-slate-500")
                                            }
                                            to="/scanner"
                                        >
                                            <i
                                                className={
                                                    "fa-solid w-8 fa-calendar-check mr-2 text-sm " +
                                                    (location.pathname ==
                                                    "/scanner"
                                                        ? ""
                                                        : "text-slate-300")
                                                }
                                            ></i>{" "}
                                            scan x-ray image
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                ""
                            )}

                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs capitalize py-3 font-bold block rounded-lg px-2 " +
                                        (location.pathname == "/planning"
                                            ? "text-white hover:bg-blue-500 bg-sky-500"
                                            : "text-slate-700 hover:text-slate-500")
                                    }
                                    to="/planning"
                                >
                                    <i
                                        className={
                                            "fa-solid w-8 fa-calendar mr-2 text-sm " +
                                            (location.pathname == "/planning"
                                                ? ""
                                                : "text-slate-300")
                                        }
                                    ></i>{" "}
                                    planning
                                </Link>
                            </li>
                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs capitalize py-3 font-bold block rounded-lg px-2 " +
                                        (location.pathname == "/dashboard/news"
                                            ? "text-white hover:bg-blue-500 bg-sky-500"
                                            : "text-slate-700 hover:text-slate-500")
                                    }
                                    to="/dashboard/news"
                                >
                                    <i
                                        className={
                                            "fa-solid w-8 fa-newspaper mr-2 text-sm " +
                                            (location.pathname ==
                                            "/dashboard/news"
                                                ? ""
                                                : "text-slate-300")
                                        }
                                    ></i>{" "}
                                    news
                                </Link>
                            </li>
                            {role === "admin" ? (
                                <li className="items-center">
                                    <Link
                                        className={
                                            "text-xs capitalize py-3 font-bold block rounded-lg px-2 " +
                                            (location.pathname.includes("inbox")
                                                ? "text-white hover:bg-blue-500 bg-sky-500"
                                                : "text-slate-700 hover:text-slate-500")
                                        }
                                        to="/inbox"
                                    >
                                        <i
                                            className={
                                                "fa-solid w-8 fa-inbox mr-2 text-sm " +
                                                (location.pathname.includes(
                                                    "inbox"
                                                )
                                                    ? ""
                                                    : "text-slate-300")
                                            }
                                        ></i>{" "}
                                        inbox
                                    </Link>
                                </li>
                            ) : (
                                ""
                            )}
                        </ul>
                    </div>
                </aside>
            </div>
        </>
    );
}
