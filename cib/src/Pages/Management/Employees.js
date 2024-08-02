import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import EmployeeForm from "../../Components/Forms/EmployeeForm";
import { ReactComponent as Icon } from "../../assets/img/no-result.svg";

export default function Employees() {
    const token = window.localStorage.getItem("token");
    const url = process.env.REACT_APP_MED_GUARD_API_URL;
    const role = window.localStorage.getItem("role");
    const [form, setForm] = useState(false);
    const [employee, setEmployee] = React.useState({});
    const [method, setMethod] = useState("add");
    const navigate = useNavigate();
    const [employees, setEmployees] = React.useState([]);

    const getEmployees = async () => {
        let options = {
            method: "get",
            url: url + "/users",
            params: {
                role: role,
            },
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        };
        axios(options)
            .then((response) => {
                setEmployees(response.data);
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
        setEmployee(data);
        setForm(true);
    };
    const hide = () => {
        document.body.style.overflow = "auto";
        setForm(false);
    };
    const destroy = (id) => {
        axios({
            // Endpoint to send files
            url: url + "/users/" + id,
            method: "delete",
            params: {
                role: role,
            },
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
                getEmployees();
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
        console.log(employees);
        getEmployees();
    }, []);

    return (
        <>
            {form ? (
                <div className="fixed bg-black bg-opacity-25 top-0 left-0 z-50 w-full h-screen flex justify-center align-middle items-center overflow-auto py-4">
                    <EmployeeForm
                        action={method}
                        data={employee}
                        hide={hide}
                        getEmployees={getEmployees}
                    ></EmployeeForm>
                </div>
            ) : (
                ""
            )}
            <section className="py-3">
                <div className="container">
                    <div className="row ">
                        <div className="card relative w-full my-2 mb-4 py-2 bg-slate-200">
                            <div className="flex w-full justify-between align-middle items-center mb-4 z-10 ">
                                <h4>Employee Table</h4>
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
                            {employees.length === 0 ? (
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
                                            add employee
                                        </Link>{" "}
                                    </spam>
                                </div>
                            ) : (
                                <div
                                    className={
                                        "relative flex flex-col  break-words w-full mb-6 shadow-lg rounded bg-white"
                                    }
                                >
                                    {/* Projects table */}

                                    <table className="items-center w-full bg-transparent border-collapse">
                                        <thead>
                                            <tr>
                                                <th
                                                    className={
                                                        " rounded-tl  px-4 align-middle border-b border-solid py-3 text-xs capitalize border-l-0 border-r-0  font-semibold text-left bg-slate-50 text-slate-500 border-slate-100"
                                                    }
                                                >
                                                    national id
                                                </th>
                                                <th
                                                    className={
                                                        "px-4 align-middle border-b border-solid py-3 text-xs capitalize border-l-0 border-r-0  font-semibold text-left bg-slate-50 text-slate-500 border-slate-100"
                                                    }
                                                >
                                                    name
                                                </th>
                                                <th
                                                    className={
                                                        "px-4 align-middle border-b border-solid py-3 text-xs capitalize border-l-0 border-r-0  font-semibold text-left bg-slate-50 text-slate-500 border-slate-100"
                                                    }
                                                >
                                                    role
                                                </th>
                                                <th
                                                    className={
                                                        "px-4 align-middle border-b border-solid py-3 text-xs capitalize border-l-0 border-r-0  font-semibold text-left bg-slate-50 text-slate-500 border-slate-100"
                                                    }
                                                >
                                                    email
                                                </th>
                                                <th
                                                    className={
                                                        "rounded-tr px-4 align-middle border-b border-solid py-3 whitespace-nowrap text-xs capitalize border-l-0 border-r-0  font-semibold text-left bg-slate-50 text-slate-500 border-slate-100"
                                                    }
                                                >
                                                    Add
                                                    <Link
                                                        className="!ml-4 text-slate-600 ease-linear transition-all duration-150 hover:text-green-500"
                                                        role={"button"}
                                                        onClick={() => {
                                                            showForm("add");
                                                        }}
                                                    >
                                                        <i class="fa-solid fa-plus"></i>
                                                    </Link>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employees.map((employee, id) => {
                                                return (
                                                    <tr key={id}>
                                                        <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs  p-4 text-left flex items-center">
                                                            <span
                                                                className={
                                                                    "ml-3 font-bold text-slate-600"
                                                                }
                                                            >
                                                                {
                                                                    employee.national_id
                                                                }
                                                            </span>
                                                        </th>
                                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs  p-4">
                                                            {employee.firstname}{" "}
                                                            {employee.lastname}
                                                        </td>
                                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs  p-4">
                                                            {employee.role}
                                                        </td>
                                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs  p-4">
                                                            {employee.email}
                                                        </td>
                                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs  p-4 flex justify-around">
                                                            <Link
                                                                role={"button"}
                                                                onClick={() => {
                                                                    showForm(
                                                                        "edit",
                                                                        employee
                                                                    );
                                                                }}
                                                                className="hover:text-yellow-400 transition duration-150 ease-in-out "
                                                            >
                                                                <i class="fa-solid fa-pen-to-square"></i>
                                                            </Link>
                                                            <Link
                                                                role={"button"}
                                                                onClick={() =>
                                                                    destroy(
                                                                        employee.id
                                                                    )
                                                                }
                                                                className="hover:text-red-600 transition duration-150 ease-in-out"
                                                            >
                                                                <i class="fa-solid fa-trash"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
