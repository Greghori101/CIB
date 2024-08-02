import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NewsForm from "../../Components/Forms/NewsForm";
import { ReactComponent as Icon } from "../../assets/img/no-tasks.svg";
import moment from "moment/moment";

export default function News({ limit }) {
    const url = process.env.REACT_APP_MED_GUARD_API_URL;
    const token = window.localStorage.getItem("token");
    const role = window.localStorage.getItem("role");
    const [form, setForm] = useState(false);

    const [newsdetails, setEmployee] = useState({});
    const [method, setMethod] = useState("add");
    const navigate = useNavigate();
    const [news, setNews] = useState([]);

    const getNews = async () => {
        let options = {
            method: "get",
            url: url + "/posts",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        };
        axios(options)
            .then((response) => {
                setNews(response.data);
            })
            .catch((error) => {
                if (error.response) {
                } else if (error.response.status === 401) {
                    Swal.fire({
                        title: "Please sign in",
                        text: "You are not signed in",
                        icon: "error",
                    }).then(() => {
                        window.localStorage.clear();
                        navigate("/login");
                    });
                }
                if (error.response) {
                } else if (error.response.status === 500) {
                    navigate("/500");
                } else if (error.response) {
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

    const showForm = (action, data) => {
        document.body.style.overflow = "hidden";
        setMethod(action);
        setEmployee(data);
        setForm(true);
    };
    const hide = () => {
        document.body.style.overflow = "auto";
        setForm(false);
    };
    const destroy = (id) => {
        axios({
            // Endpoint to send files
            url: url + "/admin/news/" + id + "/delete",
            method: "delete",
            headers: {
                Accept: "Application/json",
                Authorization: "Bearer " + token,
            },
        })
            // Handle the response from backend here
            .then((response) => {
                Swal.fire({
                    title: "Go to dashboard",
                    text: "You are successfuly logged in .",
                    icon: "success",

                    iconColor: "#3dc00c",
                });
                getNews();
            })

            // Catch errors if any
            .catch((error) => {
                if (error.response) {
                } else if (error.response.status === 401) {
                    Swal.fire({
                        title: "Please sign in",
                        text: "You are not signed in",
                        icon: "error",
                    }).then(() => {
                        window.localStorage.clear();
                        navigate("/login");
                    });
                }
                if (error.response) {
                } else if (error.response.status === 500) {
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
    useEffect(() => {
        console.log(news);
        getNews();
    }, []);
    return (
        <>
            {form ? (
                <div
                    className="fixed bg-black bg-opacity-25 top-0 left-0 z-50 w-full h-screen flex justify-center align-middle items-center overflow-auto py-4"
                    onClick={() => {
                        document.body.style.overflow = "auto";
                        hide();
                    }}
                >
                    <NewsForm
                        action={method}
                        data={newsdetails}
                        hide={hide}
                        getNews={getNews}
                    ></NewsForm>
                </div>
            ) : (
                ""
            )}
            <section className="py-3">
                <div className="container">
                    <div className="flex flex-row justify-between items-center">
                        <h2
                            spellCheck="false"
                            className=" text-white rounded-xl"
                        >
                            Checkout the latest news
                        </h2>
                        {role === "admin" ? (
                            <button
                                onClick={(event) => {
                                    showForm(event);
                                }}
                            >
                                <i className="bg-white fa-solid fa-add hover:text-blue-600 font-bold border-1 border-slate-100 rounded-full p-2 shadow-lg"></i>
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="row">
                        {!news || news.length == 0 ? (
                            <div className="bg-white rounded-xl shadow-lg flex w-full justify-center items-center flex-col my-2 py-6">
                                <Icon />

                                <h2 className="mt-4">No Result Found</h2>
                                <spam className="max-w-lg text-center">
                                    Please try again or insert some data.
                                </spam>
                            </div>
                        ) : (
                            ""
                        )}
                        {news.map((post, id) => {
                            return (
                                <div key={id} className="w-full my-2 mb-4">
                                    <div className="card">
                                        <div className="card-body pt-3">
                                            <Link
                                                to={"/news/details/" + post.id}
                                                className="text-slate-600 text-xl font-bold"
                                            >
                                                {post.title}
                                            </Link>
                                            <p className="card-description mb-4">
                                                {post.summary}
                                            </p>
                                            <div className="author align-items-center">
                                                <img
                                                    src={`data:image/${post.author.profile_picture.extension};base64,${post.author.profile_picture.content}`}
                                                    alt="..."
                                                    className="avatar shadow"
                                                />
                                                <div className="name ps-3">
                                                    <span>
                                                        {post.author.email}
                                                    </span>
                                                    <div className="stats">
                                                        <small>
                                                            Posted on{" "}
                                                            {moment(
                                                                post.created_at
                                                            ).format(
                                                                "MMMM Do YYYY, h a"
                                                            )}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {limit && news?.length !== 0 && news ? (
                        <div className="flex justify-end">
                            <button
                                role="button"
                                className="btn bg-gradient-info"
                                onClick={() => {
                                    navigate("/news");
                                }}
                            >
                                See More{" "}
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </section>
        </>
    );
}
