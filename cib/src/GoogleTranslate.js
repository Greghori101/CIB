import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";

const GoogleTranslate = () => {
    const [openOptions, setOpenOptions] = useState(false);


    const doGTranslate = (languagePair) => {
        try {
            const targetLanguage = languagePair.split("|")[1];

            
            const comboElement = document.querySelector(".goog-te-combo");
            if (comboElement) {
                comboElement.value = targetLanguage;
                comboElement.dispatchEvent(new Event("change"));
            }
            setOpenOptions(false);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        setOpenOptions(false);
    }, []);
    return (
        <div>
            <div className="relative flex flex-col w-fit ">
                <Link
                    onClick={() => setOpenOptions(!openOptions)}
                    className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
                    }
                >
                    <i className="fa-solid fa-globe  pr-2"></i> Language
                </Link>
                {openOptions ? (
                    <div className="flex flex-col bg-white rounded shadow-lg absolute right-0 top-full  z-50">
                        <a
                            onClick={() => doGTranslate("en|ar")}
                            title="Arabic"
                            className="flex flex-row gap-2 items-center hover:cursor-pointer hover:bg-slate-100 px-4 py-2" 
                        >
                            <img
                                className="w-[22px]"
                                src={require("./assets/img/algeria.png")}
                            />
                            Arabic
                        </a>
                        <a
                            onClick={() => doGTranslate("en|fr")}
                            className="flex flex-row gap-2 items-center hover:cursor-pointer hover:bg-slate-100 px-4 py-2" 
                            title="French"
                        >
                            <img
                                className="w-[22px]"
                                src={require("./assets/img/french.png")}
                            />
                            French
                        </a>
                        <a
                            onClick={() => doGTranslate("en|en")}
                            className="flex flex-row gap-2 items-center hover:cursor-pointer hover:bg-slate-100 px-4 py-2" 
                            title="English"
                        >
                            <img
                                className="w-[22px]"
                                src={require("./assets/img/usa.png")}
                            />
                            English
                        </a>
                        
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default GoogleTranslate;
