import React, { useContext, useEffect, useState } from 'react'
import ResponsiveAppBar from '../../common/AppBar';
import { Typography, Box, Toolbar, FormControl, Select, MenuItem, Grid, Button, Card, Avatar, Tooltip, AvatarGroup } from '@mui/material';
import { ThemeContext } from '../../App';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { SearchIconWrapper } from '../../common/SearchBar';
import { Search } from '../../common/SearchBar';
import { StyledInputBase } from '../../common/SearchBar';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SearchIcon from '@mui/icons-material/Search';
import { getDatabase, ref, onValue, child, push, update } from "firebase/database";
import app from '../../Firebase';
import { toast } from 'react-hot-toast';
import { CreateIssueDialog } from './CreateIssueDialog';
import { UpdateIssue } from './UpdateIssue';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import { useNavigate } from 'react-router-dom';

export const KanbanBoard = () => {

    const navigate = useNavigate();

    const [projectList, setProjectList] = useState(['Project 1']);
    const [assigneeList, setAssigneeList] = useState(['Manan Sharma', 'Vaibhav Manchikanti', 'Mayank Bhootra']);
    const [reporterList, setReportedList] = useState(['Manan Sharma', 'Vaibhav Manchikanti', 'Mayank Bhootra']);
    const [todoList, setTodoList] = useState([]);
    const [inProgressList, setInprogressList] = useState([]);
    const [completedList, setCompletedList] = useState([]);
    const [userData, setUserData] = useState([]);
    const [isUserHasAccess, setIsUserHasAccess] = useState(true);
    const [userPermissions, setUserPermissions] = useState([])
    const [invitedUsers, setInvitedUsers] = useState([])

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date();
    let month = months[d.getMonth()];
    let day = days[d.getDay()];
    const date = day + ', ' + d.getDate() + ' ' + month + ' ' + d.getFullYear() + ' | ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()

    const [createIssueInput, setCreateIssueInput] = useState({
        project: '',
        issueType: '',
        status: '',
        summary: '',
        description: '',
        assignee: '',
        reporter: '',
        priority: '', 
        createdOn: date
    })

    console.log(createIssueInput.createdOn)

    useEffect(() => {
        if (sessionStorage.getItem('uid')) {
            const uid = sessionStorage.getItem('uid')
            onValue(ref(database, 'users/' + uid), (snapshot) => {
                const user = snapshot.val();
                setUserData(user)
                checkIsUserHasPermission(user.email)
                onValue(ref(database, 'permissions/' + user.role), (snapshot) => {
                    const permission = snapshot.val();
                    setUserPermissions(permission)
                });
            });
        } else {
            const uid = localStorage.getItem('uid')
            onValue(ref(database, 'users/' + uid), (snapshot) => {
                const user = snapshot.val();
                checkIsUserHasPermission(user.email)
                onValue(ref(database, 'permissions/' + user.role), (snapshot) => {
                    const permission = snapshot.val();
                    setUserPermissions(permission)
                });
            });
        }
    }, [])

    const checkIsUserHasPermission = (email) => {
        onValue(ref(database, 'invitedUser/'), (snapshot) => {
            const invitedUsersList = Object.values(snapshot.val());
            const isUserPresent = invitedUsersList.filter(inviteUser => {
                return inviteUser.email === email
            })
            setInvitedUsers(invitedUsersList)
            if (!isUserPresent.length) {
                setIsUserHasAccess(false)
            }
        });
    }


    useEffect(() => {
        onValue(ref(database, '/createIssue/'), (snapshot) => {
            const data = snapshot.val();
            const todo = [];
            const inprogress = [];
            const completed = [];
            const issuesList = Object.values(data)
            issuesList.forEach(issue => {
                if (issue.status === "todo") {
                    todo.push(issue)
                } else if (issue.status === "inprogress") {
                    inprogress.push(issue)
                } else {
                    completed.push(issue);
                }
            })
            setTodoList([...todo])
            setInprogressList([...inprogress])
            setCompletedList([...completed])
        });
    }, [])

    const database = getDatabase(app);

    const onHandleChange = (name, value) => {
        setCreateIssueInput({ ...createIssueInput, [name]: value })
    }

    const handleIssueChange = (name, value) => {
        setSelectedIssue({ ...selectedIssue, [name]: value })
    }

    const handleUpdate = () => {
        const updatesIssue = {};
        updatesIssue['/createIssue/' + selectedIssue.id] = selectedIssue;
        return update(ref(database), updatesIssue);
    }

    const writeUserData = () => {

        let isError = false
        let errorMessage = 'Please fill all the fields'

        if (!createIssueInput.summary) {
            toast.error('Please add summary')
            isError = true
        }

        if (isError) {
            toast(errorMessage)
        }
        if (!isError) {

            const createNewIssue = createIssueInput
            const newPostKey = push(child(ref(database), 'createIssue')).key;
            createNewIssue.id = newPostKey
            const updates = {};
            updates['/createIssue/' + createNewIssue.id] = createNewIssue;
            toast('Issue create successfully')
            return update(ref(database), updates);
        }
    }

    const [openUpdateIssue, setOpenUpdateIssue] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState('');

    const handleOpenUpdate = (issue) => {
        setOpenUpdateIssue(true);
        setSelectedIssue(issue)
    };

    const handleCloseUpdate = () => {
        setOpenUpdateIssue(false);
    };


    const [openCreate, setOpenCreate] = useState(false);

    const handleOpen = () => {
        setOpenCreate(true);
    };

    const handleClose = () => {
        setOpenCreate(false);
    };

    const mode = useContext(ThemeContext)

    return (
        <> {isUserHasAccess ?
            (<Box sx={{ display: 'flex', height: '100vh', color: 'text.primary', background: mode === 'light' ? '#dde1ec' : '', }}>
                <ResponsiveAppBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Box>
                        <Typography variant='h5'>PROJ2 board</Typography>
                    </Box>

                    <Box marginTop='20px' display='inline-flex' justifyContent='space-between' width='100%'>
                        <Box display='inline-flex'>
                            <Box sx={{ flexGrow: 1 }}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search this board"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                            </Box>
                            <Box display='inline-flex' marginLeft='10px' marginTop='-2px'>
                                {invitedUsers.map((name, index) => (
                                    <Tooltip arrow title={name}>
                                        <AvatarGroup sx={{ marginLeft: '2.5px' }}>
                                            <Avatar sx={{ bgcolor: index % 2 === 0 ? '#2385ff' : '#f2d245' }}>{name.firstName[0]}</Avatar>
                                        </AvatarGroup>
                                    </Tooltip>
                                ))}
                                {userPermissions.manage_user ? (<Avatar sx={{ marginTop: '2px', marginLeft: '5px' }}><PersonAddAlt1Icon /></Avatar>) : ('')}

                            </Box>
                        </Box>
                        <Box display='flex' flexDirection='row' padding='0 20px' marginTop='-5px'>
                            {userPermissions.create_tickets ? (
                                <Button variant='contained' onClick={handleOpen} sx={{ height: '40px', borderRadius: '10px', marginTop: '10px', marginRight: '25px' }}>Create</Button>
                            ) : (
                                ''
                            )}

                            <Typography marginTop='20px' marginRight='10px' variant='subtitle2'>GROUP BY</Typography>
                            <FormControl sx={{ width: '150px' }}>
                                <Select defaultValue='None'>
                                    <MenuItem value='None'>None</MenuItem>
                                    <MenuItem value='Assignee'>Assignee</MenuItem>
                                    <MenuItem value='Subtask'>Subtask</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Grid container gap={3} xs={12} marginTop='30px'>
                        <Grid item xs={3}>
                            <Card sx={{ textAlign: 'Left', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', padding: '10px' }}>
                                <Typography variant='subtitle2'>TO DO</Typography>
                            </Card>
                            <Card sx={{ marginTop: '40px', textAlign: 'Left', borderRadius: '10px', padding: '10px' }}>
                                {todoList.map((issue, index) => (
                                    <Card onClick={() => handleOpenUpdate(issue)} sx={{ padding: '20px 10px', marginBottom: '20px' }}>
                                        <Typography variant='h6' fontWeight='600'>{issue.summary}</Typography>
                                        <Grid container xs={12} marginTop='10px'>
                                            <Grid item xs={3}>
                                                <Typography sx={{ bgcolor: mode === 'light' ? 'background.light' : 'background.dark', width: 'max-content', padding: '1px 8px', borderRadius: '5px' }} variant='h6' fontWeight='500'>{issue.project}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>

                                            </Grid>
                                            <Grid item xs={3}>

                                            </Grid>
                                            <Grid item xs={3}>
                                                <Avatar sx={{ bgcolor: index % 2 === 0 ? '#2385ff' : '#f2d245' }}>{issue.assignee[0]}</Avatar>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                ))}
                            </Card>
                        </Grid>
                        <Grid item xs={3}>
                            <Card sx={{ textAlign: 'Left', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', padding: '10px' }}>
                                <Typography variant='subtitle2'>IN PROGRESS</Typography>
                            </Card>
                            <Card sx={{ marginTop: '40px', textAlign: 'Left', borderRadius: '10px', padding: '10px' }}>
                                {inProgressList.map((issue, index) => (
                                    <Card onClick={() => handleOpenUpdate(issue)} sx={{ padding: '20px 10px', marginBottom: '20px' }}>
                                        <Typography variant='h6' fontWeight='600'>{issue.summary}</Typography>
                                        <Grid container xs={12} marginTop='10px'>
                                            <Grid item xs={3}>
                                                <Typography sx={{ bgcolor: mode === 'light' ? 'background.light' : 'background.dark', width: 'max-content', padding: '1px 8px', borderRadius: '5px' }} variant='h6' fontWeight='500'>{issue.project}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>

                                            </Grid>
                                            <Grid item xs={3}>

                                            </Grid>
                                            <Grid item xs={3}>
                                                <Avatar sx={{ bgcolor: index % 2 === 0 ? '#2385ff' : '#f2d245' }}>{issue.assignee[0]}</Avatar>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                ))}
                            </Card>
                        </Grid>
                        <Grid item xs={3}>
                            <Card sx={{ textAlign: 'Left', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', padding: '10px' }}>
                                <Typography variant='subtitle2'>COMPLETED</Typography>
                            </Card>
                            <Card sx={{ marginTop: '40px', textAlign: 'Left', borderRadius: '10px', padding: '10px' }}>
                                {completedList.map((issue, index) => (
                                    <Card onClick={() => handleOpenUpdate(issue)} sx={{ padding: '20px 10px', marginBottom: '20px' }}>
                                        <Typography variant='h6' fontWeight='600'>{issue.summary}</Typography>
                                        <Grid container xs={12} marginTop='10px'>
                                            <Grid item xs={3}>
                                                <Typography sx={{ bgcolor: mode === 'light' ? 'background.light' : 'background.dark', width: 'max-content', padding: '1px 8px', borderRadius: '5px' }} variant='h6' fontWeight='500'>{issue.project}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>

                                            </Grid>
                                            <Grid item xs={3}>

                                            </Grid>
                                            <Grid item xs={3}>
                                                <Avatar sx={{ bgcolor: index % 2 === 0 ? '#2385ff' : '#f2d245' }}>{issue.assignee[0]}</Avatar>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                ))}
                            </Card>
                        </Grid>
                    </Grid>
                    <UpdateIssue handleUpdateOpen={openUpdateIssue} handleUpdateClose={handleCloseUpdate} selectedIssue={selectedIssue} handleIssueChange={handleIssueChange} handleUpdate={handleUpdate} />
                    <Box margin='10px'>
                        <CreateIssueDialog openCreate={openCreate} handleClose={handleClose} onHandleChange={onHandleChange} createIssueInput={createIssueInput} projectList={projectList} assigneeList={assigneeList} reporterList={reporterList} writeUserData={writeUserData} />
                    </Box>
                </Box>
            </Box>) : (
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' textAlign='center' height='100vh' sx={{ background: mode === 'light' ? '#dde1ec' : '', }} >
                    <Box maxWidth='md' marginBottom='75px'>
                        <ReportProblemRoundedIcon sx={{ fontSize: '8rem', color: 'text.error' }} />
                        <Typography variant='h4'>{userData.firstName + ' ' + userData.lastName}</Typography>
                        <Typography variant='h6'>{userData.email}</Typography>
                        <Typography variant='h4'>Sorry, you don't have access for this page</Typography>
                        <Button variant='contained' onClick={() => navigate('/dashboard')} sx={{ marginTop: '10px', borderRadius: '10px' }} >Go back</Button>
                    </Box>
                </Box>
            )}
        </>
    )
}

