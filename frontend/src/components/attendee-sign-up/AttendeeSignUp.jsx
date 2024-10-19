import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import ProfileImage from '../../assets/logo.png';
import { Avatar, IconButton, InputAdornment, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Navigate, useNavigate } from 'react-router-dom';
import checkLoggedIn from '../../util/verifyUser';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  background: "#313131",
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0),
  },
}));

export default function AttendeeSignUp() {
    const [zIdError, setzIdError] = React.useState(false);
    const [zIdErrorMessage, setzIdErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const navigate = useNavigate();
    const [signedIn, setSignedIn] = React.useState(false);

    React.useEffect(() => {
      const loginCheck = async () => {
          const signed_in = await checkLoggedIn();
          setSignedIn(signed_in);
      } 
      loginCheck();
  }, []);

  React.useEffect(() => {
    console.log(signedIn);
    if(signedIn) {
      navigate("/events");
    }
  }, [signedIn]);

  const validateInputs = () => {
    const zId = document.getElementById('zId');
    const password = document.getElementById('password');

    let isValid = true;

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Incorrect password.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!zId.value || !/^z\d{7}$/.test(zId.value)) {
      setzIdError(true);
      setzIdErrorMessage('Incorrect zID.');
      isValid = false;
    } else {
      setzIdError(false);
      setzIdErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if ( zIdError || passwordError ) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const response = await fetch('https://fe82-129-94-8-30.ngrok-free.app/zIdLogin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        zId: data.get("zId"),
        password: data.get("password")
      })
    });
    const {accessToken, refreshToken, newUser} = await response.json();

    if(newUser) {
      navigate('/signup/attendee', { state: { zId: data.get("zId")} });
    } else {
      localStorage.setItem(`present-refresh`, refreshToken);
      localStorage.setItem(`present-access`, accessToken);

      navigate("/events");
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
      <><CssBaseline enableColorScheme /><SignUpContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar
            alt="Profile Image"
            src={ProfileImage}
            sx={{ width: 150, height: 150 }} />
        </Box>
        <Typography
          component="h1"
          variant="h4"
          align={'center'}
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2rem)' }}
        >
          GREETINGS ATTENDEE
        </Typography>
        <Typography
          component="h1"
          variant="h4"
          align={'center'}
          sx={{ width: '100%', fontSize: 'clamp(0.7rem, 2.7vw, 0.7rem)' }}
        >
          If you're managing a society, you're in the wrong place :(
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControl>
            <FormLabel
              htmlFor="zId"
              sx={{ display: 'flex', alignSelf: 'flex-start' }}
            >Your zId<Typography sx={{ ml: 0.5, color: "secondary.main"}}>*</Typography></FormLabel>
            <Input
              autoComplete='zId'
              zId='zId'
              required
              fullWidth
              name="zId"
              placeholder="z1234567"
              type="zId"
              error={zIdError}
              helperText={zIdErrorMessage}
              id="zId"
              color={zIdError ? 'red' : 'secondary'}
              sx={{"&:before": { borderColor: "primary.main" }}} />
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="password"
              sx={{ display: 'flex', alignSelf: 'flex-start' }}
            >Your Password<Typography sx={{ ml: 0.5, color: "secondary.main"}}>*</Typography></FormLabel>
            <Input
              autoComplete='password'
              password='password'
              required
              fullWidth
              name="password"
              placeholder="**********"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              error={passwordError}
              helperText={passwordErrorMessage}
              id="password"
              color={passwordError ? 'red' : 'secondary'}
              sx={{"&:before": { borderColor: "primary.main" }}} />
          </FormControl>
          <Box pb='15%'/>
          <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              onClick={validateInputs}
              color="secondary"
            >
              LOG IN
            </Button>
          </Box>
        </Box>
      </Card>
    </SignUpContainer></>
  );
}
