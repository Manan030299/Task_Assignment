import React from 'react'

export const CustomTheme= () => {
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
                    // secondary: blue[500],
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

    </>
  )
}
