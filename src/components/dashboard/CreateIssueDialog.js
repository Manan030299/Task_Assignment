import React from 'react'
import { Typography, Box, Divider, Dialog, FormControl, Select, MenuItem, Link, Grid, Button, FormControlLabel, OutlinedInput, FormHelperText, } from '@mui/material';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const CreateIssueDialog = () => {

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
        <>
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
                                    <MenuItem >{projectName}</MenuItem>
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
        </>
    )
}
