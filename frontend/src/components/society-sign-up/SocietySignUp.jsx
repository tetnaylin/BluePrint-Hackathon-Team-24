import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ProfileImage from '../../assets/logo.png';
import { Avatar, Typography } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

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

export default function SocietySignUp() {
  
  return (
      <><CssBaseline enableColorScheme /><SignUpContainer direction="column" justifyContent="space-between">
      <GoogleOAuthProvider clientId="1081011989496-frvb0jond17e3s5qtr9inueked70b4re.apps.googleusercontent.com">
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
            GREETINGS SOCIETY
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            align={'center'}
            sx={{ width: '100%', fontSize: 'clamp(0.7rem, 2.7vw, 0.7rem)' }}
          >
            If you're an attendee, you're in the wrong place :(
          </Typography>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormLabel
              htmlFor="zId"
              sx={{ display: 'flex', alignSelf: 'flex-start' }}
            >Please Log In<Typography sx={{ ml: 0.5, color: "secondary.main"}}>*</Typography></FormLabel>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const {accessToken, refreshToken} = await fetch('https://a627-193-119-101-191.ngrok-free.app/oauth', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({OAuthToken: credentialResponse.credential}),
                })
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </Box>
        </Card>
      </GoogleOAuthProvider>
    </SignUpContainer></>
  );
}
