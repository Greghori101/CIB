import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../../Components/Navbars/DashboardNavbar";
import Admin from "./Admin";
import Sidebar from "../../Components/Navbars/Sidebar";
import Footer from "../../Components/Footers/Footer";

export default function Dashboard() {
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
                } else if (error.response.status === 401) {
                    window.localStorage.clear();
                    navigate("/login");
                }
            });
    };

    useEffect(() => {}, []);

    return (
        <div className="w-full overflow-clip relative">
            <div className="h-72 fixed top-0 left-0 w-full">
                <img
                    className="w-full h-full object-cover"
                    src={require("../../assets/img/service-bg.jpg")}
                ></img>
                <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
            </div>
            <Sidebar />
            <div className="ml-72 relative">
                <DashboardNavbar title={"dashboard"}></DashboardNavbar>
                <Admin />
                <Footer />
            </div>
        </div>
    );
}
