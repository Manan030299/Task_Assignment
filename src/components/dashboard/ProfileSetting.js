import React, { useContext, useState } from 'react'
import ResponsiveAppBar from '../../containers/AppBar';
import { FormControl, TextField, Typography, Drawer, Box, Toolbar, Avatar, Button, Divider, ListItemIcon, ListItemButton, ListItemText, List, ListItem, Link, Dialog } from '@mui/material';
import { blue } from '@mui/material/colors';
import HouseIcon from '@mui/icons-material/House';
import { ThemeContext } from '../../App';

const drawerWidth = 350

export const ProfileSetting = () => {

    const mode = useContext(ThemeContext)

    const [errorMessages, setErrorMessages] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [openPass, setOpenPass] = useState(false);

    const handleClickOpen = () => {
      setOpenPass(true);
    };
  
    const handleClose = () => {
      setOpenPass(false);
    };

    const handleFNameChange = (e) => {
        setFirstName(e.target.value)
    }

    const handleLNameChange = (e) => {
        setLastName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPassChange = (e) => {
        setConfirmPassword(e.target.value)
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

        const emailValidRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        const uppercaseRegExp = /(?=.*?[A-Z])/;
        const lowercaseRegExp = /(?=.*?[a-z])/;
        const digitsRegExp = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp = /.{8,}/;

        if (!firstName) {
            validationMessages.firstName = 'Please enter first name'
            isError = true;
        }

        if (!lastName) {
            validationMessages.lastName = 'Please enter last name'
            isError = true;
        }

        if (!emailValidRegExp.test(email)) {
            validationMessages.email = 'Please enter a valid email address'
            isError = true;
        }

        if (!minLengthRegExp.test(password)) {
            message = message + 'one 8 characters, '
            isError = true;
        }

        if (!uppercaseRegExp.test(password)) {
            message = message + 'one upper case, '
            isError = true;
        }

        if (!lowercaseRegExp.test(password)) {
            message = message + 'one lower case, '
            isError = true;
        }

        if (!specialCharRegExp.test(password)) {
            message = message + 'one special Character, '
            isError = true;
        }

        if (!digitsRegExp.test(password)) {
            message = message + 'one  number '
            isError = true;
        }

        if (confirmPassword === password) {
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
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: mode === 'light' ? '' : 'background.default' },

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
                            <TextField sx={{ margin: '0px 10px 0px 0px', width: '280px' }} variant='outlined' onChange={handleFNameChange} name='firstName' error={errorMessages.firstName} value={firstName} label='First name' />
                            <TextField sx={{ margin: '0px 0px 0px 5px', width: '280px' }} variant='outlined' onChange={handleLNameChange} name='lastName' error={errorMessages.lastName} value={lastName} label='Last name' />
                        </Box>
                        <TextField sx={{ margin: '0px 0px 25px 0px', width: '575px' }} variant='outlined' onChange={handleEmailChange} type='email' name='email' error={errorMessages.email} value={email} label='Email address' />
                        <Link style={{cursor:'pointer'}} onClick={handleClickOpen} marginBottom='30px'>Change password</Link>
                        <Dialog open={openPass}>
                            <Box sx={{ padding: '30px', display:'flex', flexDirection:'column'}}>
                                <Typography variant='h5' marginBottom='10px'>Change password</Typography>
                                <TextField sx={{ margin: '0px 0px 20px 0px', width: '375px' }} variant='outlined' type='password' name='password' label='Current Password' />
                                <TextField sx={{ margin: '0px 0px 20px 0px', width: '375px' }} variant='outlined' onChange={handlePasswordChange} type='password' name='password' error={errorMessages.password} value={password} label='New Password' />
                                <TextField sx={{ margin: '0px 0px 20px 0px', width: '375px' }} variant='outlined' onChange={handleConfirmPassChange} type='password' name='confirmPassword' error={errorMessages.confirmPassword} value={confirmPassword} label='Confirm New password' />
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
