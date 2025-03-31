import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TableWithChart.scss";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const dataRows = [
    { id: 1, label: "Выручка, руб", values: [12, 19, 6, 5, 2, 3, 33], today: "500 521", yesterday: "480 521", week: "480 521", tax: 4 },
    { id: 2, label: "Наличные", values: [10, 15, 8, 33, 7, 9, 43], today: "300 000", yesterday: "300 000", week: "300 000", tax: 0 },
    { id: 3, label: "Безналичный расчет", values: [10, 15, 8, 24, 7, 9, 53], today: "100 000", yesterday: "100 000", week: "100 000", tax: 0 },
    { id: 4, label: "Кредитные карты", values: [10, 15, 8, 35, 7, 9, 39], today: "100 521", yesterday: "100 521", week: "100 521", tax: 0 },
    { id: 5, label: "Средний чек руб.", values: [10, 15, 8, 51, 7, 9, 42], today: "1 300", yesterday: "900", week: "900", tax: 44 },
    { id: 6, label: "Средний гость руб.", values: [10, 15, 8, 18, 7, 19, 34], today: "1200", yesterday: "800", week: "800", tax: 50 },
    { id: 7, label: "Удаление из чека (после оплаты) руб.", values: [10, 15, 8, 22, 7, 9, 37], today: "1000", yesterday: "1100", week: "900", tax: -9 },
    { id: 8, label: "Удаление до чека (после оплаты) руб.", values: [10, 15, 8, 36, 7, 9, 44], today: "1300", yesterday: "1300", week: "900", tax: 0 },
    { id: 9, label: "Количество чеков", values: [10, 15, 8, 25, 7, 9, 34], today: "34", yesterday: "36", week: "34", tax: -6 },
    { id: 10, label: "Количество гостей", values: [10, 15, 8, 12, 7, 9, 64], today: "34", yesterday: "36", week: "32", tax: -6 },
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
                                            labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
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
