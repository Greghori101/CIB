import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function NewsForm({ patient, hide }) {
    const url = process.env.REACT_APP_MED_GUARD_API_URL;
    const token = window.localStorage.getItem("token");
    const user_id = window.localStorage.getItem("user_id");

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [summary, setSummary] = useState("");
    const [uploaded_images, setUploadedImages] = useState([]);

    const handleFileUpload = (event) => {
        event.preventDefault();
        const files = event.target.files;
        const updatedImages = [...uploaded_images];

        for (let i = 0; i < files.length; i++) {
            if (updatedImages.length < 20) {
                updatedImages.push(files[i]);
            }
        }

        setUploadedImages(updatedImages);
    };

    const handleRemoveImage = (event, index) => {
        event.preventDefault();
        const updatedImages = [...uploaded_images];
        updatedImages.splice(index, 1);
        setUploadedImages(updatedImages);
    };

    let navigate = useNavigate();

    const submit = async(event) => {
        event.preventDefault();
        await axios({
            // Endpoint to send files
            url: url + "/posts/create",
            method: "post",
            data: {
                details,
                uploaded_images,
                title,
                summary,
                user_id,
            },
            headers: {
                "Content-Type": "multipart/form-data",
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

    useEffect(() => {}, []);

    return (
        <div
            className="relative flex flex-col max-w-[70%] break-words w-full bg-slate-100  shadow-lg rounded-2xl border-0 m-auto"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="rounded-t-2xl px-4 py-4 mb-0 align-middle">
                <div className="text-center flex justify-between">
                    <h6 className="text-slate-700 text-xl font-bold uppercase">
                        Create Post
                    </h6>
                    <button
                        className="text-white bg-red-600 hover:bg-white hover:border hover:border-solid hover:!text-red-600 w-[32px] h-8 rounded-full shadow hover:shadow-lg outline-none  ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                            hide();
                        }}
                    >
                        <i className="fa-solid fa-close"></i>
                    </button>
                </div>
            </div>
            <div className="flex-auto px-4 pb-4">
                <form>
                    <h6 className="text-slate-400 text-sm my-2 font-bold uppercase">
                        Post details
                    </h6>
                    <div className="flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="mb-4 ">
                                <label className="text-slate-500 text-md">
                                    {" "}
                                    Title
                                </label>
                                <div className="input-group">
                                    <input
                                        value={title}
                                        onChange={(event) => {
                                            setTitle(event.target.value);
                                        }}
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Title"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="text-slate-500 text-md">
                                    {" "}
                                    Summary
                                </label>
                                <div className="input-group mb-4">
                                    <input
                                        value={summary}
                                        onChange={(event) => {
                                            setSummary(event.target.value);
                                        }}
                                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="summary"
                                        aria-label="summary..."
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="text-slate-500 text-md">
                                    {" "}
                                    Details
                                </label>
                                <div className="input-group">
                                    <textarea
                                        value={details}
                                        onChange={(event) => {
                                            setDetails(event.target.value);
                                        }}
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Details"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="text-slate-500 text-md">
                                    {" "}
                                    Upload Photos
                                </label>
                                <div className="flex flex-row  w-full  overflow-auto">
                                    <div>
                                        <label className="text-slate-500 text-md">
                                            <div className="w-[200px] h-[120px] rounded-xl border-dashed border-2 border-slate-200px text-slate-500 flex justify-center items-center p-4 hover:cursor-pointer hover:border-blue-500 transition-all duration-200 ease-in-out text-xl hover:text-blue-500 hover:border-solid">
                                                <i className="fa-solid fa-add p-2"></i>{" "}
                                                Add Image{" "}
                                            </div>
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleFileUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    {uploaded_images.map((image, index) => (
                                        <div
                                            key={index}
                                            className="relative min-w-fit mx-2"
                                        >
                                            <img
                                                src={URL.createObjectURL(image)}
                                                className="w-[200px] h-[120px] object-fit rounded-xl "
                                                alt={`uploaded-image-${index}`}
                                            />
                                            <button
                                                className="absolute top-0 right-0 m-2 rounded-full bg-black bg-opacity-50 text-white !w-8 h-8 hover:text-red-600 transition-all duration-200"
                                                onClick={(event) =>
                                                    handleRemoveImage(
                                                        event,
                                                        index
                                                    )
                                                }
                                            >
                                                <i className="fa-solid fa-close"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className=" text-white bg-sky-600 active:bg-sky-700 font-bold capitalize text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={(event) => submit(event)}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
