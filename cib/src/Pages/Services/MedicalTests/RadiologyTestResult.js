import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RadiologyTestResult() {
    const url = process.env.REACT_APP_MED_GUARD_API_URL;
    const token = window.localStorage.getItem("token");

    let navigate = useNavigate();

    const logout = () => {
        axios({
            // Endpoint to send files
            url: url + "/logout",
            method: "get",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        })
            // Handle the response from backend here
            .then((response) => {
                window.localStorage.clear();
                navigate("/login");
            })

            // Catch errors if any
            .catch((error) => {
                if (error.response) {
                } else if (error.response) {
                } else if (error.response.status === 401) {
                    window.localStorage.clear();
                    navigate("/login");
                }
            });
    };

    useEffect(() => {}, []);

    return (
        <container className="flex  h-screen w-full justify-center  align-middle items-center flex-row">
            <h1 className="pr-4 text-3xl">Loading...</h1>
        </container>
    );
}
