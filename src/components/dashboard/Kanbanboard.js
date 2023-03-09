import React, { useContext, useEffect, useState } from 'react'
import ResponsiveAppBar from '../../common/AppBar';
import { Typography, Box, Toolbar, FormControl, Select, MenuItem, Grid, Button, Card, Avatar, Tooltip, AvatarGroup } from '@mui/material';
import { ThemeContext } from '../../App';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { SearchIconWrapper } from './SearchBar';
import { Search } from './SearchBar';
import { StyledInputBase } from './SearchBar';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SearchIcon from '@mui/icons-material/Search';
import { getDatabase, ref, onValue, child, push, update } from "firebase/database";
import app from '../../Firebase';
import { toast } from 'react-hot-toast';
import { CreateIssueDialog } from './CreateIssueDialog';
import { UpdateIssue } from './UpdateIssue';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import InviteUserDialog from './InviteUserDialog';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

export const KanbanBoard = () => {

    const navigate = useNavigate();

    const [projectList, setProjectList] = useState([]);
    const [todoList, setTodoList] = useState([]);
    const [inProgressList, setInprogressList] = useState([]);
    const [completedList, setCompletedList] = useState([]);
    const [userData, setUserData] = useState([]);
    const [isUserHasAccess, setIsUserHasAccess] = useState(true);
    const [userPermissions, setUserPermissions] = useState([])
    const [invitedUsers, setInvitedUsers] = useState([])
    const [openCreate, setOpenCreate] = useState(false);
    const [openInviteDialog, setOpenInviteDialog] = useState(false)
    const [inviteUserList, setInviteUserList] = useState([])
    const [handleModified, setHandleModified] = useState(true)
    const [switchCheck, setSwitchCheck] = useState(false);
    const [openUpdateIssue, setOpenUpdateIssue] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState('');

    const [createIssueInput, setCreateIssueInput] = useState({
        project: '',
        issueType: '',
        status: '',
        summary: '',
        description: '',
        assignee: '',
        assigneeId: '',
        reporter: '',
        priority: '',
        createdOn: '',
        modifiedOn: ''
    })

    useEffect(() =>{
        onValue(ref(database, 'projects/'), (snapshot) => {
            const project = snapshot.val();
            setProjectList(project)
        });
    },[])

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
                setUserData(user)
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
            checkIsUserInvite(invitedUsersList)
            const isUserPresent = invitedUsersList.filter(inviteUser => {
                return inviteUser.email === email;
            })
            setInvitedUsers(invitedUsersList)
            if (!isUserPresent.length) {
                setIsUserHasAccess(false)
            }
        });
    }

    const checkIsUserInvite = (invitedUsersList) => {
        onValue(ref(database, 'users/'), (snapshot) => {
            const userList = Object.values(snapshot.val());
            const invitedUserEmail = invitedUsersList.map(invitedUser => {
                return invitedUser.email;
            });
            const inviteUser = userList.filter(user => {
                return !invitedUserEmail.includes(user.email)
            })
            setInviteUserList(inviteUser);
        });
    }

    useEffect(() => {
        onValue(ref(database, '/createIssue/'), (snapshot) => {
            const data = snapshot.val();
            const todo = [];
            const inprogress = [];
            const completed = [];
            if (data) {
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
            }
            setTodoList([...todo])
            setInprogressList([...inprogress])
            setCompletedList([...completed])
        });
    }, [])

    const database = getDatabase(app);

    const onHandleChange = (name, value) => {
        setCreateIssueInput({ ...createIssueInput, [name]: value })
    }

    const handleUpdate = () => {
        const updatesIssue = {};
        updatesIssue['/createIssue/' + selectedIssue.id] = selectedIssue;
        selectedIssue.modifiedOn = new Date()
        handleCloseUpdate()
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
            createIssueInput.createdOn = new Date()
            updates['/createIssue/' + createNewIssue.id] = createNewIssue;
            toast('Issue create successfully')
            setCreateIssueInput({
                project: '',
                issueType: '',
                status: '',
                summary: '',
                description: '',
                assignee: '',
                assigneeId: '',
                reporter: '',
                priority: '',
                createdOn: '',
                modifiedOn: ''
            })
            if(switchCheck === true){
                setOpenCreate(true)
            }else{
                handleClose()
            }
            return update(ref(database), updates);
        }
    }

    const handleOpen = () => {
        setOpenCreate(true);
    };

    const handleClose = () => {
        setOpenCreate(false);
        setCreateIssueInput({
            project: '',
            issueType: '',
            status: '',
            summary: '',
            description: '',
            assignee: '',
            assigneeId: '',
            reporter: '',
            priority: '',
            createdOn: '',
            modifiedOn: ''
        })
        setSwitchCheck(false)
    };

    const handleIssueChange = (name, value) => {
        setSelectedIssue({ ...selectedIssue, [name]: value })  
        setHandleModified(false)
    }

    const handleOpenUpdate = (issue) => {
        setOpenUpdateIssue(true);
        setSelectedIssue(issue)
    };

    const handleCloseUpdate = () => {
        setOpenUpdateIssue(false);
        setHandleModified(true)
    };

    const handleOpenInviteDialog = () => {
        setOpenInviteDialog(true);
    }

    const handleCloseInviteDialog = () => {
        setOpenInviteDialog(false);
    }

    const handleCardOption = () => {

    }

    const handleSwitchChange = (event) => {
        setSwitchCheck(event.target.checked);
      };

    const mode = useContext(ThemeContext)

    return (
        <> {isUserHasAccess ?
            (<Box sx={{ display: 'flex', minHeight: '100vh', color: 'text.primary', bgcolor: mode === 'light' ? '#dde1ec' : '', }}>
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
                                    <Tooltip key={`i_${index}`} arrow title={name.firstName + ' ' + name.lastName}>
                                        <AvatarGroup sx={{ marginLeft: '2.5px' }}>
                                            <Avatar sx={{ bgcolor: index % 2 === 0 ? '#2385ff' : '#f2d245' }}>{name.firstName[0]}</Avatar>
                                        </AvatarGroup>
                                    </Tooltip>
                                ))}
                                {userPermissions.manage_user ? (<Avatar sx={{ marginTop: '2px', marginLeft: '5px', cursor: 'pointer' }} onClick={handleOpenInviteDialog}><PersonAddAlt1Icon /></Avatar>) : ('')}

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
                    <Grid container gap={3} marginTop='30px'>
                        <Grid item xs={3}>
                            <Card sx={{ textAlign: 'Left', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', padding: '10px' }}>
                                <Typography variant='subtitle2'>TO DO</Typography>
                            </Card>
                            <Card sx={{ marginTop: '40px', textAlign: 'Left', borderRadius: '10px', padding: '10px', }}>
                                {todoList.map((issue, index) => (
                                    <Card key={`todo_${index}`} onClick={() => handleOpenUpdate(issue)} sx={{ padding: '20px 10px', marginBottom: '20px', }}>
                                        <Grid container>
                                            <Grid item xs={10}>
                                                <Typography variant='h6' fontWeight='500'>{issue.summary}</Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button onClick={handleCardOption}><MoreVertIcon /></Button>
                                            </Grid>
                                        </Grid>
                                        <Grid container marginTop='10px'>
                                            <Grid item xs={3}>
                                                <Typography sx={{ bgcolor: mode === 'light' ? 'background.light' : 'background.dark', width: 'max-content', padding: '1px 8px', borderRadius: '5px' }} variant='h6' fontWeight='500'>{issue.project}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>

                                            </Grid>
                                            <Grid item xs={3}>

                                            </Grid>
                                            <Grid item xs={3}>
                                                <Tooltip arrow title={issue.assignee}>
                                                    <Avatar sx={{ bgcolor: index % 2 === 0 ? '#2385ff' : '#f2d245' }}>{issue.assignee[0]}</Avatar>
                                                </Tooltip>
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
                                    <Card key={`inprogress_${index}`} onClick={() => handleOpenUpdate(issue)} sx={{ padding: '20px 10px', marginBottom: '20px' }}>
                                        <Grid container>
                                            <Grid item xs={10}>
                                                <Typography variant='h6' fontWeight='500'>{issue.summary}</Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button onClick={handleCardOption}><MoreVertIcon /></Button>
                                            </Grid>
                                        </Grid>
                                        <Grid container marginTop='10px'>
                                            <Grid item xs={3}>
                                                <Typography sx={{ bgcolor: mode === 'light' ? 'background.light' : 'background.dark', width: 'max-content', padding: '1px 8px', borderRadius: '5px' }} variant='h6' fontWeight='500'>{issue.project}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>

                                            </Grid>
                                            <Grid item xs={3}>

                                            </Grid>
                                            <Tooltip arrow title={issue.assignee}>
                                                <Avatar sx={{ bgcolor: index % 2 === 0 ? '#2385ff' : '#f2d245' }}>{issue.assignee[0]}</Avatar>
                                            </Tooltip>
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
                                    <Card key={`complete_${index}`} onClick={() => handleOpenUpdate(issue)} sx={{ padding: '20px 10px', marginBottom: '20px' }}>
                                        <Grid container>
                                            <Grid item xs={10}>
                                                <Typography variant='h6' fontWeight='500'>{issue.summary}</Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button onClick={handleCardOption}><MoreVertIcon /></Button>
                                            </Grid>
                                        </Grid>
                                        <Grid container marginTop='10px'>
                                            <Grid item xs={3}>
                                                <Typography sx={{ bgcolor: mode === 'light' ? 'background.light' : 'background.dark', width: 'max-content', padding: '1px 8px', borderRadius: '5px' }} variant='h6' fontWeight='500'>{issue.project}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>

                                            </Grid>
                                            <Grid item xs={3}>

                                            </Grid>
                                            <Tooltip arrow title={issue.assignee}>
                                                <Avatar sx={{ bgcolor: index % 2 === 0 ? '#2385ff' : '#f2d245' }}>{issue.assignee[0]}</Avatar>
                                            </Tooltip>
                                        </Grid>
                                    </Card>
                                ))}
                            </Card>
                        </Grid>
                    </Grid>
                    <UpdateIssue handleUpdateOpen={openUpdateIssue} handleUpdateClose={handleCloseUpdate} selectedIssue={selectedIssue} handleIssueChange={handleIssueChange} handleUpdate={handleUpdate} invitedUsers={invitedUsers} handleModified={handleModified} />
                    <Box margin='10px'>
                        <CreateIssueDialog openCreate={openCreate} handleClose={handleClose} onHandleChange={onHandleChange} createIssueInput={createIssueInput} projectList={projectList} invitedUsers={invitedUsers} writeUserData={writeUserData} handleSwitchChange={handleSwitchChange} switchCheck={switchCheck} />
                    </Box>
                    <Box>
                        <InviteUserDialog handleCloseInviteDialog={handleCloseInviteDialog} openInviteDialog={openInviteDialog} inviteUserList={inviteUserList} />
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

