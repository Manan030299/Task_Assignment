import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import { Box } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { Dialog } from '@mui/material'
import { FormControl } from '@mui/material'
import { MenuItem } from '@mui/material'
import { Select } from '@mui/material'
import { Typography } from '@mui/material'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BoltIcon from '@mui/icons-material/Bolt';
import DoneIcon from '@mui/icons-material/Done';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Editor } from 'react-draft-wysiwyg'
import { EditorState ,convertToRaw, ContentState} from 'draft-js';
import htmlToDraft from 'html-to-draftjs'

export const UpdateIssue = (props) => {
    const { handleUpdateOpen, handleUpdateClose, selectedIssue, handleIssueChange, handleUpdate, invitedUsers, handleModified, handleDescriptionIssueChange } = props;

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    
    useEffect(() => {
        if(selectedIssue.description){
            setEditorState(htmlToDraftBlocks(selectedIssue.description));
        }
    }, [selectedIssue]);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const onEditorStateChange = (value) => {
        setEditorState(value)
        const descriptionValue = convertToRaw(value.getCurrentContent())
        handleDescriptionIssueChange('description', descriptionValue.blocks[0].text)
    }

    const htmlToDraftBlocks = (value) => {
        const blocksFromHtml = htmlToDraft(value);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        return editorState;
    }

   const getFormattedDate = (date1) => {
    const date = new Date(date1)
    let month = months[date.getMonth()];
    let day = days[date.getDay()];
    return day + ', ' + date.getDate() + ' ' + month + ' ' + date.getFullYear() + ' | ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
   }

    return (
        <>
            <Dialog open={handleUpdateOpen} maxWidth='lg' fullWidth>
                <Grid container>
                    <Grid item xs={7} display='flex' flexDirection='column' sx={{ padding: '20px' }}>
                        <TextField sx={{ marginBottom: '20px', }} onChange={handleIssueChange} value={selectedIssue.summary} name='summary' />
                        <FormControl fullWidth>
                            <InputLabel id="issuetype">Issue Type</InputLabel>
                            <Select onChange={handleIssueChange} value={selectedIssue.issueType} name="issueType" labelId="issuetype" label="Issue Type" sx={{ marginBottom: '20px', [`& .MuiSelect-select`]: {display:'inline-flex', alignItems:'initial',}}}>
                                <MenuItem value='STORY'><BookmarkIcon sx={{ bgcolor: '#30ca3b', color: '#FFF', padding: '2px', borderRadius: '5px', fontSize: '16px', marginRight:'10px', }} />Story</MenuItem>
                                <MenuItem value='TASK'><DoneIcon sx={{ bgcolor: '#3e9fdf', color: '#FFF', padding: '2px', borderRadius: '5px', fontSize: '16px', marginRight:'10px' }} />Task</MenuItem>
                                <MenuItem value='BUG'><FiberManualRecordIcon sx={{ bgcolor: '#fc3324', color: '#FFF', padding: '2px', borderRadius: '5px', fontSize: '16px', marginRight:'10px' }} />Bug</MenuItem>
                                <MenuItem value='EPIC'><BoltIcon sx={{ bgcolor: '#aa08e5', color: '#FFF', padding: '2px', borderRadius: '5px', fontSize: '16px', marginRight:'10px' }} />Epic</MenuItem>
                            </Select>
                        </FormControl>
                        <Box sx={{ marginBottom: '20px' }}>
                            <Typography variant='subtitle1'>Description</Typography>
                            <Box border='1px solid #00000040' borderRadius='10px' padding='10px'>
                            <Editor editorState={editorState} wrapperClassName="demo-wrapper" editorClassName="demo-editor" onEditorStateChange={onEditorStateChange} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} display='flex' flexDirection='column' sx={{ padding: '20px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="status">Status</InputLabel>
                            <Select onChange={handleIssueChange} value={selectedIssue.status} name="status" labelId="status" label="Status" sx={{ marginBottom: '20px' }}>
                                <MenuItem value='TODO'>TO DO</MenuItem>
                                <MenuItem value='INPROGRESS'>IN PROGRESS</MenuItem>
                                <MenuItem value='COMPLETED'>COMPLETED</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="assignee">Assignee</InputLabel>
                            <Select onChange={handleIssueChange} value={selectedIssue.assigneeId} name="assigneeId" labelId="assignee" label="Assignee" sx={{ marginBottom: '20px', [`& .MuiSelect-select`]: {display:'inline-flex', alignItems:'baseline',}}}>
                                {invitedUsers.map((assignee, index) => (
                                    <MenuItem key={`invite_${index}`} value={assignee.uid}><Avatar sx={{marginRight:'10px', height:'35px', width:'35px', bgcolor: index % 2 === 0 ? '#2385ff' : '#f2d245'}}>{assignee.firstName[0]}</Avatar>{assignee.firstName + ' ' + assignee.lastName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="reporter">Reporter</InputLabel>
                            <Select onChange={handleIssueChange} value={selectedIssue.reporterId} name="reporterId" labelId="reporter" label="Reporter" sx={{ marginBottom: '20px', [`& .MuiSelect-select`]: {display:'inline-flex', alignItems:'baseline',}}}>
                                {invitedUsers.map((reporter, index) => (
                                    <MenuItem key={`invite1_${index}`} value={reporter.uid}><Avatar sx={{marginRight:'10px', height:'35px', width:'35px', bgcolor: index % 2 === 0 ? '#2385ff' : '#f2d245'}}>{reporter.firstName[0]}</Avatar>{reporter.firstName + ' ' + reporter.lastName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="priority">Priority</InputLabel>
                            <Select onChange={handleIssueChange} value={selectedIssue.priority} name="priority" defaultValue='Medium' labelId="priority" label="Priority" sx={{ marginBottom: '20px', [`& .MuiSelect-select`]: {display:'inline-flex', alignItems:'flex-end',}}}>
                                <MenuItem value='HIGHEST'><KeyboardDoubleArrowUpIcon />Highest</MenuItem>
                                <MenuItem value='HIGH'><KeyboardArrowUpIcon />High</MenuItem>
                                <MenuItem value='MEDIUM'><DragHandleIcon />Medium</MenuItem>
                                <MenuItem value='LOW'><KeyboardArrowDownIcon />Low</MenuItem>
                                <MenuItem value='LOWEST'><KeyboardDoubleArrowDownIcon />Lowest</MenuItem>
                            </Select>
                        </FormControl>
                            <Typography marginTop='0px' marginBottom='10px' variant='body2'>Created on: {getFormattedDate(selectedIssue.createdOn)}</Typography>
                            {!selectedIssue.modifiedOn? '' : (<Typography marginTop='0px' marginBottom='10px' variant='body2'>Modified on: {getFormattedDate(selectedIssue.modifiedOn)}</Typography>)}
                        <Box marginTop='10px'>
                            <Grid gap={3} display='flex' justifyContent='right'>
                                <Grid item>
                                    <Button variant='contained' disabled={handleModified} onClick={handleUpdate}>Modify</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant='contained' onClick={handleUpdateClose}>Cancel</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}