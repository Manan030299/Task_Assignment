import React, { useEffect, useState } from 'react'
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

export const PendingTask = ({usersIssue}) => {

    useEffect(() => {
        const pendingIssue = {};
        usersIssue.forEach(issue => {
            if (pendingIssue[issue.assignee] === undefined) {
                pendingIssue[issue.assignee] = (issue.todo) + (issue.inprogress)  
            } else {
                pendingIssue[issue.assignee] = (issue.todo) + (issue.inprogress)  
            }
        });
        console.log(pendingIssue)
        const topThreeUsers = {}
        const PendingIssueList = Object.values(pendingIssue).sort((a,b) => {
            return b-a
        })
        const pendingIssueUser = Object.keys(pendingIssue)
        for(let key of pendingIssueUser){
            if(pendingIssue[key] === PendingIssueList[0]){
                console.log(pendingIssue)
            }
            if(pendingIssue[key] === PendingIssueList[1]){
                console.log(key)
            }
            if(pendingIssue[key] === PendingIssueList[2]){
                console.log(key)
            }
        }

    },[])

    const labels = [] 
    const data = {
        labels,
        datasets: [
            {
                barThickness: 40,
                label: 'To-Do',
                backgroundColor: '#f2d245',
                data: []
            },
            {
                barThickness: 40,
                label: 'In-Progress',
                backgroundColor: '#2385ff',
                data: []
            },
        ],
    };
    return <Bar options={options} data={data} />;
}
