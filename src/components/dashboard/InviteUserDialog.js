import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Avatar, Button, Dialog, Grid, Typography } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function InviteUserDialog(props) {
  const { handleCloseInviteDialog, openInviteDialog, inviteUserList, } = props;

  const [inviteUser, setinviteUser] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setinviteUser(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const invitePeopleToTeam = () => {
    
  }

  return (
    <Box>
      <Dialog open={openInviteDialog}>
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{ padding: '20px' }} >
          <Box>
          <Typography marginBottom='10px' variant='subtitle1' fontWeight='600'>Invite people to Team</Typography>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">Invite people</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={inviteUser}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Invite people" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, }}>
                    {selected.map((value, index) => (
                      <Chip key={`chip_${index}`} label={<Box sx={{display:'inline-flex', alignItems:'baseline',}}><Avatar sx={{marginRight:'5px', fontSize:'1rem', height:'25px', width:'25px', bgcolor: index % 2 === 0 ? '#2385ff' : '#f2d245'}}>{value.firstName[0]}</Avatar>{value.email}</Box>} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {inviteUserList.map((name, index) => (
                  <MenuItem key={`menu_${index}`} value={name} sx={{display:'inline-flex', alignItems:'baseline', width:'100%'}}><Avatar sx={{marginRight:'10px', height:'35px', width:'35px', bgcolor: index % 2 === 0 ? '#2385ff' : '#f2d245'}}>{name.firstName[0]}</Avatar>{name.email}</MenuItem>
                ))}
              </Select>
              <Grid gap={3} display='flex' justifyContent='right'>
                <Grid item>
                  <Button sx={{ marginTop: '20px', borderRadius: '10px' }} variant='outlined' onClick={handleCloseInviteDialog}>Close</Button>
                </Grid>
                <Grid item>
                  <Button sx={{ marginTop: '20px', borderRadius: '10px' }} variant='contained' onClick={invitePeopleToTeam}>Invite</Button>
                </Grid>
              </Grid>
            </FormControl>
          </Box>
        </Box>
      </Dialog>

    </Box>
  );
}