import { FormControl, TextField, Button, Typography, Link } from '@mui/material'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import app from '../../Firebase';
import LightWave from '../../assets/Images/lightModeWave.png'
import DarkWave from '../../assets/Images/darkModeWave.png'
import { ThemeContext } from '../../App'
import { toast } from 'react-hot-toast';

export const SignUp = () => {

  const navigate = useNavigate();

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

  const mode = useContext(ThemeContext)

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

  const auth = getAuth(app);
  const database = getDatabase(app);

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

    if (isError) {
      setErrorMessages(validationMessages)
    }
    if (!isError) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          set(ref(database, 'users/' + user.uid), {
            firstName: firstName,
            lastName: lastName,
            email: email,
          })
            .then(() => {
              setFirstName('');
              setLastName('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
              // Data saved successfully!
              toast.success('User Registered Successfully!');
            })
            .catch((error) => {
              // The write failed...
              toast.error(error);
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          toast.error(errorCode);
          const errorMessage = error.message;
          toast.error(errorMessage);
          // ..
        });
    }
  }

  const goToLogin = () => {
    navigate('/')
  }

  return (
    <>
      <Box fontFamily='Arial' display='flex' justifyContent='center' alignItems='center' textAlign='center' height='100vh'>
        <FormControl sx={{ zIndex: '2', marginBottom: '50px' }}>
          <Typography variant="h2" marginBottom='10px'>Sign up</Typography>
          <Typography variant="subtitle1" marginBottom='0px'>It's quick and easy</Typography>
          <Box marginBottom='10px'>
            <TextField sx={{ margin: '0px 5px 0px 0px', width: '170px' }} helperText={errorMessages.firstName} type='text' onChange={handleFNameChange} value={firstName} name='firstName' label="First name" variant="outlined" required />
            <TextField sx={{ margin: '0px 0px 0px 5px', width: '170px' }} helperText={errorMessages.lastName} type='text' onChange={handleLNameChange} value={lastName} name='lastName' label="Last name" variant="outlined" required />
          </Box>
          <TextField sx={{ margin: '0px 0px 0px 0px', width: '350px' }} helperText={errorMessages.email} type='email' name='email' value={email} onChange={handleEmailChange} label="Email address" variant="outlined" required />
          <Box display='flex' flexDirection='column'>
            <TextField sx={{ margin: '10px 0px 5px 0px', width: '350px' }} helperText={errorMessages.password} type='text' name='password' value={password} onChange={handlePasswordChange} id="outlined-basic" label="New password" variant="outlined" required />
            <TextField sx={{ margin: '5px 0px 10px 0px', width: '350px' }} helperText={errorMessages.confirmPassword} type='text' name='confirmPassword' value={confirmPassword} onChange={handleConfirmPassChange} id="outlined-basic" label="Confirm new password" variant="outlined" required />
          </Box>
          <Typography variant="subtitle1" marginBottom='15px'>Already a member? <Link color={mode === 'light' ? 'black' : '#20DF7F'} fontWeight='600' underline='none' onClick={goToLogin} style={{ cursor: 'pointer' }}>Log in</Link></Typography>
          <Button onClick={handleValidation} type='submit' variant="contained" sx={{ padding: '10px', fontSize: '1rem', fontWeight: '400', borderRadius: '10px', boxShadow: '0px 4px 4px 0px #0000004D', marginBottom: '20px' }}>Create Account</Button>
        </FormControl>
      </Box>
      {mode === 'light' ? <img style={{ width: '100vw', position: 'absolute', bottom: '0', zIndex: '1' }} src={LightWave} alt='Wave' /> : <img style={{ width: '100vw', position: 'absolute', bottom: '0', zIndex: '1' }} src={DarkWave} alt='Wave' />}
    </>
  )
}
