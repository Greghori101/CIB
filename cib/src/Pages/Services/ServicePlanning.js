import { useEffect } from "react";
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

export default function ServicePlanning() {
    const url = process.env.REACT_APP_MED_GUARD_API_URL;
    const token = window.localStorage.getItem("token");

    useEffect(() => {}, []);

    return (
        <>
            <IndexNavbar></IndexNavbar>
            <div className="container">
                <section className="py-6 flex flex-row justify-start items-start relative ">
                    <ServicesSidebar></ServicesSidebar>
                    <div className="container ">
                        <div className="row">
                            <FullCalendar
                                slotMinTime={"08:00:00"}
                                slotMaxTime={"18:00:00"}
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
                                eventSources={[
                                    {
                                        events: [
                                            // put the array in the `events` property
                                            {
                                                className: [
                                                    "m-1",
                                                    "p-0",
                                                    "border-none",
                                                ],
                                                title: "event1",
                                                extendedProps: {
                                                    service: "radiology",
                                                },
                                                start: "2023-05-21",
                                            },
                                            {
                                                className: [
                                                    "m-1",
                                                    "p-0",
                                                    "border-none",
                                                ],

                                                title: "event2",
                                                extendedProps: {
                                                    service: "radiology",
                                                },
                                                start: "2023-05-21",
                                                end: "2023-05-22",
                                            },
                                            {
                                                className: [
                                                    "m-1",
                                                    "p-0",
                                                    "border-none",
                                                ],
                                                title: "event3",
                                                extendedProps: {
                                                    service: "radiology",
                                                },

                                                start: "2023-05-21T10:30:00",
                                                end: "2023-05-21T13:00:00",
                                            },
                                            {
                                                title: "event4",
                                                extendedProps: {
                                                    service: "radiology",
                                                },

                                                start: "2023-05-21T12:30:00",
                                                end: "2023-05-21T13:30:00",
                                            },
                                            {
                                                className: [
                                                    "m-1",
                                                    "p-0",
                                                    "border-none",
                                                ],
                                                title: "event5",
                                                extendedProps: {
                                                    service: "radiology",
                                                },
                                                start: "2023-05-21",
                                            },
                                            {
                                                className: [
                                                    "m-1",
                                                    "p-0",
                                                    "border-none",
                                                ],

                                                title: "event5",
                                                extendedProps: {
                                                    service: "gynecology",
                                                },
                                                start: "2023-05-21",
                                                end: "2023-05-22",
                                            },
                                            {
                                                className: [
                                                    "m-1",
                                                    "p-0",
                                                    "border-none",
                                                ],
                                                title: "event6",
                                                extendedProps: {
                                                    service: "laboratory",
                                                },

                                                start: "2023-05-21T10:30:00",
                                                end: "2023-05-21T13:00:00",
                                            },
                                            {
                                                className: [
                                                    "m-1",
                                                    "p-0",
                                                    "border-none",
                                                ],
                                                title: "event7",
                                                extendedProps: {
                                                    service: "surgery",
                                                },

                                                start: "2023-05-21T12:30:00",
                                                end: "2023-05-21T13:30:00",
                                            },
                                        ],
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </>
    );
}

function renderEventContent(eventInfo) {
    return (
        <div
            className={
                "flex flex-col text-white h-full rounded p-0 border-none overflow-auto scroollbar-hidden " +
                (eventInfo.event.extendedProps.service == "laboratory"
                    ? "bg-blue-800"
                    : eventInfo.event.extendedProps.service == "radiology"
                    ? "bg-sky-500"
                    : eventInfo.event.extendedProps.service == "gynecology"
                    ? " bg-purple-600"
                    : eventInfo.event.extendedProps.service == "surgery"
                    ? " bg-cyan-800"
                    : "")
            }
        >
            <i>{eventInfo.event.title}</i>
        </div>
    );
}
