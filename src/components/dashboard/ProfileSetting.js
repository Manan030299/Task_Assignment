import React, { useContext, useState } from 'react'
import ResponsiveAppBar from '../../common/AppBar';
import { FormControl, TextField, Typography, Drawer, Box, Toolbar, Avatar, Button, Divider, ListItemIcon, ListItemButton, ListItemText, List, ListItem, Link, Dialog } from '@mui/material';
import { blue } from '@mui/material/colors';
import HouseIcon from '@mui/icons-material/House';
import { ThemeContext } from '../../App';
import { digitsRegExp, emailValidRegExp, lowercaseRegExp, minLengthRegExp, specialCharRegExp, uppercaseRegExp } from '../../constant/config';

export const ProfileSetting = () => {

    const mode = useContext(ThemeContext)

    const [errorMessages, setErrorMessages] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [profileInput, SetProfileInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [openPass, setOpenPass] = useState(false);

    const handleClickOpen = () => {
      setOpenPass(true);
    };
  
    const handleClose = () => {
      setOpenPass(false);
    };

    const onHandleChange = (e) => {
        const {name, value} = e.target;
        SetProfileInput({...profileInput, [name]: value})
    }

    const handleValidation = () => {

        const validationMessages = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }

        let isError = false;
        let message = '';

        if (!profileInput.firstName) {
            validationMessages.firstName = 'Please enter first name'
            isError = true;
        }

        if (!profileInput.lastName) {
            validationMessages.lastName = 'Please enter last name'
            isError = true;
        }

        if (!emailValidRegExp.test(profileInput.email)) {
            validationMessages.email = 'Please enter a valid email address'
            isError = true;
        }

        if (!minLengthRegExp.test(profileInput.password)) {
            message = message + 'one 8 characters, '
            isError = true;
        }

        if (!uppercaseRegExp.test(profileInput.password)) {
            message = message + 'one upper case, '
            isError = true;
        }

        if (!lowercaseRegExp.test(profileInput.password)) {
            message = message + 'one lower case, '
            isError = true;
        }

        if (!specialCharRegExp.test(profileInput.password)) {
            message = message + 'one special Character, '
            isError = true;
        }

        if (!digitsRegExp.test(profileInput.password)) {
            message = message + 'one  number '
            isError = true;
        }

        if (profileInput.confirmPassword === profileInput.password) {
            validationMessages.confirmPassword = ''
        } else {
            validationMessages.confirmPassword = 'Passwords do not match'
            isError = true;
        }

        validationMessages.password = message ? 'Password should contain atleast ' + message : ''
        setErrorMessages(validationMessages);
    }

    return (

        <Box sx={{ display: 'flex', height: '100vh' }}>
            <ResponsiveAppBar />
            <Drawer
                variant="permanent"
                sx={{
                    width: 350,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 350, boxSizing: 'border-box', bgcolor: mode === 'light' ? '' : 'background.default' },

                }}
            >
                <Toolbar />
                <Box marginTop='50px'>
                    <Box display='flex' justifyContent='center' >
                        <Avatar sx={{ scale: '2', bgcolor: blue[200], }}>M</Avatar>
                    </Box>
                    <Box display='flex' justifyContent='center' marginTop='40px' marginBottom='10px'>
                        <Typography variant='h4' fontWeight='600'>Manan Sharma</Typography>
                    </Box>
                    <Divider />
                    <List disablePadding>
                        {['Account'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton sx={{ padding: '12px', }}>
                                    <ListItemIcon sx={{ color: 'text.secondary' }}>
                                        {index % 2 === 0 ? <HouseIcon /> : <HouseIcon />}
                                    </ListItemIcon>
                                    <ListItemText sx={{ fontWeight: '600', color: 'text.secondary' }}>
                                        <Typography variant='h6' fontWeight='600'>{text}</Typography>
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List >
                    <Divider />
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Box margin='10px'>
                    <FormControl>
                        <Typography marginBottom='20px' variant='h4'>Account Settings</Typography>
                        <Box marginBottom='35px'>
                            <TextField sx={{ margin: '0px 10px 0px 0px', width: '280px' }} variant='outlined' onChange={onHandleChange} name='firstName' error={errorMessages.firstName} value={profileInput.firstName} label='First name' />
                            <TextField sx={{ margin: '0px 0px 0px 5px', width: '280px' }} variant='outlined' onChange={onHandleChange} name='lastName' error={errorMessages.lastName} value={profileInput.lastName} label='Last name' />
                        </Box>
                        <TextField sx={{ margin: '0px 0px 25px 0px', width: '575px' }} variant='outlined' onChange={onHandleChange} type='email' name='email' error={errorMessages.email} value={profileInput.email} label='Email address' />
                        <Link style={{cursor:'pointer'}} onClick={handleClickOpen} marginBottom='30px'>Change password</Link>
                        <Dialog open={openPass}>
                            <Box sx={{ padding: '30px', display:'flex', flexDirection:'column'}}>
                                <Typography variant='h5' marginBottom='10px'>Change password</Typography>
                                <TextField sx={{ margin: '0px 0px 20px 0px', width: '375px' }} variant='outlined' type='password' name='password' label='Current Password' />
                                <TextField sx={{ margin: '0px 0px 20px 0px', width: '375px' }} variant='outlined' onChange={onHandleChange} type='password' name='password' error={errorMessages.password} value={profileInput.password} label='New Password' />
                                <TextField sx={{ margin: '0px 0px 20px 0px', width: '375px' }} variant='outlined' onChange={onHandleChange} type='password' name='confirmPassword' error={errorMessages.confirmPassword} value={profileInput.confirmPassword} label='Confirm New password' />
                                <Box sx={{display:'flex', justifyContent:'center', marginTop:'5px'}}>
                                    <Button type='submit' variant="contained" sx={{ padding: '10px', fontSize: '1rem', fontWeight: '400', borderRadius: '10px', boxShadow: '0px 4px 4px 0px #0000004D', width: '130px', margin: '0px 10px 0px 0px' }}>Confirm</Button>
                                    <Button type='submit' onClick={handleClose} variant="contained" sx={{ padding: '10px', fontSize: '1rem', fontWeight: '400', borderRadius: '10px', boxShadow: '0px 4px 4px 0px #0000004D', width: '130px', margin: '0px 0px 0px 10px' }}>Cancel</Button>
                                </Box>
                            </Box>
                        </Dialog>
                        <Button onClick={handleValidation} type='submit' variant="contained" sx={{ padding: '10px', fontSize: '1rem', fontWeight: '400', borderRadius: '10px', boxShadow: '0px 4px 4px 0px #0000004D', marginBottom: '20px', width: '280px' }}>Modify</Button>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}
