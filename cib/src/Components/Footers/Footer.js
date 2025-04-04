import React from "react";

export default function Footer() {
	return (
		<>
			<footer className="flex flex-col container">
				<div className="flex flex-row bg-white rounded-xl p-4 shadow-lg">
					<div className="col-lg-3 mb-5 mb-lg-0">
						<h6 className="text-uppercase mb-2">Hospital</h6>
						<p className="mb-4 pb-2">The next generation of design systems.</p>
						<a href="javascript:;" className="text-secondary me-xl-4 me-3">
							<span className="text-lg fab fa-facebook" aria-hidden="true" />
						</a>
						<a href="javascript:;" className="text-secondary me-xl-4 me-3">
							<span className="text-lg fab fa-twitter" aria-hidden="true" />
						</a>
						<a href="javascript:;" className="text-secondary me-xl-4 me-3">
							<span className="text-lg fab fa-instagram" aria-hidden="true" />
						</a>
						<a href="javascript:;" className="text-secondary me-xl-4 me-3">
							<span className="text-lg fab fa-pinterest" aria-hidden="true" />
						</a>
						<a href="javascript:;" className="text-secondary me-xl-4 me-3">
							<span className="text-lg fab fa-github" aria-hidden="true" />
						</a>
					</div>
					<div className="col-md-2 col-6 ms-lg-auto mb-md-0 mb-4">
						<h6 className="text-sm">Company</h6>
						<ul className="flex-column ms-n3 nav">
							<li className="nav-item">
								<a className="nav-link text-secondary" href="javascript:void(0);">
									About Us
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link text-secondary" href="javascript:;">
									Careers
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link text-secondary" href="javascript:;">
									Press
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link text-secondary" href="javascript:;">
									Blog
								</a>
							</li>
						</ul>
					</div>
					<div className="col-md-2 col-6 mb-md-0 mb-4">
						<h6 className="text-sm">Pages</h6>
						<ul className="flex-column ms-n3 nav">
							<li className="nav-item">
								<a className="nav-link text-secondary" href="javascript:;">
									Login
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link text-secondary" href="javascript:;">
									Register
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link text-secondary" href="javascript:;">
									Add list
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link text-secondary" href="javascript:;">
									Contact
								</a>
							</li>
						</ul>
					</div>
					<div className="col-md-2 col-6 mb-md-0 mb-4">
						<h6 className="text-sm">Legal</h6>
						<ul className="flex-column ms-n3 nav">
							<li className="nav-item">
								<a className="nav-link text-secondary" href="javascript:;">
									Terms
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link text-secondary" href="javascript:;">
									About Us
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link text-secondary" href="javascript:;">
									Team
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link text-secondary" href="javascript:;">
									Privacy
								</a>
							</li>
						</ul>
					</div>
					<div className="col-md-2 col-6 mb-md-0 mb-4">
						<h6 className="text-sm">Resources</h6>
						<ul className="flex-column ms-n3 nav">
							<li className="nav-item">
								<a className="nav-link text-secondary" href="javascript:;">
									Blog
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link text-secondary" href="javascript:;">
									Service
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link text-secondary" href="javascript:;">
									Product
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link text-secondary" href="javascript:;">
									Pricing
								</a>
							</li>
						</ul>
					</div>
				</div>
				<hr className="horizontal dark mt-4 mx-6" />
				<div className=" mx-6">
					<div className="col-8 mx-lg-auto text-lg-center">
						<p className="text-sm text-secondary">Copyright © 2022 Team Dev</p>
					</div>
				</div>
			</footer>
		</>
	);
}
