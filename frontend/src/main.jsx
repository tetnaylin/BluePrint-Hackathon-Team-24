import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme( {
    palette: {
      primary: {
        main: "#938F99",
        contrastText: "#EECE2F"
      }, 
      secondary: {
        main: "#EECE2F",
        contrastText: "#313131",
      },
      background: {
        default: "#313131",
        paper: "#313131"
      },
      text: {
        primary: "#EECE2F",
        secondary: "#938F99",
        disabled: "#938F99",
        icon: "#938F99",
      },
      action: {
        active: "#EECE2F",
        hover: "#938F99",
        hoverOpacity: 0.05,
        selected: "#EECE2F",
        focus: "#EECE2F"
      },
      divider: "#938F99",
      grey: {
        400: "#938F99",
        900: "#938F99",
        800: "#938F99",
        700: "#938F99",
        600: "#938F99",
        500: "#938F99",
        300: "#938F99",
        200: "#938F99",
        100: "#938F99",
        A700: "#938F99",
      },
    },
    typography: {
      h1: {
        fontSize: 60,
        fontWeight: 600,
      },
      h2: {
        fontSize: 50,
        fontWeight: 400,
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
      }
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: "#EECE2F", // Change the border color when focused
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#EECE2F'
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#938F99'
            },
          }
          },
        },
      },
    });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
