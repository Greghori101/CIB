import { useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import IndexNavbar from "../../Components/Navbars/IndexNavbar";
import Footer from "../../Components/Footers/Footer";
import News from "../News/News";

export default function Index() {
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
				} else if (error.response) {
				} else if (error.response.status === 401) {
					window.localStorage.clear();
					navigate("/login");
				}
			});
	};

	useEffect(() => {}, []);

	return (
		<div>
			<IndexNavbar></IndexNavbar>
			<header>
				<div className="page-header min-vh-75">
					<div className="oblique position-absolute top-0 h-100 d-md-block d-none">
						<div
							className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n8"
							style={{
								backgroundImage:
									"url(https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)",
							}}
						/>
					</div>
					<div className="container">
						<div className="row">
							<div className="col-lg-6 col-md-7 d-flex justify-content-center flex-column">
								<h1 className="text-gradient text-info" spellCheck="false">
									Feel Better About
								</h1>
								<h1 className="mb-4" spellCheck="false">
									Finding Healthcare
								</h1>
								<p className="lead pe-5 me-5">The time is now for it be okay to be great. People in this world shun people for being nice. </p>
								<div className="buttons">
									<button
										type="button"
										className="btn mt-4 btn-dark"
										onClick={() => {
											navigate("/login");
										}}
									>
										Get Started
									</button>
									<button
										onClick={() => {
											navigate("/about");
										}}
										type="button"
										className="btn mt-4 btn-dark btn-simple bg-transparent shadow-none text-dark"
									>
										Read more
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<section>
				<div className="container">
					<div className="row text-center">
						<div className="col-12">
							<h3 className="m-5" spellCheck="false">
								What We Do
							</h3>
						</div>
						<div className="col-lg-3 col-md-6">
							<div className="info bg-white shadow-lg p-4 border-radius-lg">
								<div className="icon icon-shape mx-auto">
									<svg
										className="text-info"
										width="25px"
										height="25px"
										viewBox="0 0 42 42"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										xmlnsXlink="http://www.w3.org/1999/xlink"
									>
										<title>box-3d-50</title>
										<g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
											<g transform="translate(-2319.000000, -291.000000)" fill="#FFFFFF" fillRule="nonzero">
												<g transform="translate(1716.000000, 291.000000)">
													<g id="box-3d-50" transform="translate(603.000000, 0.000000)">
														<path
															className="color-foreground"
															d="M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z"
														/>
														<path
															className="color-background"
															d="M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z"
															opacity="0.7"
														/>
														<path
															className="color-background"
															d="M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z"
															opacity="0.7"
														/>
													</g>
												</g>
											</g>
										</g>
									</svg>
								</div>
								<h5 className="mt-0">24/7 Access</h5>
								<p>We get insulted by others, lose trust for those We get back.</p>
							</div>
						</div>
						<div className="col-lg-3 col-md-6">
							<div className="info bg-white shadow-lg p-4 border-radius-lg">
								<div className="icon icon-shape mx-auto">
									<svg
										className="text-info"
										width="25px"
										height="25px"
										viewBox="0 0 46 42"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										xmlnsXlink="http://www.w3.org/1999/xlink"
									>
										<title>customer-support</title>
										<g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
											<g transform="translate(-1717.000000, -291.000000)" fill="#FFFFFF" fillRule="nonzero">
												<g transform="translate(1716.000000, 291.000000)">
													<g transform="translate(1.000000, 0.000000)">
														<path
															className="color-background"
															d="M45,0 L26,0 C25.447,0 25,0.447 25,1 L25,20 C25,20.379 25.214,20.725 25.553,20.895 C25.694,20.965 25.848,21 26,21 C26.212,21 26.424,20.933 26.6,20.8 L34.333,15 L45,15 C45.553,15 46,14.553 46,14 L46,1 C46,0.447 45.553,0 45,0 Z"
															opacity="0.59858631"
														/>
														<path
															className="color-foreground"
															d="M22.883,32.86 C20.761,32.012 17.324,31 13,31 C8.676,31 5.239,32.012 3.116,32.86 C1.224,33.619 0,35.438 0,37.494 L0,41 C0,41.553 0.447,42 1,42 L25,42 C25.553,42 26,41.553 26,41 L26,37.494 C26,35.438 24.776,33.619 22.883,32.86 Z"
														/>
														<path
															className="color-foreground"
															d="M13,28 C17.432,28 21,22.529 21,18 C21,13.589 17.411,10 13,10 C8.589,10 5,13.589 5,18 C5,22.529 8.568,28 13,28 Z"
														/>
													</g>
												</g>
											</g>
										</g>
									</svg>
								</div>
								<h5 className="mt-0">Flexible Plans</h5>
								<p>We get insulted by others, lose trust for those We get back.</p>
							</div>
						</div>
						<div className="col-lg-3 col-md-6">
							<div className="info bg-white shadow-lg p-4 border-radius-lg">
								<div className="icon icon-shape mx-auto">
									<svg
										className="text-info"
										width="25px"
										height="25px"
										viewBox="0 0 40 40"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										xmlnsXlink="http://www.w3.org/1999/xlink"
									>
										<title>spaceship</title>
										<g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
											<g transform="translate(-1720.000000, -592.000000)" fill="#FFFFFF" fillRule="nonzero">
												<g transform="translate(1716.000000, 291.000000)">
													<g transform="translate(4.000000, 301.000000)">
														<path
															className="color-foreground"
															d="M39.3,0.706666667 C38.9660984,0.370464027 38.5048767,0.192278529 38.0316667,0.216666667 C14.6516667,1.43666667 6.015,22.2633333 5.93166667,22.4733333 C5.68236407,23.0926189 5.82664679,23.8009159 6.29833333,24.2733333 L15.7266667,33.7016667 C16.2013871,34.1756798 16.9140329,34.3188658 17.535,34.065 C17.7433333,33.98 38.4583333,25.2466667 39.7816667,1.97666667 C39.8087196,1.50414529 39.6335979,1.04240574 39.3,0.706666667 Z M25.69,19.0233333 C24.7367525,19.9768687 23.3029475,20.2622391 22.0572426,19.7463614 C20.8115377,19.2304837 19.9992882,18.0149658 19.9992882,16.6666667 C19.9992882,15.3183676 20.8115377,14.1028496 22.0572426,13.5869719 C23.3029475,13.0710943 24.7367525,13.3564646 25.69,14.31 C26.9912731,15.6116662 26.9912731,17.7216672 25.69,19.0233333 L25.69,19.0233333 Z"
														/>
														<path
															className="color-foreground"
															d="M1.855,31.4066667 C3.05106558,30.2024182 4.79973884,29.7296005 6.43969145,30.1670277 C8.07964407,30.6044549 9.36054508,31.8853559 9.7979723,33.5253085 C10.2353995,35.1652612 9.76258177,36.9139344 8.55833333,38.11 C6.70666667,39.9616667 0,40 0,40 C0,40 0,33.2566667 1.855,31.4066667 Z"
														/>
														<path
															className="color-background"
															d="M17.2616667,3.90166667 C12.4943643,3.07192755 7.62174065,4.61673894 4.20333333,8.04166667 C3.31200265,8.94126033 2.53706177,9.94913142 1.89666667,11.0416667 C1.5109569,11.6966059 1.61721591,12.5295394 2.155,13.0666667 L5.47,16.3833333 C8.55036617,11.4946947 12.5559074,7.25476565 17.2616667,3.90166667 L17.2616667,3.90166667 Z"
															opacity="0.598539807"
														/>
														<path
															className="color-background"
															d="M36.0983333,22.7383333 C36.9280725,27.5056357 35.3832611,32.3782594 31.9583333,35.7966667 C31.0587397,36.6879974 30.0508686,37.4629382 28.9583333,38.1033333 C28.3033941,38.4890431 27.4704606,38.3827841 26.9333333,37.845 L23.6166667,34.53 C28.5053053,31.4496338 32.7452344,27.4440926 36.0983333,22.7383333 L36.0983333,22.7383333 Z"
															id="color-3"
															opacity="0.598539807"
														/>
													</g>
												</g>
											</g>
										</g>
									</svg>
								</div>
								<h5 className="mt-0">Best Doctors</h5>
								<p>We get insulted by others, lose trust for those We get back.</p>
							</div>
						</div>
						<div className="col-lg-3 col-md-6">
							<div className="info bg-white shadow-lg p-4 border-radius-lg">
								<div className="icon icon-shape mx-auto">
									<svg
										className="text-info"
										width="25px"
										height="25px"
										viewBox="0 0 43 36"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										xmlnsXlink="http://www.w3.org/1999/xlink"
									>
										<title>credit-card</title>
										<g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
											<g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fillRule="nonzero">
												<g transform="translate(1716.000000, 291.000000)">
													<g id="credit-card" transform="translate(453.000000, 454.000000)">
														<path
															className="color-background"
															d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
															opacity="0.593633743"
														></path>
														<path
															className="color-foreground"
															d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
														/>
													</g>
												</g>
											</g>
										</g>
									</svg>
								</div>
								<h5 className="mt-0">Affordable Prices</h5>
								<p>We get insulted by others, lose trust for those We get back.</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="container py-5">
					<div className="row align-items-center">
						<div className="mx-0 my-4 col-md-6">
							<div className="blur-shadow-image text-center">
								<img
									src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
									alt="img-blur-shadow"
									className="img-fluid shadow border-radius-lg max-height-600"
								/>
							</div>
						</div>
						<div className="mx-0 my-4 col-md-6 mb-md-0 mb-4 ps-5 mt-md-0 mt-4">
							<h3 className="mb-3" spellCheck="false">
								Find the right doctor right at your fingertips
							</h3>
							<p className="mb-md-5 mb-4">
								It really matters and then like it really doesn't matter. What matters is the people who are sparked by it. And the people who are like offended by it, it doesn't
								matter. Because it's about motivating the doers. Because I'm here to follow my dreams and inspire other people to follow their dreams, too.
							</p>
							<button
								className="btn bg-gradient-info"
								onClick={() => {
									navigate("/appointment/form");
								}}
							>
								Make Appointment
							</button>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="container">
					<div className="row">
						<div className="mx-0 my-4 col-lg-6">
							<h3 className="text-gradient text-info mb-0 mt-2" spellCheck="false">
								Why people choose us
							</h3>
							<h3 spellCheck="false" />
							<p>
								Pain is what we go through as we become older. We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give
								others a hand.
							</p>
							<Link to={"/about"} className="text-dark icon-move-right">
								More about us
								<i className="fas fa-arrow-right text-sm ms-1" aria-hidden="true" />
							</Link>
						</div>
						<div className="mx-0 my-4 col-lg-6 mt-lg-0 mt-5 ps-lg-0 ps-0">
							<div className="p-3 info-horizontal">
								<div className="icon icon-shape rounded-circle shadow text-center bg-gradient-dark">
									<i className="fas fa-ship opacity-10" aria-hidden="true" />
								</div>
								<div className="description ps-3">
									<p className="mb-0">
										It becomes harder for us to give others a hand. <br /> We get our heart broken by people we love.
									</p>
								</div>
							</div>
							<div className="p-3 info-horizontal">
								<div className="icon icon-shape rounded-circle shadow text-center bg-gradient-dark">
									<i className="fas fa-handshake opacity-10" aria-hidden="true" />
								</div>
								<div className="description ps-3">
									<p className="mb-0">
										As we live, our hearts turn colder. <br />
										Cause pain is what we go through as we become older.
									</p>
								</div>
							</div>
							<div className="p-3 info-horizontal">
								<div className="icon icon-shape rounded-circle shadow text-center bg-gradient-dark">
									<i className="fas fa-hourglass opacity-10" aria-hidden="true" />
								</div>
								<div className="description ps-3">
									<p className="mb-0">
										When we lose family over time. <br /> What else could rust the heart more over time? Blackgold.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="row m-0">
					<div className="col-6 text-center mx-auto mt-5 mb-4">
						<h2 spellCheck="false">See Our Mission</h2>
						<p>See what people from all around the world are saying about our website.</p>
					</div>
				</div>
				<div className="row m-0">
					<div className="col-10 mx-auto">
						<div className="card border-radius-md">
							<video controls="true" className="border-radius-md shadow-sm">
								<source src="https://player.vimeo.com/external/371911097.sd.mp4?s=d58e8d2d5403738610735f6ac579d13cff1cb97a&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
							</video>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="container py-5">
					<div className="row">
						<div className="mx-auto my-4 col-md-7  text-center mb-5">
							<h3 className="text-gradient text-info mb-0">Where to find us?</h3>
							<h3 spellCheck="false" className=" flex justify-center items-end">
								<img src={require("../../assets/img/pin.webp")} className="w-6 mr-4"></img> Batna, Ain-Djasser{" "}
							</h3>
						</div>
					</div>
					<div className="row align-items-center">
						<div className="mx-0 my-4 w-full">
							<div className="rounded-xl shadow-lg  text-center">
								<img
									src={require("../../assets/img/clinic-location.PNG")}
									alt="img-blur-shadow"
									className="img-fluid shadow rounded-xl max-height-600 w-full border-slate-400 border-dotted border-2"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer></Footer>
		</div>
	);
}
