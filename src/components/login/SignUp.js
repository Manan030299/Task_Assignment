import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import app from '../../Firebase';
import LightWave from '../../assets/Images/lightModeWave.png'
import DarkWave from '../../assets/Images/darkModeWave.png'
import { ThemeContext } from '../../App'
import { toast } from 'react-hot-toast';
import { FormControl} from '@mui/material'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import { Typography } from '@mui/material'
import { Link } from '@mui/material'
import { Box } from '@mui/material'
import { digitsRegExp, emailValidRegExp, lowercaseRegExp, minLengthRegExp, specialCharRegExp, uppercaseRegExp } from '../../constant/config';

export const SignUp = () => {

  const navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [signupInput, setSignupInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const mode = useContext(ThemeContext)

  const onHandleChange = (e) => {
    const {name, value} = e.target;
    setSignupInput({...signupInput, [name]: value})
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

    if (!signupInput.firstName) {
      validationMessages.firstName = 'Please enter first name'
      isError = true;
    }

    if (!signupInput.lastName) {
      validationMessages.lastName = 'Please enter last name'
      isError = true;
    }

    if (!emailValidRegExp.test(signupInput.email)) {
      validationMessages.email = 'Please enter a valid email address'
      isError = true;
    }

    if (!minLengthRegExp.test(signupInput.password)) {
      message = message + 'one 8 characters, '
      isError = true;
    }

    if (!uppercaseRegExp.test(signupInput.password)) {
      message = message + 'one upper case, '
      isError = true;
    }

    if (!lowercaseRegExp.test(signupInput.password)) {
      message = message + 'one lower case, '
      isError = true;
    }

    if (!specialCharRegExp.test(signupInput.password)) {
      message = message + 'one special Character, '
      isError = true;
    }

    if (!digitsRegExp.test(signupInput.password)) {
      message = message + 'one  number '
      isError = true;
    }

    if (signupInput.confirmPassword === signupInput.password) {
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
      createUserWithEmailAndPassword(auth, signupInput.email, signupInput.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          set(ref(database, 'users/' + user.uid), {
            firstName: signupInput.firstName,
            lastName: signupInput.lastName,
            email: signupInput.email,
          })
            .then(() => {
              // Data saved successfully!
              toast.success('User Registered Successfully!');
            })
        })
        .catch((error) => {
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
            <TextField sx={{ margin: '0px 5px 0px 0px', width: '170px' }} helperText={errorMessages.firstName} type='text' onChange={onHandleChange} value={signupInput.firstName} name='firstName' label="First name" variant="outlined" required />
            <TextField sx={{ margin: '0px 0px 0px 5px', width: '170px' }} helperText={errorMessages.lastName} type='text' onChange={onHandleChange} value={signupInput.lastName} name='lastName' label="Last name" variant="outlined" required />
          </Box>
          <TextField sx={{ margin: '0px 0px 0px 0px', width: '350px' }} helperText={errorMessages.email} type='email' name='email' value={signupInput.email} onChange={onHandleChange} label="Email address" variant="outlined" required />
          <Box display='flex' flexDirection='column'>
            <TextField sx={{ margin: '10px 0px 5px 0px', width: '350px' }} helperText={errorMessages.password} type='text' name='password' value={signupInput.password} onChange={onHandleChange} id="outlined-basic" label="New password" variant="outlined" required />
            <TextField sx={{ margin: '5px 0px 10px 0px', width: '350px' }} helperText={errorMessages.confirmPassword} type='text' name='confirmPassword' value={signupInput.confirmPassword} onChange={onHandleChange} id="outlined-basic" label="Confirm new password" variant="outlined" required />
          </Box>
          <Typography variant="subtitle1" marginBottom='15px'>Already a member? <Link color={mode === 'light' ? 'black' : '#20DF7F'} fontWeight='600' underline='none' onClick={goToLogin} style={{ cursor: 'pointer' }}>Log in</Link></Typography>
          <Button onClick={handleValidation} type='submit' variant="contained" sx={{ padding: '10px', fontSize: '1rem', fontWeight: '400', borderRadius: '10px', boxShadow: '0px 4px 4px 0px #0000004D', marginBottom: '20px' }}>Create Account</Button>
        </FormControl>
      </Box>
      {mode === 'light' ? <img style={{ width: '100vw', position: 'absolute', bottom: '0', zIndex: '1' }} src={LightWave} alt='Wave' /> : <img style={{ width: '100vw', position: 'absolute', bottom: '0', zIndex: '1' }} src={DarkWave} alt='Wave' />}
    </>
  )
}
