import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IndexNavbar from "../../Components/Navbars/IndexNavbar";
import ServicesSidebar from "../../Components/Navbars/ServicesSideBar";
import Footer from "../../Components/Footers/Footer";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Swal from "sweetalert2";
import VisitInfo from "../../Components/Modals/VisitInfo";
import ConsultationForm from "../../Components/Forms/ConsultaionForm";
export default function VisitPlanning() {
    const url = process.env.REACT_APP_GRDV_API_URL;
    const token = window.localStorage.getItem("token");
    const [form, setForm] = useState("");
    const [visits, setVisits] = useState([]);
    const [visit, setVisit] = useState(null);
    const header = ["firstname", "lastname", "email", "phone_number"];
    let navigate = useNavigate();

    const change_service = () => {};

    const show_form = (event, visit = null, method) => {
        event.preventDefault();
        setVisit(visit);
        setForm(method);
        document.body.style.overflow = "hidden";
    };

    const close = (event) => {
        event.preventDefault();
        setVisit(null);
        setForm("");
        document.body.style.overflow = "auto";
    };
    const destroy = async (event, visit) => {
        event.preventDefault();
        await axios({
            // Endpoint to send files
            url: url + "/visits/" + visit.id,
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
                    title: "Visit request deleted",
                    iconColor: "#3dc00c",
                });
                get_visits();
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

    const handleEventClick = (eventInfo) => {
        const event = eventInfo.event;
        const visit = event.extendedProps.visit;
        setVisit(visit);
        setForm("info");
    };

    const get_visits = async () => {
        await axios({
            // Endpoint to send files
            url: url + "/visits",
            method: "get",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        })
            // Handle the response from backend here
            .then((response) => {
                let data = response.data;
                data = data.map((option) => {
                    return {
                        className: ["m-1", "p-0", "border-none"],

                        title: option.title,
                        extendedProps: {
                            visit: { ...option },
                        },
                        start: new Date(option.starts_at),
                        end: new Date(option.ends_at),
                    };
                });
                console.log(data);
                setVisits(data);
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
        get_visits();
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
                    <VisitInfo element={visit} close={close}></VisitInfo>
                </div>
            ) : form === "consultation" ? (
                <div
                    className=" fixed m-0 py-6 flex align-middle justify-center bg-black bg-opacity-40 z-50 top-0 left-0 w-full h-screen overflow-auto "
                    onClick={() => {
                        document.body.style.overflow = "auto";
                        setForm("");
                    }}
                >
                    <ConsultationForm
                        element={visit}
                        close={close}
                    ></ConsultationForm>
                </div>
            ) : (
                ""
            )}
            <section className="py-6 flex flex-row justify-start items-start relative bg-white rounded-xl shadow-lg mx-3 ">
                <ServicesSidebar
                    change_service={change_service}
                ></ServicesSidebar>
                <div className="container ">
                    <div className="row">
                        <FullCalendar
                            plugins={[
                                dayGridPlugin,
                                listPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                            ]}
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay",
                            }}
                            eventContent={renderEventContent}
                            initialView="timeGridWeek"
                            height={600}
                            eventDisplay="block"
                            events={visits}
                            eventClick={handleEventClick}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

function renderEventContent(eventInfo) {
    return (
        <div
            className={
                "flex flex-col text-white h-full rounded p-0 border-none overflow-auto scrollbar-hidden px-2 hover:cursor-pointer " +
                (eventInfo.event.extendedProps.visit.doctor.service.name ==
                "laboratory"
                    ? "bg-blue-800"
                    : eventInfo.event.extendedProps.visit.doctor.service.name ==
                      "radiology"
                    ? "bg-sky-500"
                    : eventInfo.event.extendedProps.visit.doctor.service.name ==
                      "gynecology"
                    ? " bg-purple-600"
                    : eventInfo.event.extendedProps.visit.doctor.service.name ==
                      "surgery"
                    ? " bg-cyan-800"
                    : "bg-slate-600")
            }
        >
            <i>
                <div className="text-bold uppercase">
                    {eventInfo.event.extendedProps.visit.doctor.service.name}{" "}
                </div>
                <div className=" whitespace-nowrap">
                    {eventInfo.event.title +
                        " with doctor " +
                        eventInfo.event.extendedProps.visit.doctor.firstname +
                        " " +
                        eventInfo.event.extendedProps.visit.doctor.lastname +
                        " for patient: " +
                        eventInfo.event.extendedProps.visit.patient?.firstname +
                        " " +
                        eventInfo.event.extendedProps.visit.patient?.lastanme}
                </div>
            </i>
        </div>
    );
}
