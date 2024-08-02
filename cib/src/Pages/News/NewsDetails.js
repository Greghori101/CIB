import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";
import Swal from "sweetalert2";

export default function NewsDetails() {
    const url = process.env.REACT_APP_MED_GUARD_API_URL;
    const token = window.localStorage.getItem("token");
    let { id } = useParams();
    const [post, setNews] = useState(null);
    let navigate = useNavigate();

    const get_post = async () => {
        let options = {
            method: "get",
            url: url + "/posts/" + id,
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
                } else {
                    navigate("/404");
                }
            });
    };
    useEffect(() => {
        get_post();
    }, []);

    return (
        <section className="py-6">
            <div className="container">
                <div className="row mx-6">
                        <div className="w-full mb-lg-0 mb-4">
                            <div className="card">
                                <div className="card-header p-0 mx-3 mt-3 position-relative z-index-1 overflow-auto flex-row flex-nowrap flex gap-4">
                                    {post?.images.map((image, id) => {
                                        return (
                                                <img key={id}
                                                    src={`data:image/${image.extension};base64,${image.content}`}
                                                    className="img-fluid border-radius-lg max-h-[500px] "
                                                />
                                        );
                                    })}
                                </div>
                                <div className="card-body pt-3">
                                    <a className="card-title h5 d-block text-darker">
                                        {post?.title}
                                    </a>
                                    <p className="card-description mb-4">
                                        {post?.details}
                                    </p>
                                    <div className="author align-items-center">
                                        <img
                                            src={`data:image/${post?.author.profile_picture.extension};base64,${post?.author.profile_picture.content}`}
                                            alt="..."
                                            className="avatar shadow"
                                        />
                                        <div className="name ps-3">
                                            <span>{post?.author.email}</span>
                                            <div className="stats">
                                                <small>
                                                    Posted on{" "}
                                                    {moment(
                                                        post?.created_at
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
                </div>
            </div>
        </section>
    );
}
