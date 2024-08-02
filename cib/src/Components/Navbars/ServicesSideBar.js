/*eslint-disable*/
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ServicesSidebar() {
    let location = useLocation();
    return (
        <>
            <aside className=" inset-0  my-4 ml-4 w-72 transition-transform duration-300 xl:translate-x-0 overflow-auto ">
                <div>
                    <h6 className="md:min-w-full text-slate-500 text-xs capitalize font-bold flex flex-row pt-1 pb-4 no-underline">
                        Services
                    </h6>
                    <ul className="m-0 p-0">
                        <li className="items-center p-2 hover:bg-slate-200">
                            <Link
                                className={
                                    "text-xs capitalize py-1 font-bold flex flex-row text-slate-700 hover:text-slate-950 "
                                }
                            >
                                All
                            </Link>
                        </li>
                        <li className="items-center p-2 hover:bg-slate-200">
                            <Link
                                className={
                                    "text-xs capitalize py-1 font-bold flex flex-row text-slate-700 hover:text-slate-950 "
                                }
                                to="/dashboard"
                            >
                                <div className="!w-4 h-4 bg-blue-800 rounded-full mr-2"></div>
                                Laboratory
                            </Link>
                        </li>
                        <li className="items-center p-2 hover:bg-slate-200">
                            <Link
                                className={
                                    "text-xs capitalize py-1 font-bold flex flex-row text-slate-700 hover:text-slate-950 "
                                }
                                to="/dashboard"
                            >
                                <div className="!w-4 h-4 bg-sky-500 rounded-full mr-2"></div>
                                Radiology
                            </Link>
                        </li>

                        <li className="items-center p-2 hover:bg-slate-200">
                            <Link
                                className={
                                    "text-xs capitalize py-1 font-bold flex flex-row text-slate-700 hover:text-slate-950 "
                                }
                                to="/dashboard"
                            >
                                <div className="!w-4 h-4 bg-purple-600 rounded-full mr-2"></div>
                                Gynecology
                            </Link>
                        </li>
                        <li className="items-center p-2 hover:bg-slate-200">
                            <Link
                                className={
                                    "text-xs capitalize py-1 font-bold flex flex-row text-slate-700 hover:text-slate-950 "
                                }
                                to="/dashboard"
                            >
                                <div className="!w-4 h-4 bg-cyan-800 rounded-full mr-2"></div>
                                Surgery
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}
