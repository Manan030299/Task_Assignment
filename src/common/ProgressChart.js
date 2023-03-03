import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend,);

export const ProgressChart = ({usersIssue}) => {

    const [status, setStatus] = useState({})

    useEffect(() =>{
        const issueList = usersIssue;
        console.log(issueList)

        let todo = 0
        let inprogress = 0
        let completed = 0
        issueList.forEach(item => {
            todo += item.todo;
            inprogress += item.inprogress;
            completed += item.completed;
        });
  
        console.log(todo);
        console.log(inprogress);
        console.log(completed);

        setStatus({todo, inprogress, completed})
          
    },[usersIssue]) 

    console.log(status)

    const data = {
        labels: Object.keys(status),
        datasets: [{
            data: Object.values(status),
            backgroundColor: [
                '#f2d245',
                '#2385ff',
                '#00a253'
            ]
        }]

        // These labels appear in the legend and in the tooltips when hovering different arcs
        
    };

  return <Pie data={data} />
}
