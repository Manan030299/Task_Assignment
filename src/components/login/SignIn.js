import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import LightWave from '../../assets/Images/lightModeWave.png'
import DarkWave from '../../assets/Images/darkModeWave.png'
import { ThemeContext } from '../../App'
import { FormControl } from '@mui/material'
import { FormControlLabel } from '@mui/material'
import { TextField } from '@mui/material'
import { Checkbox } from '@mui/material'
import { Link } from '@mui/material'
import { Button} from '@mui/material'
import { Typography} from '@mui/material'
import{ Box }from '@mui/material'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../Firebase'
import { toast } from 'react-hot-toast'

export const SignIn = () => {
  
  const navigate = useNavigate();

  const [signinInput, setSigninInput] = useState({
    email:'',
    password:''
  })

  const [errorMessages, setErrorMessages] = useState({
    email:'',
    password:''
  })

  const mode = useContext(ThemeContext)

  const onHandleChange = (e) => {
    const {name, value} = e.target;
    setSigninInput({...signinInput, [name]: value})
  }

  const auth = getAuth(app);

  const handleValidation = () => {

    let isError = false;
    let validationMessages = {
      email:'',
      password:''
    }
    if(!signinInput.email){
      validationMessages.email = 'Please enter email address'
      isError = true
    }
    if(!signinInput.password){
      validationMessages.password = 'Please enter password'
      isError = true
    }

    if(isError){
      setErrorMessages(validationMessages)
    }
    if(!isError){
      signInWithEmailAndPassword(auth, signinInput.email, signinInput.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast.success('User Logged Successfully')
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage)
      });
    }  
  }

  const goToSignUp = () => {
    navigate('/signup');
  }

  return (
    <>
      <Box fontFamily='Arial' display='flex' justifyContent='center' alignItems='center' textAlign='center' height='100vh'>
        <FormControl sx={{zIndex:'2'}}>
          <Typography variant="h2" marginBottom='10px'>Sign in</Typography>
          <Typography variant="subtitle1" marginBottom='20px'>Sign in and start managing your candidates!</Typography>
          <TextField sx={{ margin: '0px 0px 10px 0px'}} helperText={errorMessages.email} type='email' name='email' value={signinInput.email} onChange={onHandleChange} label="Email Address" variant="outlined" />
          <TextField sx={{ margin: '10px 0px 0px 0px'}} helperText={errorMessages.password} type='text' name='password' value={signinInput.password} onChange={onHandleChange} id="outlined-basic" label="Password" variant="outlined" />
          <Box >
            <FormControlLabel sx={{ marginRight: '45px' }} control={<Checkbox />} label="Remember me" />
            <Link color={mode === 'light' ? 'black' : '#20DF7F'} underline='none' href=''>Forgot password?</Link>
          </Box>
          <Button onClick={handleValidation} type='submit' variant="contained" sx={{ padding: '10px', fontSize: '1rem', margin: '10px 0', fontWeight: '400', borderRadius: '10px', boxShadow: '0px 4px 4px 0px #0000004D', marginBottom: '20px' }}>Login</Button>
          <Typography variant="subtitle1" marginBottom='100px'> Don't have an account? <Link color={mode === 'light' ? 'black' : '#20DF7F'} fontWeight='600' underline='none' onClick={goToSignUp} style={{cursor:'pointer'}}>Sign up</Link></Typography>
        </FormControl>
      </Box>

      {mode === 'light'? <img style={{ width: '100vw', position: 'absolute', bottom: '0', zIndex:'0'}} src={LightWave} alt='Wave' /> : <img style={{ width: '100vw', position: 'absolute', bottom: '0', zIndex:'0'}} src={DarkWave} alt='Wave' />} 
    </>
  )
}
