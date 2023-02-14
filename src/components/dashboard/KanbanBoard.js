import React, { useContext } from 'react'
import ResponsiveAppBar from '../../common/AppBar';
import { Typography, Drawer, Box, Toolbar, Divider, Dialog, FormControl, Select, MenuItem, Link, Grid, Button, Switch, FormControlLabel, styled, Card, Avatar, Tooltip, AvatarGroup, OutlinedInput, FormHelperText, } from '@mui/material';
import { ThemeContext } from '../../App';
import SearchIcon from '@mui/icons-material/Search';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { SearchIconWrapper } from '../../common/SearchBar';
import { Search } from '../../common/SearchBar';
import { StyledInputBase } from '../../common/SearchBar';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export const KanbanBoard = () => {

    const mode = useContext(ThemeContext)

    const project = ['Project 1', 'Project 2', 'Project 3']

    const user = ['Manan Sharma', 'Vaibhav Manchikanti', 'Mayank Bhootra']

    const Android12Switch = styled(Switch)(({ theme }) => ({
        padding: 8,
        '& .MuiSwitch-track': {
            borderRadius: 22 / 2,
            '&:before, &:after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
            },
            '&:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
                left: 12,
            },
            '&:after': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                )}" d="M19,13H5V11H19V13Z" /></svg>')`,
                right: 12,
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: 'none',
            width: 16,
            height: 16,
            margin: 2,
        },
    }));

    return (

        <Box sx={{ display: 'flex', height: '100vh', color: 'text.primary' }}>
            <ResponsiveAppBar />
            <Drawer
                variant="permanent"
                sx={{
                    width: 200,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box', bgcolor: mode === 'light' ? '' : 'background.default' },

                }}
            >
                <Toolbar />
                <Box marginTop='0'>
                    <Box display='flex' justifyContent='center' marginTop='10px' marginBottom='10px'>
                        <Typography variant='h6' fontWeight='600'>Kanban Board</Typography>
                    </Box>
                    <Divider />
                </Box>
            </Drawer>
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
                            {user.map((name) => (
                                <Tooltip arrow title={name}>
                                    <AvatarGroup sx={{ marginLeft: '2.5px' }}>
                                        <Avatar>{name[0]}</Avatar>
                                    </AvatarGroup>
                                </Tooltip>
                            ))}
                            <Avatar sx={{ marginTop: '2px', marginLeft: '5px' }}><PersonAddAlt1Icon /></Avatar>
                        </Box>
                    </Box>
                    <Box display='flex' flexDirection='row' padding='0 20px' marginTop='-5px'>
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
                            <Typography variant='subtitle2'>TO DO {1} ISSUE</Typography>
                        </Card>
                        <Card sx={{ height: '100px', marginTop: '40px', textAlign: 'Left', borderRadius: '10px', padding: '10px' }}>
                            <Typography variant='subtitle2'>Test 33</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card sx={{ textAlign: 'Left', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', padding: '10px' }}>
                            <Typography variant='subtitle2'>IN PROGRESS {1} ISSUE</Typography>
                        </Card>
                        <Card sx={{ height: '100px', marginTop: '40px', textAlign: 'Left', borderRadius: '10px', padding: '10px' }}>
                            <Typography variant='subtitle2'>Test 23</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card sx={{ textAlign: 'Left', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', padding: '10px' }}>
                            <Typography variant='subtitle2'>COMPLETED</Typography>
                        </Card>
                        <Card sx={{ height: '100px', marginTop: '40px', textAlign: 'Left', borderRadius: '10px', padding: '10px' }}>
                            <Typography variant='subtitle2'>Test 13</Typography>
                        </Card>
                    </Grid>
                </Grid>
                <Box margin='10px'>
                    <Dialog open={false} maxWidth='md'>
                        <Box padding='30px 20px' boxShadow="0px 4px 4px 0px #00000040">
                            <Typography variant='h5' fontWeight='600'>Create issue</Typography>
                        </Box>
                        <Box padding='20px' sx={{ overflowY: 'auto' }}>
                            <Box marginBottom='20px'>
                                <FormControl fullWidth>
                                    <Typography variant='subtitle1'>Project</Typography>
                                    <Select sx={{ marginBottom: '20px' }}>
                                        {project.map((projectName) => (
                                            <MenuItem value={projectName}>{projectName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <Typography variant='subtitle1'>Issue type</Typography>
                                    <Select defaultValue='story' sx={{ marginBottom: '20px' }}>
                                        <MenuItem value='story'>Story</MenuItem>
                                        <MenuItem value='task'>Task</MenuItem>
                                        <MenuItem value='bug'>Bug</MenuItem>
                                        <MenuItem value='epic'>Epic</MenuItem>
                                    </Select>
                                    <Link href>Learn more</Link>
                                </FormControl>
                            </Box>
                            <Divider />
                            <Box marginTop='20px'>
                                <FormControl fullWidth>
                                    <Typography variant='subtitle1'>Status</Typography>
                                    <Select defaultValue='todo' sx={{ marginBottom: '20px' }}>
                                        <MenuItem value='todo'>TO DO</MenuItem>
                                        <MenuItem value='in-progress'>IN PROGRESS</MenuItem>
                                        <MenuItem value='completed'>COMPLETED</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ marginBottom: '20px' }} fullWidth>
                                    <Typography variant='subtitle1'>Summary</Typography>
                                    <OutlinedInput />
                                    <FormHelperText>This is the issue's initial status upon creation</FormHelperText>
                                </FormControl>
                                <Box sx={{ marginBottom: '20px' }}>
                                    <Typography variant='subtitle1'>Description</Typography>
                                    <Box border='1px solid #00000040' borderRadius='10px' padding='10px'>
                                        <Editor />
                                    </Box>
                                </Box>
                                <FormControl sx={{ marginBottom: '20px' }} fullWidth>
                                    <Typography variant='subtitle1'>Assignee</Typography>
                                    <Select sx={{ marginBottom: '10px' }}>
                                        {user.map((userAssigne) => (
                                            <MenuItem >{userAssigne}</MenuItem>
                                        ))}
                                    </Select>
                                    <Link>Assign to me</Link>
                                </FormControl>
                                <FormControl fullWidth>
                                    <Typography variant='subtitle1'>Reporter</Typography>
                                    <Select sx={{ marginBottom: '20px' }}>
                                        {user.map((userAssigne) => (
                                            <MenuItem >{userAssigne}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box padding='30px 50px' borderTop='3px solid #00000040'>
                            <Grid container xs={12}>
                                <Grid xs={9}>
                                    <FormControlLabel
                                        control={<Android12Switch defaultChecked />}
                                        label="Copy to next issue"
                                    />
                                </Grid>
                                <Grid xs={2}>
                                    <Button>Cancel</Button>
                                </Grid>
                                <Grid xs={1}>
                                    <Button variant='contained'>Create</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Dialog>
                </Box>
            </Box>
        </Box>
    )
}
