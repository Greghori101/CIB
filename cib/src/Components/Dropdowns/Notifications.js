import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WebSocketInit from "../../WebSocketInit";

export default function Notifications() {
    const user_id = window.localStorage.getItem("user_id");

    const [notifications,setNotifications] = useState([]);
    const fetch_notifications = ()=>{

    }
    useEffect(() => {
        fetch_notifications();
    }, [notifications]);
    return (
        <ul className=" border-0 m-0 p-2">
            <WebSocketInit user_id={user_id} fetch_notifications={fetch_notifications}></WebSocketInit>
            <li >
                <Link className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded cursor-pointer" to={""}>
                <div className="grid place-items-center rounded-full">
                    <i className="fa-solid fa-circle-info text-3xl text-blue-400" />
                </div>
                <div>
                    <spam
                        className="text-slate-500 mb-1 font-normal"
                    >
                        Payment successfully completed
                    </spam>
                    <div
                        className="text-slate-500 flex items-center gap-1 text-xs font-normal opacity-60"
                    >
                        <i className="fa-solid fa-clock text-lg" /> 2 days
                        ago
                    </div>
                </div></Link>
            </li>
        </ul>
    );
}
