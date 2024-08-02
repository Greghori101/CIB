import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footers/Footer";
import IndexNavbar from "../../Components/Navbars/IndexNavbar";

export default function Error404() {
   

    useEffect(() => {}, []);

    return (
        <div>
            <IndexNavbar></IndexNavbar>
            <section className="h-screen bg-white">
                <div className="container">
                    <div className="row text-center items-center justify-center">
                        <img
                            src={require("../../assets/img/404.webp")}
                            className=" !max-w-xl"
                        ></img>
                        <div>
                            <p className="text-3xl text-slate-800 bold">
                                We are sorry, we can't find the page you
                                requested.
                            </p>
                            <Link
                                to={"/"}
                                className="underline text-bold text-lg"
                            >
                                <i className="fa-solid fa-arrow-right mr-2"></i>
                                back to home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </div>
    );
}
