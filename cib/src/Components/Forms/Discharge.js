import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminDischargeForm from "./AdminDischargeForm";
import InvoiceForm from "./InvoiceForm";

export default function Discharge({ patient, hide }) {
    const url = process.env.REACT_APP_GSM_API_URL;
    const token = window.localStorage.getItem("token");

    const [step, setStep] = useState(0);

    const next = (event) => {
        event.preventDefault();
        setStep(1);
    };

    let navigate = useNavigate();

    useEffect(() => {}, []);

    return (
        <>
            {step === 1 ? (
                <InvoiceForm patient={patient} hide={hide}></InvoiceForm>
            ) : step === 0 ? (
                <AdminDischargeForm
                    patient={patient}
                    next={next}
                ></AdminDischargeForm>
            ) : (
                ""
            )}
        </>
    );
}
