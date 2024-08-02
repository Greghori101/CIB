import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footers/Footer";
import IndexNavbar from "../../Components/Navbars/IndexNavbar";

export default function Error500() {
   
    useEffect(() => {}, []);

    return (
        <div>
            <IndexNavbar></IndexNavbar>
            <section className="h-screen bg-[#F3F2F5]">
                <div className="container">
                    <div className="row text-center items-center justify-center">
                        <img
                            src={require("../../assets/img/500.webp")}
                            className=" !max-w-xl"
                        ></img>
                        <div>
                            <p className="text-3xl text-slate-800 bold">
                                Our server is feeling a little down.{" "}
                            </p>
                            <p>Please try agin in few moments.</p>
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
