import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SelectOption from "../Dropdowns/SelectOption";

export default function HospitalizationRequestForm({ patient }) {
    const url_gsm = process.env.REACT_APP_GSM_API_URL;
    const url_grdv = process.env.REACT_APP_GRDV_API_URL;
    const token = window.localStorage.getItem("token");

    const [service_id, setServiceId] = useState("");
    const [time, setTime] = useState("");
    const [date, setHospitalizationDate] = useState("");
    const [bed_id, setBedId] = useState("");
    const [doctor_id, setDoctorId] = useState("");
    const [patient_id, setPatientId] = useState("");
    const [nurse_id, setNurseId] = useState("");

    let navigate = useNavigate();

    const submit = (event) => {
        event.preventDefault();
        axios({
            // Endpoint to send files
            url: url_gsm + "/hospitalizations/requests",
            method: "post",
            data: {
                patient_id,
                service_id,
                time,
                date,
                bed_id,
                doctor_id,
                nurse_id,
            },
            headers: {
                Accept: "Application/json",
                Authorization: "Bearer " + token,
            },
        })
            // Handle the response from backend here
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    iconColor: "#3dc00c",
                });
            })

            // Catch errors if any
            .catch((error) => {
                if (error.response.status === 401) {
                    Swal.fire({
                        title: "Please sign in",
                        text: "You are not signed in",
                        icon: "error",
                    }).then(() => {
                        window.localStorage.clear();
                        navigate("/login");
                    });
                }
                if (error.response.status === 500) {
                    navigate("/500");
                } else {
                    Swal.fire({
                        title: error.response?.statusText,
                        text: error.response.data.message,
                        icon: "error",
                    });
                }
            });
    };

    const get_nurses = async () => {
        let options = {
            method: "get",
            url: url_gsm + "/nurses",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        };
        axios(options)
            .then(async (response) => {
                let data = response.data;
                data = await data.map((option) => {
                    return {
                        ...option,
                        label: ` ${option.user}`,
                        value: option.id,
                    };
                });
                setNurses(data);
                setloading_nurse(false);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    Swal.fire({
                        title: "Please sign in",
                        text: "You are not signed in",
                        icon: "error",
                    }).then(() => {
                        window.localStorage.clear();
                        navigate("/login");
                    });
                }
                if (error.response.status === 500) {
                    navigate("/500");
                } else if (error.response.status === 403) {
                    Swal.fire({
                        title: "Please verify your email",
                        text: "You are not verified press ok to verify your email",
                        icon: "error",
                    }).then(() => {
                        navigate("/email.verify");
                    });
                } else {
                    Swal.fire({
                        title: error.response?.statusText,
                        text: error.response.data.message,
                        icon: "error",
                    });
                }
            });
    };

    const get_doctors = async () => {
        await axios({
            // Endpoint to send files
            url: url_gsm + "/doctors",
            method: "get",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        })
            // Handle the response from backend here
            .then((response) => {
                let data = response.data;
                data = data.map((option) => {
                    return {
                        ...option,
                        label: `Dr. ${option.firstname} ${option.lastname} ${option.specialization}`,
                        value: option.id,
                    };
                });
                setDoctors(data);
                setloading_doctor(false);
            })

            // Catch errors if any
            .catch((error) => {
                if (error.response?.status === 401) {
                    Swal.fire({
                        title: "Please sign in",
                        text: "You are not signed in",
                        icon: "error",
                    }).then(() => {
                        window.localStorage.clear();
                        navigate("/login");
                    });
                } else if (error.response?.status === 500) {
                    navigate("/500");
                } else {
                    if (error.response) {
                        Swal.fire({
                            title: error.response?.statusText,
                            text: error.response?.data.message,
                            icon: "error",
                        });
                    } else {
                        Swal.fire({
                            title: "Request failed",
                            text: "network error failed to load response",
                            icon: "error",
                        });
                    }
                }
            });
    };

    const get_services = async () => {
        await axios({
            // Endpoint to send files
            url: url_grdv + "/services",
            method: "get",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        })
            // Handle the response from backend here
            .then(async (response) => {
                let data = response.data;
                data = await data.map((option) => {
                    return {
                        ...option,
                        label: ` ${option.name}`,
                        value: option.id,
                    };
                });
                setServices(data);
                setloading_service(false);
            })

            // Catch errors if any
            .catch((error) => {
                if (error.response?.status === 401) {
                    Swal.fire({
                        title: "Please sign in",
                        text: "You are not signed in",
                        icon: "error",
                    }).then(() => {
                        window.localStorage.clear();
                        navigate("/login");
                    });
                } else if (error.response?.status === 500) {
                    navigate("/500");
                } else {
                    if (error.response) {
                        Swal.fire({
                            title: error.response?.statusText,
                            text: error.response?.data.message,
                            icon: "error",
                        });
                    } else {
                        Swal.fire({
                            title: "Request failed",
                            text: "network error failed to load response",
                            icon: "error",
                        });
                    }
                }
            });
    };
    const get_beds = async () => {
        await axios({
            // Endpoint to send files
            url: url_gsm + "/beds",
            method: "get",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        })
            // Handle the response from backend here
            .then(async (response) => {
                let data = response.data;
                data = await data.map((option) => {
                    return {
                        ...option,
                        label: ` ${option.bed_id}`,
                        value: option.id,
                    };
                });
                setBeds(data);
                setloading_bed(false);
            })

            // Catch errors if any
            .catch((error) => {
                if (error.response?.status === 401) {
                    Swal.fire({
                        title: "Please sign in",
                        text: "You are not signed in",
                        icon: "error",
                    }).then(() => {
                        window.localStorage.clear();
                        navigate("/login");
                    });
                } else if (error.response?.status === 500) {
                    navigate("/500");
                } else {
                    if (error.response) {
                        Swal.fire({
                            title: error.response?.statusText,
                            text: error.response?.data.message,
                            icon: "error",
                        });
                    } else {
                        Swal.fire({
                            title: "Request failed",
                            text: "network error failed to load response",
                            icon: "error",
                        });
                    }
                }
            });
    };
    const change_patient = (event, option) => {
        event.preventDefault();
        setPatientId(option.id);
    };

    const [patients, setPatients] = useState([]);
    const [loading_patient, setloading_patient] = useState(true);
    const get_patients = async () => {
        await axios({
            // Endpoint to send files
            url: url_gsm + "/patients",
            method: "get",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        })
            // Handle the response from backend here
            .then(async (response) => {
                let data = response.data;
                data = await data.map((option) => {
                    return {
                        ...option,
                        label: ` ${option.nationality}`,
                        value: option.id,
                    };
                });
                setPatients(data);
                setloading_patient(false);
            })

            // Catch errors if any
            .catch((error) => {
                if (error.response?.status === 401) {
                    Swal.fire({
                        title: "Please sign in",
                        text: "You are not signed in",
                        icon: "error",
                    }).then(() => {
                        window.localStorage.clear();
                        navigate("/login");
                    });
                } else if (error.response?.status === 500) {
                    navigate("/500");
                } else {
                    if (error.response) {
                        Swal.fire({
                            title: error.response?.statusText,
                            text: error.response?.data.message,
                            icon: "error",
                        });
                    } else {
                        Swal.fire({
                            title: "Request failed",
                            text: "network error failed to load response",
                            icon: "error",
                        });
                    }
                }
            });
    };
    const change_bed = (event, option) => {
        event.preventDefault();
        setBedId(option.id);
    };

    const [beds, setBeds] = useState([]);
    const [loading_bed, setloading_bed] = useState(true);
    const change_service = (event, option) => {
        event.preventDefault();
        setServiceId(option.id);
    };

    const [services, setServices] = useState([]);
    const [loading_service, setloading_service] = useState(true);

    const [loading_doctor, setloading_doctor] = useState(true);

    const [doctors, setDoctors] = useState([]);
    const change_doctor = (event, option) => {
        event.preventDefault();
        setDoctorId(option.id);
    };

    const [nurses, setNurses] = useState([]);
    const [loading_nurse, setloading_nurse] = useState(true);
    const change_nurse = (event, option) => {
        event.preventDefault();
        setNurseId(option.id);
    };
    useEffect(() => {
        get_services();
        get_nurses();
        get_doctors();
        get_beds();
        get_patients();
    }, []);

    return (
        <section className="py-3">
            <div className="container">
                <h2 spellCheck="false" className="text-gradient text-info">
                    Hospitalization Request
                </h2>

                <form autoComplete="off">
                    <div className="row">
                        <div className="w-full my-2 mb-4">
                            <div className="card">
                                <div className="card-body pt-3">
                                    <h5>Hospitalization</h5>

                                    <div className=" border border-slate-600 rounded-2xl px-4 my-2 py-2">
                                        <div className="mb-4 ">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Service
                                            </label>
                                            <div className="input-group">
                                                {!loading_service ? (
                                                    <SelectOption
                                                        onChange={
                                                            change_service
                                                        }
                                                        multiple={false}
                                                        data={services}
                                                    ></SelectOption>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="text-slate-500 text-md">
                                                    {" "}
                                                    Time
                                                </label>
                                                <div className="input-group mb-4">
                                                    <input
                                                        value={time}
                                                        onChange={(event) => {
                                                            setTime(
                                                                event.target
                                                                    .value
                                                            );
                                                        }}
                                                        className="form-control"
                                                        placeholder="Time"
                                                        aria-label="Time..."
                                                        type="time"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 ps-2">
                                                <label className="text-slate-500 text-md">
                                                    {" "}
                                                    Date
                                                </label>
                                                <div className="input-group">
                                                    <input
                                                        value={date}
                                                        onChange={(event) => {
                                                            setHospitalizationDate(
                                                                event.target
                                                                    .value
                                                            );
                                                        }}
                                                        type="date"
                                                        className="form-control"
                                                        placeholder="Date"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Bed
                                            </label>
                                            <div className="input-group mb-4">
                                                {!loading_bed ? (
                                                    <SelectOption
                                                        onChange={change_bed}
                                                        multiple={false}
                                                        data={beds}
                                                    ></SelectOption>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Doctor
                                            </label>
                                            <div className="input-group mb-4">
                                                {!loading_doctor ? (
                                                    <SelectOption
                                                        onChange={change_doctor}
                                                        multiple={false}
                                                        data={doctors}
                                                    ></SelectOption>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="w-full my-2 mb-4">
                            <div className="card">
                                <div className="card-body pt-3">
                                    <h5>Patient</h5>

                                    <div className=" border border-slate-600 rounded-2xl px-4 my-2 py-2">
                                        <div className="mb-4 ">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Patient
                                            </label>
                                            <div className="input-group">
                                                {!loading_patient ? (
                                                    <SelectOption
                                                        onChange={
                                                            change_patient
                                                        }
                                                        multiple={false}
                                                        data={patients}
                                                    ></SelectOption>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="mb-4 ">
                                            <label className="text-slate-500 text-md">
                                                {" "}
                                                Patient referred or referred by
                                                Nurse
                                            </label>
                                            <div className="input-group">
                                                {!loading_nurse ? (
                                                    <SelectOption
                                                        onChange={change_nurse}
                                                        multiple={false}
                                                        data={nurses}
                                                    ></SelectOption>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row px-2">
                        <button
                            onClick={(event) => submit(event)}
                            type="submit"
                            className="btn bg-gradient-info w-full"
                        >
                            submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
