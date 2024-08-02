import React from "react";

export default function CardLink({
    statSubtitle,
    statTitle,
    statIconName,
    statIconColor,
    show,
}) {
    return (
        <>
            <div
                className="relative flex flex-col min-w-0 break-words bg-slate-50 rounded-lg   shadow-lg   hover:cursor-pointer hover:bg-white hover:scale-110 transition-all"
                onClick={() => show()}
            >
                <div className="flex-auto px-2 py-4 max-h-[100px]">
                    <div className="flex flex-nowrap">
                        <div className="relative mr-2 w-auto flex-initial">
                            <div
                                className={
                                    "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                                    statIconColor
                                }
                            >
                                <i className={statIconName}></i>
                            </div>
                        </div>
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h5 className="text-slate-400 capitalize font-bold text-xs">
                                {statSubtitle}
                            </h5>
                            {/* <span className="font-semibold text-xl text-slate-700">
                                {statTitle}
                            </span> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
