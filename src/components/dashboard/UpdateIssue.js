import React, { useState } from 'react'
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
import { EditorState ,convertToRaw } from 'draft-js';

export const UpdateIssue = (props) => {
    const { handleUpdateOpen, handleUpdateClose, selectedIssue, handleIssueChange, handleUpdate } = props;

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    
    const onEditorStateChange = (value) => {
       setEditorState(value)
       const descriptionValue = convertToRaw(value.getCurrentContent())
       handleIssueChange('description', descriptionValue.blocks[0].text)
   }

    const [assigneeList, setAssigneeList] = useState(['Manan Sharma', 'Vaibhav Manchikanti', 'Mayank Bhootra']);
    const [reporterList, setReportedList] = useState(['Manan Sharma', 'Vaibhav Manchikanti', 'Mayank Bhootra']);


    return (
        <>
            <Dialog open={handleUpdateOpen} maxWidth='lg' fullWidth>
                <Grid container xs={12}>
                    <Grid item xs={7} display='flex' flexDirection='column' sx={{ padding: '20px' }}>
                        <TextField sx={{ marginBottom: '20px', }} onChange={(e) => handleIssueChange('summary', e.target.value)} value={selectedIssue.summary} name='summary' />
                        <FormControl fullWidth>
                            <InputLabel id="issuetype">Issue Type</InputLabel>
                            <Select onChange={(e) => handleIssueChange('issueType', e.target.value)} value={selectedIssue.issueType} name="issueType" labelId="issuetype" label="Issue Type" sx={{ marginBottom: '20px', [`& .MuiSelect-select`]: {display:'inline-flex', alignItems:'initial',}}}>
                                <MenuItem value='story'><BookmarkIcon sx={{ bgcolor: '#30ca3b', color: '#FFF', padding: '2px', borderRadius: '5px', fontSize: '16px', marginRight:'10px', }} />Story</MenuItem>
                                <MenuItem value='task'><DoneIcon sx={{ bgcolor: '#3e9fdf', color: '#FFF', padding: '2px', borderRadius: '5px', fontSize: '16px', marginRight:'10px' }} />Task</MenuItem>
                                <MenuItem value='bug'><FiberManualRecordIcon sx={{ bgcolor: '#fc3324', color: '#FFF', padding: '2px', borderRadius: '5px', fontSize: '16px', marginRight:'10px' }} />Bug</MenuItem>
                                <MenuItem value='epic'><BoltIcon sx={{ bgcolor: '#aa08e5', color: '#FFF', padding: '2px', borderRadius: '5px', fontSize: '16px', marginRight:'10px' }} />Epic</MenuItem>
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
                            <Select onChange={(e) => handleIssueChange('status', e.target.value)} value={selectedIssue.status} name="status" labelId="status" label="Status" sx={{ marginBottom: '20px' }}>
                                <MenuItem value='todo'>TO DO</MenuItem>
                                <MenuItem value='inprogress'>IN PROGRESS</MenuItem>
                                <MenuItem value='completed'>COMPLETED</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="assignee">Assignee</InputLabel>
                            <Select onChange={(e) => handleIssueChange('assignee', e.target.value)} value={selectedIssue.assignee} name="assignee" labelId="assignee" label="Assignee" sx={{ marginBottom: '20px', [`& .MuiSelect-select`]: {display:'inline-flex', alignItems:'baseline',}}}>
                                {assigneeList.map((assignee, index) => (
                                    <MenuItem value={assignee}><Avatar sx={{marginRight:'10px', height:'35px', width:'35px', bgcolor: index % 2 === 0 ? '#2385ff' : '#f2d245'}}>{assignee[0][0]}</Avatar>{assignee}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="reporter">Reporter</InputLabel>
                            <Select onChange={(e) => handleIssueChange('reporter', e.target.value)} value={selectedIssue.reporter} name="reporter" labelId="reporter" label="Reporter" sx={{ marginBottom: '20px', [`& .MuiSelect-select`]: {display:'inline-flex', alignItems:'baseline',}}}>
                                {reporterList.map((reporter, index) => (
                                    <MenuItem value={reporter}><Avatar sx={{marginRight:'10px', height:'35px', width:'35px', bgcolor: index % 2 === 0 ? '#2385ff' : '#f2d245'}}>{reporter[0][0]}</Avatar>{reporter}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="priority">Priority</InputLabel>
                            <Select onChange={(e) => handleIssueChange('priority', e.target.value)} value={selectedIssue.priority} name="priority" defaultValue='Medium' labelId="priority" label="Priority" sx={{ marginBottom: '20px', [`& .MuiSelect-select`]: {display:'inline-flex', alignItems:'flex-end',}}}>
                                <MenuItem value='Highest'><KeyboardDoubleArrowUpIcon />Highest</MenuItem>
                                <MenuItem value='High'><KeyboardArrowUpIcon />High</MenuItem>
                                <MenuItem value='Medium'><DragHandleIcon />Medium</MenuItem>
                                <MenuItem value='Low'><KeyboardArrowDownIcon />Low</MenuItem>
                                <MenuItem value='Lowest'><KeyboardDoubleArrowDownIcon />Lowest</MenuItem>
                            </Select>
                        </FormControl>
                            <Typography marginTop='-10px' marginBottom='10px' variant='body2'>Created on: {selectedIssue.createdOn}</Typography>
                        <Box>
                            <Grid gap={3} display='flex' justifyContent='right'>
                                <Grid item>
                                    <Button variant='contained' onClick={handleUpdate}>Modify</Button>
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