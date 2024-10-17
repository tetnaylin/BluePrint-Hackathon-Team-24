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
        hover: "#EECE2F",
        selected: "#EECE2F",
        focus: "#EECE2F"
      },
      divider: "#938F99",
    },
    typography: {
      h1: {
        fontSize: "3rem",
        fontWeight: 600,
      },
      h2: {
        fontSize: "1.75rem",
        fontWeight: 600,
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
      }
    }
  });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
