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
import { blue, yellow } from '@mui/material/colors';

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
            backgroundColor: yellow[600],
            data: ['7', '12', '10']
        },
        {
            barThickness: 40,
            label: 'In-Progress',
            backgroundColor: blue[500],
            data: ['6', '4', '2'],
        },
    ],
};

export const StackBarProgress = () => {
    return <Bar options={options} data={data} />;
}
