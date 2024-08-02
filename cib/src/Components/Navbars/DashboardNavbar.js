import React from "react";

import UserDropdown from "../Dropdowns/UserDropdown.js";
import NotificationDropdown from "../Dropdowns/NotificationDropdown.js";
import { useParams } from "react-router-dom";
import GoogleTranslate from "../../GoogleTranslate.js";
export default function DashboardNavbar({ title }) {
    const { name } = useParams();
    return (
        <nav className="sticky top-0  z-50 bg-transparent  flex items-center py-3 px-2 w-full">
            <div className=" w-full mx-autp  flex justify-between md:flex-nowrap flex-wrap rounded-2xl bg-gradient-to-l from-white via-slate-50 to-sky-50 shadow-2xl px-4 items-center py-2 ">
                {/* Brand */}
                <div
                    className="text-md text-slate-700 capitalize  lg:inline-block font-semibold"
                    onClick={(e) => e.preventDefault()}
                >
                    {title}
                    {name ? " \\ " + name : ""}
                </div>
                <div className="flex flex-row items-center">
                    {/* <NotificationDropdown /> */}
                    {/* <GoogleTranslate/> */}
                    <UserDropdown />
                </div>
            </div>
        </nav>
    );
}
