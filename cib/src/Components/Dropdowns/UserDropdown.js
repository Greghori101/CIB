import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleTranslate from "../../GoogleTranslate";

const UserDropdown = () => {
    // dropdown props
    const [dropDown, setDropdown] = useState(false);
    const showDropDown = () => {
        setDropdown(!dropDown);
    };
    return (
        <>
            <div className="relative w-12 h-12 flex justify-center items-center">
               {dropDown&&  <div
                    className={
                        "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg  w-fit absolute top-full right-0 mt-[21px] "
                    }
                >
                    <Link
                        to="/dashboard"
                        className={
                            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
                        }
                    >
                        <i className="fa-solid fa-dashboard  pr-2"></i>
                        Dashboard
                    </Link>{" "}
                    <Link
                        to="/profile"
                        className={
                            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
                        }
                    >
                        <i className="fa-solid fa-user  pr-2"></i>
                        Profile
                    </Link>
                    <Link
                        to={"/profile/settings"}
                        className={
                            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
                        }
                    >
                        <i className="fa-solid fa-gear  pr-2"></i>
                        Settings
                    </Link>
                    <div>
                        <GoogleTranslate  />
                    </div>
                    <div className="h-0 my-2 border border-solid border-slate-100" />
                    <Link
                        to={"/logout"}
                        className={
                            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
                        }
                    >
                        <i class="fa-solid fa-right-from-bracket pr-2"></i>
                        Logout
                    </Link>
                </div>}
                <a
                    className="text-slate-500 block  cursor-pointer"
                    onClick={() => showDropDown()}
                >
                    <div className="flex items-center  ">
                        <span className="w-12 h-12 text-sm text-white bg-slate-200 flex items-center justify-center  rounded-full ">
                            <img
                                alt="..."
                                className="w-full rounded-full align-middle border-none shadow-lg"
                                src={window.localStorage.getItem(
                                    "profile_picture_url"
                                )}
                            />
                        </span>
                    </div>
                </a>
            </div>
        </>
    );
};

export default UserDropdown;
