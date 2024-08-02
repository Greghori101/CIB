import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CardTable from "../../Components/Cards/CardTable";
import AppointmentInfo from "../../Components/Modals/AppointmentInfo";

export default function Appointments() {
    const url = process.env.REACT_APP_GRDV_API_URL;
    const token = window.localStorage.getItem("token");
    const [form, setForm] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [appointment, setAppointment] = useState(null);
    const header = ["firstname", "lastname", "email", "phone_number"];
    let navigate = useNavigate();

    const show_form = (event, appointment = null, method) => {
        event.preventDefault();
        setAppointment(appointment);
        setForm(method);
        document.body.style.overflow = "hidden";
    };

    const close = (event) => {
        event.preventDefault();
        setAppointment(null);
        setForm("");
        document.body.style.overflow = "auto";
    };
    const destroy = async (event, appointment) => {
        event.preventDefault();
        await axios({
            // Endpoint to send files
            url: url + "/appointments/" + appointment.id,
            method: "delete",
            headers: {
                Accept: "Application/json",
                Authorization: "Bearer " + token,
            },
        })
            // Handle the response from backend here
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Appointment request deleted",
                    iconColor: "#3dc00c",
                });
                get_appointments();
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
                } else {
                    Swal.fire({
                        title: error.response?.statusText,
                        text: error.response.data.message,
                        icon: "error",
                    });
                }
            });
    };
    const get_appointments = () => {
        axios({
            // Endpoint to send files
            url: url + "/appointments",
            method: "get",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        })
            // Handle the response from backend here
            .then((response) => {
                setAppointments(response.data);
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
    };

    useEffect(() => {
        get_appointments();
    }, []);

    return (
        <>
            {form === "info" ? (
                <div
                    className=" fixed m-0 py-6 flex align-middle justify-center bg-black bg-opacity-40 z-50 top-0 left-0 w-full h-screen overflow-auto "
                    onClick={() => {
                        document.body.style.overflow = "auto";
                        setForm("");
                    }}
                >
                    <AppointmentInfo
                        element={appointment}
                        close={close}
                    ></AppointmentInfo>
                </div>
            ) : (
                ""
            )}
            <div className="px-2">
                <CardTable
                    data={appointments}
                    header={header}
                    title={"Appointments"}
                    show_form={show_form}
                    disabled={["edit", "add"]}
                    destroy={destroy}
                ></CardTable>
            </div>
        </>
    );
}
