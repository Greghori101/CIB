import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loaders/Loading";

export default function Logout() {
    const url = process.env.REACT_APP_MED_GUARD_API_URL;
    const token = window.localStorage.getItem("token");

    let navigate = useNavigate();

    const logout = () => {
        window.localStorage.clear();
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
                navigate("/login");
            })

            // Catch errors if any
            .catch((error) => {
                if (error.response) {
                } else if (error.response.status === 401) {
                    navigate("/login");
                }
            });
    };

    useEffect(() => {
        if (!token) {
            window.localStorage.clear();
            navigate("/login");
        } else {
            logout();
        }
    }, []);

    return (
        <container className="flex  h-screen w-full justify-center  align-middle items-center flex-row">
            <h1 className="pr-4 text-3xl">Loading...</h1>
            <Loading width="35px" height="35px" color="black" />
        </container>
    );
}
