import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GoogleTranslate from "../../GoogleTranslate";

const SelectOption = ({ onChange, data, multiple = false }) => {
    const [values, setValues] = useState([]);
    const [search_value, setSearchValue] = useState("");
    const [show_menu, setShowMenu] = useState(false);
    const [options, setOptions] = useState([]);

    const remove = (e, option) => {
        e.stopPropagation();
        const temp = values.filter((o) => o.value !== option.value);

        setValues(temp);
        console.log(temp);
        onChange(e, temp);
    };
    const get_options = async () => {
        if (!search_value && search_value === "") {
            setOptions(data);
        }

        const temp = await data.filter(
            (option) =>
                option.label
                    .toLowerCase()
                    .indexOf(search_value?.toLowerCase()) >= 0
        );
        setOptions(temp);
    };
    const onItemClick = (e, option) => {
        let newValue;
        if (multiple) {
            if (values.findIndex((o) => o.value === option.value) >= 0) {
                newValue = remove(option);
            } else {
                newValue = [...values, option];
            }
        } else {
            newValue = option;
        }

        setValues(newValue);
        onChange(e, newValue);
    };
    const isSelected = (option) => {
        if (multiple) {
            return values.filter((o) => o.value === option.value).length > 0;
        }

        if (!values) {
            return false;
        }

        return values.value === option.value;
    };
    const display_values = () => {
        if (!values || values.length === 0) {
            return "Select...";
        }
        if (multiple) {
            return (
                <div className="flex flex-row items-center p-2">
                    {values.map((option) => (
                        <div key={option.value} className="bg-slate-50">
                            {option.label}
                            <span
                                onClick={(e) => remove(e, option)}
                                className="dropdown-tag-close"
                            >
                                <i className="fa-solid fa-close"></i>
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return values.label;
    };
    useEffect(() => {
        get_options();
    }, []);

    return (
        <>
            <div className="relative w-full flex ">
                <div
                    onClick={() => {
                        setSearchValue("");
                        setShowMenu(!show_menu);
                    }}
                    className="flex flex-row items-center justify-between border bg-white py-2 rounded-lg shadow px-3 cursor-pointer w-full"
                >
                    <div className="flex flex-row flex-wrap">
                        {display_values()}
                    </div>
                    <div className="text-slate-700 font-bold">
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                </div>
                {show_menu && (
                    <div className="absolute top-full  bg-white rounded shadow py-2 z-50 flex flex-col px-2 w-full mt-2 ">
                        <div>
                            <input
                                onChange={(event) => {
                                    setSearchValue(event.target.value);
                                    const temp = data.filter(
                                        (option) =>
                                            option.label
                                                .toLowerCase()
                                                .indexOf(
                                                    event.target.value.toLowerCase()
                                                ) >= 0
                                    );
                                    setOptions(temp);
                                }}
                                value={search_value}
                                className="rounded border px-2 border-slate-50 py-1 w-full"
                            />
                            {options && options.length !== 0 ? (
                                ""
                            ) : (
                                <div className="py-2 mb-2">No results...</div>
                            )}
                        </div>
                        <div className="max-h-52 overflow-auto mt-2">
                            {options.map((option) => (
                                <div
                                    onClick={(e) => onItemClick(e, option)}
                                    key={option.value}
                                    className={`px-2 py-2  my-2 rounded hover:bg-slate-300 cursor-pointer ${
                                        isSelected(option) &&
                                        "text-white !bg-blue-500"
                                    }`}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SelectOption;
