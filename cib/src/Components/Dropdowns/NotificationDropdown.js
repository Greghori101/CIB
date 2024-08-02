import React, { useState } from "react";
import Notifications from "./Notifications";

const NotificationDropdown = () => {
    // dropdown props
    const [dropDown, setDropDown] = useState(false);

    return (
        <div className="relative w-12 h-12 flex justify-center items-center">
            <a
                className=" block py-1 px-3 scale-125 cursor-pointer text-slate-900"
                onClick={(e) => {
                    e.preventDefault();
                    setDropDown(!dropDown);
                }}
            >
                <i className="fas fa-bell"></i>
            </a>
            {dropDown ? (
                <div
                    className={
                        "bg-white text-base  float-left py-2 list-none text-left rounded shadow-lg w-64 absolute top-full right-0 mt-[21px] z-50 " 
                    }
                >
                    <Notifications />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default NotificationDropdown;
