import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loaders/Loading";
import IndexNavbar from "../../Components/Navbars/IndexNavbar";
import Footer from "../../Components/Footers/Footer";

export default function ForgotPassword() {
	const url = process.env.REACT_APP_MED_GUARD_API_URL;
	const [email, setEmail] = React.useState("");
	const [action, setActionButton] = React.useState("Send Now");
	const [loading, setLoading] = React.useState(false);

	let navigate = useNavigate();

	const send = () => {
		let data = {
			email,
		};
		axios({
			// Endpoint to send files
			url: url + "/forgotpassword",
			method: "POST",
			headers: {
				Accept: "Application/json",
			},

			// Attaching the form data
			data: data,
		})
			// Handle the response from backend here
			.then((response) => {
				Swal.fire({
					title: "Password restore success",
					text: "Verify Your Email",
					icon: "success",

					iconColor: "#3dc00c",
				}).then(async () => {
					setActionButton("Resend");
					setLoading(false);
				});
			})

			// Catch errors if any
			.catch((error) => {
				Swal.fire({
					title: "Bad credentials!",
					text: "Verify your email or password.",
					icon: "error",
				});
				setLoading(false);
			});
	};

	useEffect(() => {
		const token = window.localStorage.getItem("token");
		if (token) {
			navigate("/dashboard");
		}
	}, []);

	return (
		<section className="relative w-full h-full py-40">
			<img src={require("../../assets/img/bg-auth.jpg")} className="absolute top-0 left-0 -z-20 brightness-95 blur-[2px] h-full w-full"></img>
			<div className="container mx-auto px-4">
				<div className="flex content-center  justify-center">
					<div className="w-full lg:w-6/12 px-4">
						<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg bg-gradient-to-t from-white to-slate-100 border-1 border-sky-100 py-4">
							<div className="flex-auto px-4 lg:px-10">
								<Link className="flex m-0 flex-nowrap items-center w-full justify-center" to={"/"}>
									<img src={require("../../assets/img/logo.png")} className="mr-4 rounded-full w-16" alt="" />
								</Link>
								<div className="text-slate-400 text-center mb-3 font-bold">
									<h4>Password Recovery</h4>
								</div>
								<form>
									<div className="relative w-full mb-3">
										<label className="block capitalize text-slate-600 text-xs font-bold mb-2" htmlFor="grid-password">
											Email
										</label>
										<input
											type="email"
											className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
											placeholder="Email"
											onChange={(event) => {
												setEmail(event.target.value);
											}}
										/>
									</div>
									<div className="text-center mt-3">
										<button
											className="btn bg-gradient-info w-100"
											type="button"
											onClick={(event) => {
												event.preventDefault();
												setLoading(true);

												send();
											}}
										>
											{loading ? <Loading width="20px" height={"20px"} color="white" weight={"2px"}></Loading> : ""}
											{action}
										</button>
									</div>
									<Link to={"/login"}>
										<u>Back to login</u>
									</Link>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
