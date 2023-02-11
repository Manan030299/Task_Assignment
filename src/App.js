import { useState, useMemo, createContext } from 'react';
import { Box, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import { SignIn } from './components/login/SignIn';
import { SignUp } from './components/login/SignUp';
import { ProfileSetting } from './components/dashboard/ProfileSetting';
import { DashBoard } from './components/dashboard/DashBoard';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { blue } from '@mui/material/colors';

export const ThemeContext = createContext()

function App() {

  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,

          ...(mode === 'light'
            ? {
              // palette values for light mode
              primary: {
                main: '#20DF7F',
              },
              text: {
                primary: '#224957',
                secondary: blue[500],
              },
              action: {
                active: '#FFF'
              },
              background: {
                default: '#FFF',
              },

            }
            : {
              // palette values for dark mode
              primary: {
                main: '#20DF7F',
                contrastText: '#FFF',
              },
              text: {
                primary: '#FFF',
              },
              background: {
                default: '#093545',
                secondary: '#FFF',
                
              },
              
            }),
        },
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderRadius: "10px",
                  color: '#FFF',
                  // backgroundColor:'#224957',
                  margin: '0',
                }
              }
            }
          },
          MuiFormHelperText: {
            styleOverrides: {
              root: {
                color: "red"
              }
            }
          }
        }
      }),
    [mode],
  );

  return (
    <>
      <ThemeContext.Provider value={mode}>
        <ThemeProvider theme={theme}>
          <Box sx={{ bgcolor: 'background.default', color: 'text.primary'}} className="App">
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/dashboard' element={<DashBoard />} />
                <Route path='/profile-setting' element={<ProfileSetting />} />
              </Routes>
            </BrowserRouter>
            <Toaster position="top-center" reverseOrder={false} />
            <IconButton onClick={toggleColorMode} sx={{ position: 'fixed', bottom: '20px', left: '25px', bgcolor: '#FFFFFF', padding: '10px', borderRadius: '50%', boxShadow: "0px 4px 4px 0px #00000040", zIndex: '1300' }}>
              {theme.palette.mode === 'dark' ? <Brightness6Icon sx={{ color: '#2D2D2D', fontSize: '2rem' }} /> : <Brightness3Icon sx={{ color: '#2D2D2D', fontSize: '2rem', rotate: '135deg' }} />}</IconButton>
          </Box>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
