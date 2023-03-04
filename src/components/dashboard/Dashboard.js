import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../App'
import ResponsiveAppBar from '../../common/AppBar';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { PendingTask } from './PendingTask';
import { LinearBarProgress } from './LinearBarProgress'; 
import { ProgressChart } from './ProgressChart';
import { WorkCompleted14Days } from './WorkCompleted14Days';
import { getDatabase, ref, onValue } from "firebase/database";
import app from '../../Firebase';
import { Avatar } from '@mui/material'
import { Box } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Card } from '@mui/material'
import { Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { FormGroup } from '@mui/material';
import { Checkbox } from '@mui/material';
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { FormControlLabel } from '@mui/material';
import { blue } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import { yellow } from '@mui/material/colors';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Masonry from '@mui/lab/Masonry';

export const DashBoard = () => {

    const [teamMembers, setTeamMembers] = useState([])
    const [userPermissions, setUserPermissions] = useState([])
    const [usersIssue, setUsersIssue] = useState([])

    useEffect(() => {
        onValue(ref(database, 'createIssue/'), (snapshot) => {
            const data = Object.values(snapshot.val());
            const issueList = []
            data.forEach(issue => {
                console.log(typeof(issue.modifiedOn))
                const index = issueList.findIndex((issue1, i) => {
                    return issue1.assignee === issue.assignee
                })
                if (index !== -1) {
                    issueList[index][issue.status] += 1
                } else {
                    const issueObj = {
                        id: issue.id,
                        assignee: issue.assignee,
                        todo: 0,
                        inprogress: 0,
                        completed: 0,
                        createdOn: issue.createdOn,
                        modifiedOn: issue.modifiedOn
                    }
                    issueObj[issue.status] = 1
                    issueList.push(issueObj)
                    setUsersIssue(issueList)
                }
            })
        });
    }, [])
    
    const database = getDatabase(app);
    useEffect(() => {
        onValue(ref(database, 'users/'), (snapshot) => {
            const data = snapshot.val();
            setTeamMembers(data)
        });
    }, [])

    useEffect(() => {
        if (sessionStorage.getItem('uid')) {
            const uid = sessionStorage.getItem('uid')
            onValue(ref(database, 'users/' + uid), (snapshot) => {
                const user = snapshot.val();
                onValue(ref(database, 'permissions/' + user.role), (snapshot) => {
                    const permission = snapshot.val();
                    setUserPermissions(permission)
                });
            });
        } else {
            const uid = localStorage.getItem('uid')
            onValue(ref(database, 'users/' + uid), (snapshot) => {
                const user = snapshot.val();
                onValue(ref(database, 'permissions/' + user.role), (snapshot) => {
                    const permission = snapshot.val();
                    setUserPermissions(permission)
                });
            });
        }
    }, [])

    const users = Object.values(teamMembers)

    const usersList = users.map(user => {
        return user.firstName + ' ' + user.lastName;
    });

    const createTask = ['Task Assignment 1', 'Task Assignment 2', 'Task Assignment 3']
    const percentage = 75;

    const mode = useContext(ThemeContext)

    return (
        <Box sx={{ background: mode === 'light' ? '#dde1ec' : '#093545', width: '100%', minHeight: '100vh' }}>
            <ResponsiveAppBar />
            <Toolbar />
            <Masonry columns={{ lg: 3, md: 1 }} spacing={2} sx={{ marginTop: '10px' }}>
                <Card sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Typography variant="subtitle" fontWeight='600'>Task</Typography>
                    <Box marginTop='10px'>
                        <FormGroup name="use-radio-group" defaultValue="first">
                            <Box marginBottom='15px'>
                                {createTask.map((task, index) => (
                                    <Grid container xs={12}>
                                        <Grid item xs={7}>
                                            <FormControlLabel value={task} label={task} control={<Checkbox sx={{ borderRadius: '50%' }} />} />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Avatar sx={{ height: '36px', width: '36px', marginTop: '3px', marginLeft: '5px', bgcolor: index % 2 === 0 ? blue[500] : yellow[600], fontSize: '1.2rem' }}>{task[0]}</Avatar>
                                        </Grid>
                                        <Typography variant='caption' color='#abacb7' marginLeft='32px' marginTop='-10px'>Thursday, Feb 23</Typography>
                                    </Grid>
                                ))}
                            </Box>
                        </FormGroup>
                        {userPermissions.create_tickets ?
                            (<Box marginTop='20px'>
                                <Box marginBottom='20px'>
                                    <Typography variant="subtitle" fontWeight='600' marginBottom='10px'>Create New Task</Typography>
                                </Box>
                                <TextField multiline fullWidth minRows={4} placeholder='What is the task?' />
                                <Button variant='contained' fullWidth size='large' sx={{ fontSize: '1rem', marginTop: '20px', fontWeight: '400', borderRadius: '10px', boxShadow: '0px 4px 4px 0px #0000004D', bgcolor: blue[500], color: 'light' ? '#FFF' : '' }}>Create Task</Button>
                            </Box>) : ('')}
                    </Box>
                </Card>
                <Card sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Typography variant="subtitle" fontWeight='600'>Task Progress</Typography>
                    {usersIssue.map((issue) => (
                        <Box marginTop='20px'>
                            <Typography variant="subtitle2">{issue.assignee}</Typography>
                            <LinearBarProgress todo={issue.todo} inProgress={issue.inprogress} completed={issue.completed} sx={{ height: '6px', borderRadius: '10px', marginBottom: '20px' }} variant='determinate' />
                        </Box>
                    ))}
                </Card>
                <Card sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Typography variant="subtitle" fontWeight='600'>Weekly Progress</Typography>
                    <Typography variant='body2' sx={{ marginTop: '3px' }} color='#abacb7'>Start from Feb 14 - 21, 2023 </Typography>
                    <Box height='150px' width='auto' display='flex' flexDirection='column' justifyContent='center' marginTop='20px'>
                        <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({ rotation: 0.50, pathColor: `rgba(0, 150, 0, ${percentage / 100})`, textColor: '#f88', trailColor: '#d6d6d6', backgroundColor: '#3e98c7', })} />
                    </Box>
                </Card>
                <Card sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Box marginBottom='10px'>
                        <Typography variant="subtitle" fontWeight='600'>Maximun no. of pending Tasks</Typography>
                    </Box>
                    <Box height='225px' display='flex' justifyContent='center' >
                        <PendingTask usersIssue={usersIssue} />        
                    </Box>
                </Card>
                <Card sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Box marginBottom='10px'>
                        <Typography variant="subtitle" fontWeight='600'>Progress</Typography>
                    </Box>
                    <Box height='225px' display='flex' justifyContent='center' >
                        <ProgressChart usersIssue={usersIssue} />
                    </Box>
                </Card>
                <Card sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Box>
                        <WorkCompleted14Days usersIssue={usersIssue} />
                    </Box>
                </Card>
                <Card sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Box marginBottom='20px'>
                        <Typography variant="subtitle" fontWeight='600'>Team Members</Typography>
                    </Box>
                    <Box marginTop='10px'>
                        {usersList.map((user, index) => (
                            <Grid container xs={12} marginBottom='20px'>
                                <Grid item xs={1.5}>
                                    <Avatar sx={{ bgcolor: index % 2 === 0 ? '#2385ff' : '#f2d245' }}>{user[0]}</Avatar>
                                </Grid>
                                <Grid item xs={10.5}>
                                    <Typography marginTop='8px' marginLeft='10px'>{user}</Typography>
                                </Grid>
                            </Grid>
                        ))}
                        {userPermissions.manage_user ? (
                            <Grid container xs={12}>
                                <Grid item xs={1.5}>
                                    <Avatar sx={{ bgcolor: green[500] }}><PersonAddIcon /></Avatar>
                                </Grid>
                                <Grid item xs={10.5}>
                                    <Typography marginTop='8px' marginLeft='10px'>Add Member</Typography>
                                </Grid>
                            </Grid>
                        ) : ('')}
                    </Box>
                </Card>
            </Masonry>

        </Box>
    )
}
