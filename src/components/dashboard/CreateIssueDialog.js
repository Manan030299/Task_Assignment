import React, { useState } from 'react'
import { Typography, Box, Divider, Dialog, FormControl, Switch, styled, Select, MenuItem, Link, Grid, Button, FormControlLabel, Avatar, OutlinedInput, FormHelperText, } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BoltIcon from '@mui/icons-material/Bolt';
import DoneIcon from '@mui/icons-material/Done';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Editor} from "react-draft-wysiwyg";
import { EditorState ,convertToRaw } from 'draft-js';

export const CreateIssueDialog = (props) => {
    const {openCreate, handleClose, onHandleChange, createIssueInput, projectList, invitedUsers, writeUserData, handleSwitchChange, switchCheck} = props

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    
     const onEditorStateChange = (value) => {
        setEditorState(value)
        const descriptionValue = convertToRaw(value.getCurrentContent())
        onHandleChange('description', descriptionValue.blocks[0].text)
    }

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
            <Dialog open={openCreate} maxWidth='md'>
                <Box padding='30px 20px' boxShadow="0px 4px 4px 0px #00000040">
                    <Typography variant='h5' fontWeight='600'>Create issue</Typography>
                </Box>
                <Box padding='20px' sx={{ overflowY: 'auto' }}>
                    <Box marginBottom='20px'>
                        <FormControl fullWidth>
                            <Typography variant='subtitle1'>Project</Typography>
                            <Select onChange={(e) => {onHandleChange('project',e.target.value)}} name="project" value={createIssueInput.project} sx={{ marginBottom: '20px' }}>
                                {projectList.map((projectName, index) => (
                                    <MenuItem key={`project_${index}`} value={projectName}>{projectName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <Typography variant='subtitle1'>Issue type</Typography>
                            <Select onChange={(e) => {onHandleChange('issueType',e.target.value)}} name="issueType" value={createIssueInput.issueType} sx={{ marginBottom: '20px', [`& .MuiSelect-select`]: {display:'inline-flex', alignItems:'initial',}}}>
                                <MenuItem value='story'><BookmarkIcon sx={{ bgcolor: '#30ca3b', color: '#FFF', padding: '2px', borderRadius: '5px', fontSize: '16px',marginRight:'10px' }} />Story</MenuItem>
                                <MenuItem value='task'><DoneIcon sx={{ bgcolor: '#3e9fdf', color: '#FFF', padding: '2px', borderRadius: '5px', fontSize: '16px', marginRight:'10px' }} />Task</MenuItem>
                                <MenuItem value='bug'><FiberManualRecordIcon sx={{ bgcolor: '#fc3324', color: '#FFF', padding: '2px', borderRadius: '5px', fontSize: '16px', marginRight:'10px' }} />Bug</MenuItem>
                                <MenuItem value='epic'><BoltIcon sx={{ bgcolor: '#aa08e5', color: '#FFF', padding: '2px', borderRadius: '5px', fontSize: '16px', marginRight:'10px' }} />Epic</MenuItem>
                            </Select>
                            <Link>Learn more</Link>
                        </FormControl>
                    </Box>
                    <Divider />
                    <Box marginTop='20px'>
                        <FormControl fullWidth>
                            <Typography variant='subtitle1'>Status</Typography>
                            <Select onChange={(e) => {onHandleChange('status',e.target.value)}} name="status" value={createIssueInput.status} sx={{ marginBottom: '20px' }}>
                                <MenuItem value='todo'>TO DO</MenuItem>
                                <MenuItem value='inprogress'>IN PROGRESS</MenuItem>
                                <MenuItem value='completed'>COMPLETED</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ marginBottom: '20px' }} fullWidth>
                            <Typography variant='subtitle1'>Summary</Typography>
                            <OutlinedInput onChange={(e) => {onHandleChange('summary',e.target.value)}} name="summary" value={createIssueInput.summary} />
                            <FormHelperText>This is the issue's initial status upon creation</FormHelperText>
                        </FormControl>
                        <Box sx={{ marginBottom: '20px' }}>
                            <Typography variant='subtitle1'>Description</Typography>
                            <Box border='1px solid #00000040' borderRadius='10px' padding='10px'>
                            <Editor editorState={editorState} wrapperClassName="demo-wrapper" editorClassName="demo-editor" onEditorStateChange={onEditorStateChange} />
                            </Box>
                        </Box>
                        <FormControl sx={{ marginBottom: '20px' }} fullWidth>
                            <Typography variant='subtitle1'>Assignee</Typography>
                            <Select onChange={(e) => {onHandleChange('assignee',e.target.value)}} name="assignee" value={createIssueInput.assignee} sx={{ marginBottom: '10px', [`& .MuiSelect-select`]: {display:'inline-flex', alignItems:'baseline',}}}>
                                {invitedUsers.map((assignee, index) => (
                                    <MenuItem key={`issueDialog_${index}`} value={assignee.firstName + ' ' + assignee.lastName}><Avatar sx={{marginRight:'10px', height:'35px', width:'35px', bgcolor: index % 2 === 0 ? '#2385ff' : '#f2d245'}}>{assignee.firstName[0]}</Avatar>{assignee.firstName + ' ' + assignee.lastName}</MenuItem>
                                ))}
                            </Select>
                            <Link>Assign to me</Link>
                        </FormControl>
                        <FormControl fullWidth>
                            <Typography variant='subtitle1'>Reporter</Typography>
                            <Select onChange={(e) => {onHandleChange('reporter',e.target.value)}} name="reporter" value={createIssueInput.reporter} sx={{ marginBottom: '20px', [`& .MuiSelect-select`]: {display:'inline-flex', alignItems:'baseline',}}}>
                                {invitedUsers.map((reporter, index) => (
                                    <MenuItem key={`inite2_${index}`} value={reporter.firstName + ' ' + reporter.lastName}><Avatar sx={{marginRight:'10px', height:'35px', width:'35px', bgcolor: index % 2 === 0 ? '#2385ff' : '#f2d245'}}>{reporter.firstName[0]}</Avatar>{reporter.firstName + ' ' + reporter.lastName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <Typography variant='subtitle1'>Priority</Typography>
                            <Select onChange={(e) => {onHandleChange('priority',e.target.value)}} name="priority" value={createIssueInput.priority} sx={{ marginBottom: '20px', [`& .MuiSelect-select`]: {display:'inline-flex', alignItems:'flex-end',}}}>
                                <MenuItem value='Highest'><KeyboardDoubleArrowUpIcon />Highest</MenuItem>
                                <MenuItem value='High'><KeyboardArrowUpIcon />High</MenuItem>
                                <MenuItem value='Medium'><DragHandleIcon />Medium</MenuItem>
                                <MenuItem value='Low'><KeyboardArrowDownIcon />Low</MenuItem>
                                <MenuItem value='Lowest'><KeyboardDoubleArrowDownIcon />Lowest</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box padding='30px 50px' borderTop='3px solid #00000040'>
                    <Grid container >
                        <Grid item xs={9}>
                            <FormControlLabel
                                control={<Android12Switch checked={switchCheck} onChange={handleSwitchChange} />}
                                label="Copy to next issue"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button onClick={handleClose}>Cancel</Button>
                        </Grid>
                        <Grid item xs={1}>
                            <Button variant='contained' onClick={writeUserData}>Create</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        </>
    )
}
