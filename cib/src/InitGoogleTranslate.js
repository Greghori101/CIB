import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";

const InitGoogleTranslate = () => {
    function googleTranslateElementInit() {
        console.log("hello");
        try {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    autoDisplay: false,
                },
                "google_translate_element"
            );
        } catch (error) {
            toast.error(
                "Unable to establish a connection. The website may behave unexpectedly."
            );
        }
    }
    useEffect(() => {
        let timeoutId;
        const initTranslation = () => {
            timeoutId = setTimeout(googleTranslateElementInit, 1000);
        };

        const handleOnlineEvent = () => {
            window.location.reload()
            toast.success("Back online");
        };

        window.addEventListener("online", handleOnlineEvent);

        const handleOfflineEvent = () => {
            toast.error(
                "Unable to establish a connection. The website may behave unexpectedly."
            );
        };

        window.addEventListener("offline", handleOfflineEvent);

        initTranslation();

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("online", handleOnlineEvent);
        };
    });
    return (
        <div className="hidden">
            <div id="google_translate_element"></div>
        </div>
    );
};

export default InitGoogleTranslate;
