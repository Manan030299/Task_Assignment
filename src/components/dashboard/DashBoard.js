import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Box, Card, Radio, RadioGroup, Typography, Button, TextField, Divider, Toolbar, Grid } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import { ThemeContext } from '../../App'
import { blue, green, yellow } from '@mui/material/colors';
import ResponsiveAppBar from '../../containers/AppBar';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,} from "chart.js";
import { Pie } from "react-chartjs-2";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Masonry from '@mui/lab/Masonry';
import { StackBarProgress } from '../../containers/StackedBarProgress';
import { LinearBarProgress } from '../../containers/LinearBarProgress';
import { getDatabase, ref, onValue} from "firebase/database";
import app from '../../Firebase';


export const DashBoard = () => {
    
    const[teamMembers, setTeamMembers] = useState([])

    const database = getDatabase(app);
    useEffect(()=>{
        onValue(ref(database, 'users/'), (snapshot) => {
            const data = snapshot.val();
            setTeamMembers(data)
        });
    },[database])

    const users = Object.values(teamMembers)
    console.log(users)

    var usersName = users.map(obj => {
        return obj.firstName + ' '+ obj.lastName;
      });

      console.log(usersName)

    const taskCompleted = 100
    const taskPercentage = 75
    const percentage = 75;
    ChartJS.register(ArcElement, Tooltip, Legend,);
    const data = {
        datasets: [{
            data: [9, 11, 10],
            backgroundColor: [
                '#f2d245',
                '#2385ff',
                '#00a253'
            ]
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'ToDo',
            'In-Progress',
            'Completed'
        ]
    };

    const mode = useContext(ThemeContext)

    return (
        <Box sx={{ background: mode === 'light' ? '#dde1ec' : '#093545', boxSizing: 'border-box', width: '100%', minHeight: '100vh' }}>
            <ResponsiveAppBar />
            <Toolbar />
            <Masonry columns={{ lg: 3, md: 1 }} spacing={2} sx={{ marginTop: '10px'}}>
                <Card sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Typography variant="subtitle" fontWeight='600'>Task</Typography>
                    <Box marginTop='10px'>
                        <RadioGroup name="use-radio-group" defaultValue="first">
                            <Box marginBottom='15px'>
                                {['Task Assignment 1', 'Task Assignment 2', 'Task Assignment 3'].map((text, index) => (
                                    <Grid container xs={12}>
                                        <Grid item xs={7}>
                                            <FormControlLabel value={text} label={text} control={<Radio />} />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Avatar sx={{ height: '36px', width: '36px', marginTop: '3px', marginLeft: '5px', bgcolor: index % 2 === 0 ? blue[500] : yellow[600], fontSize: '1.2rem' }}>{text[0]}</Avatar>
                                        </Grid>
                                        <Typography variant='caption' color='#abacb7' marginLeft='32px' marginTop='-10px'>Thursday, Feb 23</Typography>
                                    </Grid>
                                ))}
                            </Box>
                        </RadioGroup>
                        <Divider />
                        <Box marginTop='20px'>
                            <Box marginBottom='20px'>
                                <Typography variant="subtitle" fontWeight='600' marginBottom='10px'>Create New Task</Typography>
                            </Box>
                            <TextField multiline fullWidth minRows={4} placeholder='What is the task?' />
                            <Button variant='contained' fullWidth size='large' sx={{ fontSize: '1rem', marginTop: '20px', fontWeight: '400', borderRadius: '10px', boxShadow: '0px 4px 4px 0px #0000004D', bgcolor: blue[500], color: 'light' ? '#FFF' : '' }}>Create Task</Button>
                        </Box>
                    </Box>
                </Card>
                <Card sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Typography variant="subtitle" fontWeight='600'>Task Progress</Typography>
                    {['Task Assignment 1'].map((text, index) => (
                        <Box marginTop='20px'>
                            <Typography variant="subtitle2">{text}</Typography>
                            <LinearBarProgress sx={{ height: '6px', borderRadius: '10px', marginBottom: '20px' }} variant='determinate' value={taskPercentage} />
                        </Box>
                    ))}
                </Card>
                <Card sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Typography variant="subtitle" fontWeight='600'>Weekly Progress</Typography>
                    <Typography variant='body2' sx={{marginTop:'3px'}} color='#abacb7'>Start from Feb 14 - 21, 2023 </Typography>
                    <Box height='150px' width='auto' display='flex' flexDirection='column' justifyContent='center' marginTop='20px'>
                        <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({ rotation: 0.50, pathColor: `rgba(0, 150, 0, ${percentage / 100})`, textColor: '#f88', trailColor: '#d6d6d6', backgroundColor: '#3e98c7', })} />
                    </Box>
                </Card>
                <Card sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Box marginBottom='10px'>
                        <Typography variant="subtitle" fontWeight='600'>Maximun no. of pending Tasks</Typography>
                    </Box>
                    <Box height='225px' display='flex' justifyContent='center' >
                        <StackBarProgress />
                    </Box>
                </Card>
                <Card sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Box marginBottom='10px'>
                        <Typography variant="subtitle" fontWeight='600'>Progress</Typography>
                    </Box>
                    <Box height='225px' display='flex' justifyContent='center' >
                        <Pie data={data} />
                    </Box>
                </Card>
                <Card sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Box marginBottom='20px'>
                        <Typography variant="subtitle" fontWeight='600'>No. of Tasks completed in the last 14 days</Typography>
                    </Box>
                    <Box>
                        <Typography textAlign='center' variant="h3" fontWeight='600'>{taskCompleted}</Typography>       
                    </Box>
                </Card>
                <Card sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Box marginBottom='20px'>
                        <Typography variant="subtitle" fontWeight='600'>Team Members</Typography>
                    </Box>
                    <Box marginTop='10px'>
                        {usersName.map((text, index) => (
                            <Grid container xs={12} marginBottom='20px'>
                                <Grid item xs={1.5}>
                                    <Avatar sx={{ bgcolor: index % 2 === 0 ? blue[500] : yellow[600] }}>{text[0]}</Avatar>
                                </Grid>
                                <Grid item xs={10.5}>
                                    <Typography marginTop='8px' marginLeft='10px'>{text}</Typography>
                                </Grid>
                            </Grid>
                        ))}
                        <Grid container xs={12}>
                            <Grid item xs={1.5}>
                                <Avatar sx={{ bgcolor: green[500] }}><PersonAddIcon /></Avatar>
                            </Grid>
                            <Grid item xs={10.5}>
                                <Typography marginTop='8px' marginLeft='10px'>Add Member</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Masonry>
        </Box>
    )
}
