import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CardLineChart from "../../Components/Cards/CardLineChart";
import CardBarChart from "../../Components/Cards/CardBarChart";
import CardPageVisits from "../../Components/Cards/CardPageVisits";
import CardSocialTraffic from "../../Components/Cards/CardSocialTraffic";
import HeaderStats from "../../Components/Cards/HeaderStats";
import CardTable from "../../Components/Cards/CardTable";
import Patients from "../EMR/Patients";
import News from "../News/News";
import Employees from "../Management/Employees";
import Doctors from "../Services/Doctors/Doctors";

export default function Admin() {
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
        <>
            <div className="bg-blue-500 rounded-xl shadow-lg py-4 mb-4 mx-2 px-0 ">
                <News></News>
            </div>
            <Employees></Employees>
            <Doctors></Doctors>
        </>
    );
}
