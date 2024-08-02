import { useEffect, useState } from "react";
import axios from "axios";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Scanner() {
    const url_ai = process.env.REACT_APP_AID_API_URL;
    const token = window.localStorage.getItem("token");
    const user_id = window.localStorage.getItem("user_id");

    const [uploaded_image, setUploadedImage] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [predictionResult, setPredictionResult] = useState("NOT YET");
    const [loading, setLoading] = useState(false);
    const [showCheckIcon, setShowCheckIcon] = useState(false);

    useEffect(() => {
        setInitialized(true);
    }, []);

    const handleFileUpload = (event) => {
        setUploadedImage(event.target.files[0]);
    };

    const deleteImage = () => {
        setUploadedImage(null);
        setShowCheckIcon(false);
    };

    let navigate = useNavigate();

    const submit = async (event) => {
        event.preventDefault();
        setLoading(true);
        let data = new FormData();
        data.append("uploaded_image", uploaded_image);
      
        await axios
          .post(`${url_ai}/predict`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
            },
            crossdomain: true,
          })
          // Handle the response from the backend here
          .then((response) => {
            setLoading(false);
            setShowCheckIcon(true);
            setPredictionResult(response.data.prediction);
          })
          // Catch errors if any
          .catch((error) => {
            setLoading(false);
            if (error.response && error.response.status === 401) {
              Swal.fire({
                title: "Please sign in",
                text: "You are not signed in",
                icon: "error",
              }).then(() => {
                window.localStorage.clear();
                navigate("/login");
              });
            } else if (error.response && error.response.status === 500) {
              navigate("/500");
            } else {
              Swal.fire({
                title: error.response?.statusText,
                text: error.response?.data?.message,
                icon: "error",
              });
            }
          });
      };
      

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <div className="flex justify-center items-center">
            <div className="relative flex flex-col mx-2 break-words w-full bg-slate-100 shadow-lg rounded-2xl border-0">
                <div className="flex-auto px-4 pb-4 py-4">
                    <form>
                        <h6 className="text-slate-400 text-sm my-2 font-bold uppercase">
                            Post details
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                <div className="mb-4 text-center">
                                    <div className="flex flex-row w-full justify-center">
                                        <div>
                                            {uploaded_image ? (
                                                <div
                                                    className={`w-[400px] h-[400px] relative rounded-xl bg-gradient-to-b from-transparent to-opacity-100 flex justify-center items-center flex-shrink-0 overflow-hidden text-white ${
                                                        loading
                                                            ? "animate-pulse"
                                                            : ""
                                                    }`}
                                                    style={{
                                                        backgroundImage: `url(${uploaded_image})`,
                                                        backgroundPosition:
                                                            "center",
                                                        backgroundSize:
                                                            "contain",
                                                        backgroundRepeat:
                                                            "no-repeat",
                                                        backgroundSize: "fit",
                                                    }}
                                                >
                                                    <button
                                                        className="absolute z-30 top-0 hover:text-red-600 right-0 m-2 rounded-full bg-black bg-opacity-50  !w-8 h-8  transition-all duration-200"
                                                        onClick={deleteImage}
                                                    >
                                                        <i className="fa-solid fa-close"></i>
                                                    </button>
                                                </div>
                                            ) : (
                                                <label className="text-slate-500 text-md">
                                                    <div className="w-[500px] h-[400px] rounded-xl border-dashed border-2 border-slate-200px text-slate-500 flex justify-center items-center p-4 hover:cursor-pointer hover:border-blue-500 transition-all duration-200 ease-in-out text-xl hover:text-blue-500 hover:border-solid">
                                                        <>
                                                            <i className="fa-solid fa-add p-2"></i>{" "}
                                                            Add Image
                                                        </>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={
                                                            handleFileUpload
                                                        }
                                                        className="hidden"
                                                    />
                                                </label>
                                            )}
                                        </div>
                                        {uploaded_image && (
                                            <div className="relative min-w-fit mx-2"></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {predictionResult && (
                            <div className="text-center mt-4 ">
                                <div className="bg-gray-200 p-4 rounded ">
                                    <p className="text-slate-500 text-lg">
                                        Prediction Result:
                                    </p>
                                    <p className="text-slate-700">
                                        {predictionResult}
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-center mt-4">
                            <button
                                className="text-white bg-sky-600 active:bg-sky-700 font-bold capitalize text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={submit}
                                disabled={!uploaded_image || loading}
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white-900 mr-2" />
                                        Predicting...
                                    </div>
                                ) : (
                                    <>
                                        {showCheckIcon ? (
                                            <div className="flex items-center">
                                                <i className="fa-solid fa-check-circle text-green-500 mr-2"></i>
                                                Predicted
                                            </div>
                                        ) : (
                                            "Predict"
                                        )}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
