import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ReactComponent as Icon } from "../../assets/img/no-result.svg";
import { Link } from "react-router-dom";

// components

export default function CardTable({
    color,
    data,
    header,
    title,
    show_form,
    destroy,
    disabled,
}) {
    const [headers, setHeaders] = useState([]);
    useEffect(() => {
        setHeaders(header?.map((str) => str.replace("_", " ")));
    }, []);
    return (
        <>
            <div
                className={
                    " flex flex-col w-full flex-wrap  shadow-lg rounded-xl  px-5 py-4 " +
                    (color === "light" ? "bg-white" : "bg-sky-900 text-white")
                }
            >
                {data.length == 0 || !data ? (
                    <div className="flex w-full justify-center items-center flex-col mb-2 py-2">
                        <Icon />

                        <h2 className="mt-4">No Result Found</h2>
                        <spam className="max-w-lg text-center">
                            Please try again or insert some data.
                        </spam>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-wrap py-2 items-center">
                            <div className="relative w-full  max-w-full flex  justify-between flex-row">
                                <h3
                                    className={
                                        "font-semibold text-lg  " +
                                        (color === "light"
                                            ? "text-slate-700"
                                            : "text-white")
                                    }
                                >
                                    {title}
                                </h3>
                                <div>
                                    {disabled.includes("add") ? (
                                        ""
                                    ) : (
                                        <Link
                                            role={"button"}
                                            onClick={(event) => {
                                                show_form(event, "add");
                                            }}
                                            className="hover:text-blue-500 transition duration-150 ease-in-out border hover:scale-110 rounded-full p-2 shadow-md !w-[32px] h-8 items-center justify-center flex "
                                        >
                                            <i class="fa-solid fa-plus"></i>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-auto scrollbar-hidden pb-4">
                            {/* Projects table */}
                            <table className="items-center w-full bg-transparent border-collapse border">
                                <thead>
                                    <tr>
                                        {headers.map((h, id) => {
                                            return (
                                                <th
                                                    key={id}
                                                    className={
                                                        " align-middle border border-solid py-3 text-xs capitalize border-l-0 border-r-0 whitespace-nowrap w-fit font-semibold text-left px-2 " +
                                                        (color === "light"
                                                            ? "bg-slate-50 text-slate-500 border-slate-100"
                                                            : "bg-sky-800 text-sky-300 border-sky-700")
                                                    }
                                                >
                                                    {h}
                                                </th>
                                            );
                                        })}
                                        <th
                                            className={
                                                " align-middle border  w-32 border-solid py-3 text-xs capitalize border-l-0 border-r-0 whitespace-nowrap font-semibold px-2 " +
                                                (color === "light"
                                                    ? "bg-slate-50 text-slate-500 border-slate-100"
                                                    : "bg-sky-800 text-sky-300 border-sky-700")
                                            }
                                        >
                                            actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((element, id) => {
                                        return (
                                            <tr
                                                key={id}
                                                className={
                                                    id % 2 !== 0
                                                        ? "bg-slate-50"
                                                        : ""
                                                }
                                            >
                                                {header.map((h, id) => {
                                                    return (
                                                        <td
                                                            key={id}
                                                            className="align-middle text-xs whitespace-nowrap py-3 px-2"
                                                        >
                                                            {element[h]}
                                                        </td>
                                                    );
                                                })}
                                                <td className="align-middle flex items-center w-32  justify-evenly text-xs whitespace-nowrap py-3 ">
                                                    <Link
                                                        role={"button"}
                                                        onClick={(event) => {
                                                            show_form(
                                                                event,
                                                                element,
                                                                "info"
                                                            );
                                                        }}
                                                        className="hover:text-blue-500 transition duration-150 ease-in-out border hover:scale-110 rounded-full p-2 shadow-md !w-[32px] h-8 items-center justify-center flex "
                                                    >
                                                        <i class="fa-solid fa-info"></i>
                                                    </Link>
                                                    {disabled.includes(
                                                        "add"
                                                    ) ? (
                                                        ""
                                                    ) : (
                                                        <Link
                                                            role={"button"}
                                                            onClick={(
                                                                event
                                                            ) => {
                                                                show_form(
                                                                    event,
                                                                    element,
                                                                    "edit"
                                                                );
                                                            }}
                                                            className="hover:text-yellow-400 transition duration-150 ease-in-out border hover:scale-110 rounded-full p-2 shadow-md !w-[32px] h-8 items-center justify-center flex"
                                                        >
                                                            <i class="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                    )}
                                                    <Link
                                                        role={"button"}
                                                        onClick={(event) => {
                                                            destroy(
                                                                event,
                                                                element
                                                            );
                                                        }}
                                                        className="hover:text-red-600 transition duration-150 ease-in-out border hover:scale-110 rounded-full p-2 shadow-md !w-[32px] h-8 items-center justify-center flex"
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
                    </>
                )}
            </div>
        </>
    );
}

CardTable.defaultProps = {
    color: "light",
};

CardTable.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
