import { Line } from "react-chartjs-2";
import { useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LineElement,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LineElement,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function CardLineChart() {
    useEffect(() => {}, []);
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded bg-slate-700">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-slate-100 mb-1 text-xs font-semibold">
                                Overview
                            </h6>
                            <h2 className="text-white text-xl font-semibold">
                                Sales value
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative h-350-px">
                        <Line options={options} data={data}></Line>
                    </div>
                </div>
            </div>
        </>
    );
}

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Chart.js Line Chart",
        },
    },
};

export const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: new Date().getFullYear(),
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
        },
        {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: [40, 68, 86, 74, 56, 60, 87],
        },
    ],
};
