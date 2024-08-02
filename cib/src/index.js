import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./index.css";
import "./assets/css/styles.css";

import Login from "./Pages/Auth/Login";
import Logout from "./Pages/Auth/Logout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Index from "./Pages/Main/Index";
import Error404 from "./Pages/Errors/Error404";
import News from "./Pages/News/News";
import Services from "./Pages/Services/Services";
import Error500 from "./Pages/Errors/Error500";
import ServicePlanning from "./Pages/Services/ServicePlanning";
import About from "./Pages/Main/About";
import Contact from "./Pages/Main/Contact";
import Terms from "./Pages/Main/Terms";
import Privacy from "./Pages/Main/Privacy";
import AppointmentForm from "./Components/Forms/AppointmentForm";
import IndexNavbar from "./Components/Navbars/IndexNavbar";
import Footer from "./Components/Footers/Footer";
import NewsDetails from "./Pages/News/NewsDetails";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import Service from "./Pages/Services/Service";
import Profile from "./Pages/Auth/Profile/Profile";
import Settings from "./Pages/Auth/Profile/Settings";
import Patients from "./Pages/EMR/Patients";
import Employees from "./Pages/Management/Employees";
import Management from "./Pages/Management/Management";
import Appointments from "./Pages/Appointments/Appointments";
import Hospitalizations from "./Pages/Services/Hospitalization/Hospitalizations";
import Orders from "./Pages/Pharmacy/Orders";
import Reports from "./Pages/EMR/Documents/Reports";
import PharmacyIndex from "./Pages/Pharmacy/PharmacyIndex";
import Tasks from "./Pages/Pharmacy/Tasks";
import Tests from "./Pages/Services/MedicalTests/Test";
import Inbox from "./Pages/Inbox";
import Sidebar from "./Components/Navbars/Sidebar";
import DashboardNavbar from "./Components/Navbars/DashboardNavbar";
import ScrollToTop from "./Components/ScrollToTop";
import InitGoogleTranslate from "./InitGoogleTranslate";
import { Toaster } from "react-hot-toast";
import ServiceForm from "./Components/Forms/ServiceForm";
import NewsForm from "./Components/Forms/NewsForm";
import VisitPlanning from "./Pages/Appointments/VisitPlanning";
import Scanner from "./Components/Forms/Scanner";
import PatientDetails from "./Pages/EMR/PatientDetails";

const root = ReactDOM.createRoot(document.getElementById("root"));
const app_url = process.env.REACT_APP_URL;
root.render(
    <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <InitGoogleTranslate />
        <ScrollToTop />
        <Routes>
            <Route path="/" element={<Index />} />

            <Route path="/login" exact element={<Login />} />
            <Route path="/logout" exact element={<Logout />} />
            <Route path="/forgotpassword" exact element={<ForgotPassword />} />

            <Route path="/500" element={<Error500 />} />
            <Route path="/404" element={<Error404 />} />

            <Route
                path="/news"
                element={
                    <>
                        <IndexNavbar></IndexNavbar>
                        <News></News>
                        <Footer></Footer>
                    </>
                }
            />
            <Route
                path="/news/details/:id"
                element={
                    <>
                        <IndexNavbar></IndexNavbar>
                        <NewsDetails></NewsDetails>
                        <Footer></Footer>
                    </>
                }
            />
            <Route
                path="/services"
                element={
                    <>
                        <IndexNavbar></IndexNavbar>
                        <Services></Services>
                        <Footer></Footer>
                    </>
                }
            />

            <Route
                path="/services/details/:name"
                element={
                    <>
                        <IndexNavbar></IndexNavbar>
                        <Service></Service>
                        <Footer></Footer>
                    </>
                }
            />
            <Route path="/services/palnning" element={<ServicePlanning />} />
            <Route path="/form/1" element={<NewsForm />} />
            <Route path="/form/2" element={<ServiceForm />} />
            <Route
                path="/appointment/form"
                element={
                    <>
                        <IndexNavbar></IndexNavbar>
                        <AppointmentForm></AppointmentForm>
                        <Footer></Footer>
                    </>
                }
            ></Route>

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route
                path="/profile"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={require("./assets/img/profile-bg.jpg")}
                            ></img>
                            <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative  z-50 ">
                            <DashboardNavbar
                                title={"profile"}
                            ></DashboardNavbar>
                            <Profile />
                            <Footer />
                        </div>
                    </div>
                }
            />
            <Route
                path="/patients/:id"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={require("./assets/img/profile-bg.jpg")}
                            ></img>
                            <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative  z-50 ">
                            <DashboardNavbar
                                title={"Patient Details"}
                            ></DashboardNavbar>
                            <PatientDetails />
                            <Footer />
                        </div>
                    </div>
                }
            />
            <Route
                path="/profile/settings"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={require("./assets/img/profile-bg.jpg")}
                            ></img>
                            <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative  z-50 ">
                            <DashboardNavbar
                                title={"settings"}
                            ></DashboardNavbar>
                            <Settings />
                            <Footer />
                        </div>
                    </div>
                }
            />
            <Route
                path="/patients"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={require("./assets/img/patients-bg.jpg")}
                            ></img>
                            <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative  z-50 ">
                            <DashboardNavbar
                                title={"patients"}
                            ></DashboardNavbar>
                            <Patients />
                            <Footer />
                        </div>
                    </div>
                }
            />
            <Route
                path="/employees"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={require("./assets/img/employees-bg.jpg")}
                            ></img>
                            <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative  z-50 ">
                            <DashboardNavbar
                                title={"employees"}
                            ></DashboardNavbar>
                            <Employees />
                            <Footer />
                        </div>
                    </div>
                }
            />
            <Route
                path="/dashboard/services"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={require("./assets/img/service-bg.jpg")}
                            ></img>
                            <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative  z-50 ">
                            <DashboardNavbar
                                title={"services"}
                            ></DashboardNavbar>
                            <Services baseurl={"/dashboard"} />
                            <Footer />
                        </div>
                    </div>
                }
            />
            <Route
                path="/dashboard/services/details/:name?"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={require("./assets/img/service-bg.jpg")}
                            ></img>
                            <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative  z-50 ">
                            <DashboardNavbar
                                title={"services"}
                            ></DashboardNavbar>
                            <Service />
                            <Footer />
                        </div>
                    </div>
                }
            />
            <Route path="/management" element={<Management />} />
            <Route
                path="/dashboard/appointments"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={require("./assets/img/appointments-bg.jpg")}
                            ></img>
                            <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative  z-50 ">
                            <DashboardNavbar
                                title={"appointments"}
                            ></DashboardNavbar>
                            <Appointments />
                            <Footer />
                        </div>
                    </div>
                }
            />
            <Route
                path="/scanner"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={require("./assets/img/radiology-bg.jpg")}
                            ></img>
                            <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative  z-50 ">
                            <DashboardNavbar
                                title={"Chest X-Ray Scanner"}
                            ></DashboardNavbar>
                            <Scanner />
                            <Footer />
                        </div>
                    </div>
                }
            />
            <Route
                path="/hospitalizations"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={require("./assets/img/hospitalization-bg.jpg")}
                            ></img>
                            <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative  z-50 ">
                            <DashboardNavbar
                                title={"hospitalizations"}
                            ></DashboardNavbar>
                            <Hospitalizations />
                            <Footer />
                        </div>
                    </div>
                }
            />
            <Route
                path="/orders"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={require("./assets/img/tasks-bg.jpg")}
                            ></img>
                            <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative  z-50 ">
                            <DashboardNavbar title={"orders"}></DashboardNavbar>
                            <Orders />
                            <Footer />
                        </div>
                    </div>
                }
            />
            <Route
                path="/reports"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={require("./assets/img/report-bg.jpg")}
                            ></img>
                            <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative  z-50 ">
                            <DashboardNavbar
                                title={"reports"}
                            ></DashboardNavbar>
                            <Reports />
                            <Footer />
                        </div>
                    </div>
                }
            />
            <Route
                path="/pharmacy"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={require("./assets/img/pharmacy-bg.jpg")}
                            ></img>
                            <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative  z-50 ">
                            <DashboardNavbar
                                title={"pharmacy"}
                            ></DashboardNavbar>
                            <PharmacyIndex />
                            <Footer />
                        </div>
                    </div>
                }
            />
            <Route
                path="/tasks"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={require("./assets/img/tasks-bg.jpg")}
                            ></img>
                            <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative  z-50 ">
                            <DashboardNavbar title={"tasks"}></DashboardNavbar>
                            <Tasks />
                            <Footer />
                        </div>
                    </div>
                }
            />
            <Route
                path="/tests"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={require("./assets/img/radiology-bg.jpg")}
                            ></img>
                            <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative  z-50 ">
                            <DashboardNavbar title={"tests"}></DashboardNavbar>
                            <Tests />
                            <Footer />
                        </div>
                    </div>
                }
            />
            <Route
                path="/planning"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={require("./assets/img/appointments-bg.jpg")}
                            ></img>
                            <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative z-50 ">
                            <DashboardNavbar
                                title={"planning"}
                            ></DashboardNavbar>
                            <VisitPlanning />
                            <Footer />
                        </div>
                    </div>
                }
            />
            <Route
                path="/dashboard/news"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={require("./assets/img/news-bg.jpg")}
                            ></img>
                            <div className="w-full h-full absolute top-0 bg-blue-950/50"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative  z-50 ">
                            <DashboardNavbar title={"news"}></DashboardNavbar>
                            <News />
                            <Footer />
                        </div>
                    </div>
                }
            />
            <Route
                path="/inbox"
                element={
                    <div className="w-full visible relative">
                        <div className="h-64 fixed top-0 left-0 w-full">
                            <div className="w-full h-full absolute top-0 bg-sky-500"></div>
                        </div>
                        <Sidebar />
                        <div className="ml-72 overflow-clip relative  z-50 ">
                            <DashboardNavbar title={"inbox"}></DashboardNavbar>
                            <Inbox />
                            <Footer />
                        </div>
                    </div>
                }
            />

            <Route path="*" element={<Error404 />} />
        </Routes>
    </BrowserRouter>
);
