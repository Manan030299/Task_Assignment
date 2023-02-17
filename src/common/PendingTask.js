import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    plugins: {
        title: {
            display: true,
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

const labels = ['Mayank', 'Vaibhav', 'Manan'];

export const data = {
    labels,
    datasets: [
        {
            barThickness: 40,
            label: 'To-Do',
            backgroundColor: '#f2d245',
            
            data: ['7', '12', '10']
        },
        {
            barThickness: 40,
            label: 'In-Progress',
            backgroundColor: '#2385ff',
            data: ['6', '4', '2'],
        },
    ],
};

export const PendingTask = () => {
    return <Bar options={options} data={data} />;
}
