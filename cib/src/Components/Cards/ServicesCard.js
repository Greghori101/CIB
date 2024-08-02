import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Icon } from "../../assets/img/camp.svg";
import Swal from "sweetalert2";
import ServiceForm from "../Forms/ServiceForm";

export default function ServicesCard() {
    const url = process.env.REACT_APP_GSM_API_URL;
    const token = window.localStorage.getItem("token");
    const role = window.localStorage.getItem("role");

    const navigate = useNavigate();
    const [form, setForm] = useState(false);
    const [service, setService] = useState(null);
    const [method, setMethod] = useState("add");
    const [services, setServices] = useState([]);

    const showForm = (action) => {
        document.body.style.overflow = "hidden";
        // setMethod(action);
        // setService(data);
        setForm(true);
    };
    const hide = () => {
        document.body.style.overflow = "auto";
        setForm(false);
    };
    const getServices = async () => {
        let options = {
            method: "get",
            url: url + "/services",
            headers: {
                Accept: "Application/json",
            },
        };
        await axios(options)
            .then((response) => {
                setServices(response.data);
            })
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

    useEffect(() => {
        getServices();
    }, []);

    return (
        <>
            {form ? (
                <div className="fixed bg-black bg-opacity-25 top-0 left-0 z-50 w-full h-screen flex justify-center align-middle items-center overflow-auto py-4">
                    <div
                        className="relative flex flex-col max-w-[70%] break-words w-full bg-slate-100  shadow-lg rounded-2xl border-0 m-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className=" px-4 pt-4 align-middle">
                            <div className="text-center flex justify-between">
                                <h6 className="text-slate-700 text-xl font-bold uppercase">
                                    Add Doctor
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
                        <ServiceForm
                            action={method}
                            data={service}
                            hide={hide}
                            getServices={getServices}
                        ></ServiceForm>
                    </div>
                </div>
            ) : (
                ""
            )}
            <section className="flex flex-col py-3">
               {role==="admin" ?  <Link
                    className="bg-white shadow-lg px-4 py-2 rounded hover:cursor-pointer hover:scale-105 hover:bg-slate-100 transition-all duration-200  mx-4 "
                    onClick={() => {
                        showForm("add");
                    }}
                >
                    <i className="fa-solid fa-plus text-xl mr-2"></i>
                    Create Service
                </Link>: ""}
                {services.length === 0 || !services ? (
                    <div className="flex flex-col bg-white rounded-xl py-6  justify-center items-center shadow-lg mx-4 my-2">
                        <Icon />

                        <h2 className="mt-4">No Result Found</h2>
                    </div>
                ) : (
                    ""
                )}
                <div className="container">
                    {services.map((service, id) => {
                        return (
                            <div className="row" key={id}>
                                <div className="w-full my-2 mb-4">
                                    <div className="relative card mb-2    !rounded-xl">
                                        <div className="absolute top-0 left-0 z-30 !bg-black/50 w-full h-full rounded-xl"></div>
                                        <img
                                            src={`data:image/${service.main_photo.extension};base64,${service.main_photo.content}`}
                                            className="absolute w-full h-full object-cover   rounded-xl"
                                        ></img>
                                        <div className=" card-body pt-8 z-40">
                                            <Link
                                                to={"/services/" + services.id}
                                                className="card-title h5 d-block "
                                            >
                                                <h1 className="!text-white">
                                                    {service.name}
                                                </h1>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body pt-3">
                                            <div className="flex flex-row text-sm">
                                                <div className="flex flex-col pt-4">
                                                    <h5 className="rounded bg-blue-500 text-white pl-2">
                                                        Contact
                                                    </h5>
                                                    <div className="flex flex-col justify-center p-4 pt-0">
                                                        <div className="flex flex-row items-center p-2 border-b-2 border-dotted">
                                                            <lable className="mr-2">
                                                                Tel:
                                                            </lable>
                                                            <b>
                                                                {
                                                                    service.phone_number
                                                                }
                                                            </b>
                                                        </div>
                                                        <div className="flex flex-row items-center p-2 border-b-2 border-dotted">
                                                            <lable className="mr-2">
                                                                Fax:
                                                            </lable>
                                                            <b>{service.fax}</b>
                                                        </div>
                                                        <div className="flex flex-row items-center p-2 border-b-2 border-dotted">
                                                            <lable className="mr-2">
                                                                Email:
                                                            </lable>
                                                            <b>
                                                                {service.email}
                                                            </b>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col p-4">
                                                    <h4>Presentation</h4>
                                                    <ul>
                                                        <li>
                                                            {" "}
                                                            chief doctor :
                                                            <b>
                                                                {
                                                                service.chief_doctor? 
                                                                    " "
                                                                    : " /"}
                                                                {
                                                                    service
                                                                        .chief_doctor
                                                                        ?.firstname
                                                                }
                                                            </b>{" "}
                                                            {
                                                                service
                                                                    .chief_doctor
                                                                    ?.specialization
                                                            }{" "}
                                                        </li>
                                                        <li>
                                                            Staff Medical :
                                                            <b>
                                                                {" "}
                                                                {
                                                                    service.medical_staff
                                                                }
                                                            </b>
                                                            .
                                                        </li>
                                                        <li>
                                                            Paramedical staff :{" "}
                                                            <b>
                                                                {
                                                                    service.paramedical_staff
                                                                }
                                                            </b>
                                                        </li>
                                                        <li>
                                                            Bed Capacity :
                                                            <b>
                                                                {" "}
                                                                {
                                                                    service.bed_capacity
                                                                }
                                                            </b>
                                                        </li>
                                                    </ul>
                                                    <h4>Service Activities</h4>
                                                    <ul>
                                                        {service.activities.map(
                                                            (activity, id) => {
                                                                return (
                                                                    <li>
                                                                        {
                                                                            activity.content
                                                                        }
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                    <h4>
                                                        Service Perspectives
                                                    </h4>
                                                    <ul>
                                                        {service.outlooks.map(
                                                            (outlook, id) => {
                                                                return (
                                                                    <li
                                                                        key={id}
                                                                    >
                                                                        {
                                                                            outlook.content
                                                                        }
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="flex flex-row  w-full  overflow-auto">
                                                {service.images.map(
                                                    (image, id) => {
                                                        return (
                                                            <div
                                                                className=" min-w-fit m-2 "
                                                                key={id}
                                                            >
                                                                <img
                                                                    src={`data:image/${image.extension};base64,${image.content}`}
                                                                    alt="image 1"
                                                                    className="w-[400px] h-[200px] object-cover rounded-xl"
                                                                />
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
