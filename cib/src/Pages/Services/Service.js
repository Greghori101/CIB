import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Service() {
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
        <section className="py-4">
            <div className="container">
                <div className="row">
                    <div className="w-full my-2 mb-4">
                        <div className="relative card mb-2   !bg-black/50 !rounded-xl">
                            <img
                                src={require("../../assets/img/service-bg.jpg")}
                                className="absolute w-full h-full object-cover -z-50 rounded-xl"
                            ></img>
                            <div className=" card-body pt-8 ">
                                <div className="card-title h5 d-block ">
                                    <h1 className="!text-white">Gynecology</h1>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body pt-3">
                                <div className="flex flex-row text-sm">
                                    <div className="flex flex-col p-4">
                                        <h4>Présentation</h4>
                                        <ul>
                                            <li>
                                                {" "}
                                                Médecin chef de service :
                                                <b> Dr KHECHFOUD HASSAN</b>{" "}
                                                Maitre Assistant en
                                                Neurochirurgie.{" "}
                                            </li>
                                            <li>
                                                Personnel médical :
                                                <b>
                                                    {" "}
                                                    Tous les Spécialistes
                                                    chirurgiens
                                                </b>
                                                .
                                            </li>
                                            <li>
                                                Personnel paramédical :{" "}
                                                <b>
                                                    26 Instrumentistes ,17
                                                    Anesthésistes.
                                                </b>
                                            </li>
                                            <li>
                                                Nombre d'unité :
                                                <b>
                                                    {" "}
                                                    02 (Bloc froid- Bloc
                                                    urgence).
                                                </b>
                                            </li>
                                            <li>
                                                Date de création : <b>1990</b>
                                            </li>
                                        </ul>
                                        <h4>Activité principale</h4>
                                        <ul>
                                            <li>
                                                Réalisation d'Interventions
                                                Chirurgicales en chirurgie
                                                viscérale Orthopédique,
                                                Neurochirurgie et chirurgie
                                                infantile.
                                            </li>
                                        </ul>
                                        <h4>Perspectives du service </h4>
                                        <ul>
                                            <li>
                                                La mise en disposition de tous
                                                les moyens nécessaires pour
                                                effectuer des interventions
                                                chirurgicales.
                                            </li>
                                            <li>
                                                Amélioré les prestations de
                                                soins fournies au patient et
                                                assurer une qualité de soins
                                                optimale.
                                            </li>
                                            <li>
                                                Promouvoir les nouvelles
                                                technologies pour la sécurité
                                                des patients.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="flex flex-col pt-4 w-[250px]">
                                        <h5 className="rounded bg-blue-500 text-white pl-2">
                                            Contact
                                        </h5>
                                        <div className="flex flex-col justify-center">
                                            <div className="flex flex-row items-center p-2 border-b-2 border-dotted">
                                                <lable className="mr-2">
                                                    Tel:
                                                </lable>
                                                <b>test@test.com</b>
                                            </div>
                                            <div className="flex flex-row items-center p-2 border-b-2 border-dotted">
                                                <lable className="mr-2">
                                                    Fax:
                                                </lable>
                                                <b>test@test.com</b>
                                            </div>
                                            <div className="flex flex-row items-center p-2 border-b-2 border-dotted">
                                                <lable className="mr-2">
                                                    Email:
                                                </lable>
                                                <b>test@test.com</b>
                                            </div>
                                            <div className="flex flex-row items-center p-2 border-b-2 border-dotted">
                                                <lable className="mr-2">
                                                    Email:
                                                </lable>
                                                <b>test@test.com</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row  w-full  overflow-auto">
                                    <div className=" min-w-fit m-2 ">
                                        <img
                                            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                                            alt="image 1"
                                            className="w-[400px] h-[200px] object-cover rounded-xl"
                                        />
                                    </div>
                                    <div className=" min-w-fit m-2">
                                        <img
                                            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                                            alt="image 1"
                                            className="w-[400px] h-[200px] object-cover rounded-xl"
                                        />
                                    </div>
                                    <div className=" min-w-fit m-2">
                                        <img
                                            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                                            className="w-[400px] h-[200px] object-cover rounded-xl"
                                            alt="image 1"
                                        />
                                    </div>
                                    <div className=" min-w-fit m-2">
                                        <img
                                            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                                            className="w-[400px] h-[200px] object-cover rounded-xl"
                                            alt="image 1"
                                        />
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
