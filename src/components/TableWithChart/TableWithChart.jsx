import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TableWithChart.scss";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const dataRows = [
    { id: 1, label: "Выручка, руб", values: [480521, 500521, 480521], today: "500 521", yesterday: "480 521", week: "480 521", tax: 4 },
    { id: 2, label: "Наличные", values: [300000, 300000, 300000], today: "300 000", yesterday: "300 000", week: "300 000", tax: 0 },
    { id: 3, label: "Безналичный расчет", values: [100000, 100000, 100000], today: "100 000", yesterday: "100 000", week: "100 000", tax: 0 },
    { id: 4, label: "Кредитные карты", values: [100521, 100521, 100521], today: "100 521", yesterday: "100 521", week: "100 521", tax: 0 },
    { id: 5, label: "Средний чек руб.", values: [900, 1300, 900], today: "1 300", yesterday: "900", week: "900", tax: 44 },
    { id: 6, label: "Средний гость руб.", values: [800, 1200, 800], today: "1200", yesterday: "800", week: "800", tax: 50 },
    { id: 7, label: "Удаление из чека (после оплаты) руб.", values: [1100, 1000, 900], today: "1000", yesterday: "1100", week: "900", tax: -9 },
    { id: 8, label: "Удаление до чека (после оплаты) руб.", values: [1300, 1300, 900], today: "1300", yesterday: "1300", week: "900", tax: 0 },
    { id: 9, label: "Количество чеков", values: [36, 34, 34], today: "34", yesterday: "36", week: "34", tax: -6 },
    { id: 10, label: "Количество гостей", values: [36, 34, 32], today: "34", yesterday: "36", week: "32", tax: -6 },
];

const TableWithChart = () => {
    const [selectedData, setSelectedData] = useState(null);

    return (
        <div className="container mt-5">
            <table className="table table-chart">
                <thead>
                <tr>
                    <th className="grey">Показатель</th>
                    <th className="blue">Текущий день</th>
                    <th className="grey">Вчера</th>
                    <th className="grey">Этот день недели</th>
                </tr>
                </thead>
                <tbody>
                {dataRows.map((row) => (
                    <React.Fragment key={row.id}>
                        <tr onClick={() => setSelectedData(selectedData?.id === row.id ? null : row)}>
                            <td className="grey">{row.label}</td>
                            <td className="blue text-end">{row.today}</td>
                            <td className={`text-end ${(row.tax < 0) ? "negative" : (row.tax > 0) ? "positive" : ""}`}>{row.yesterday} <span className={"tax"}>{row.tax}%</span></td>
                            <td className={`text-end ${(row.tax < 0) ? "negative" : (row.tax > 0) ? "positive" : ""}`}>{row.week}</td>
                        </tr>
                        {selectedData?.id === row.id && (
                            <tr className="chart-row">
                                <td colSpan="4">
                                    <Line
                                        data={{
                                            labels: ["Вчера", "Текущий день", "Этот день недели"],
                                            datasets: [
                                                {
                                                    label: selectedData.label,
                                                    data: selectedData.values,
                                                    borderColor: "rgba(75, 192, 192, 1)",
                                                    borderWidth: 2,
                                                    fill: false,
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                    display: false
                                                }
                                            }
                                        }}
                                    />
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableWithChart;
