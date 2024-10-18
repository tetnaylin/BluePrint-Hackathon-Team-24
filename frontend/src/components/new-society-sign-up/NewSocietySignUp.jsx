import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import ProfileImage from '../../assets/logo.png';
import { Avatar, Typography } from '@mui/material';

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
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');

  const validateInputs = () => {
    const name = document.getElementById('name');

    let isValid = true;

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    if (nameError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
    });
  };

  return (
      <>
      <CssBaseline enableColorScheme /><SignUpContainer direction="column" justifyContent="space-between">
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
          HI NEW SOCIETY
        </Typography>
        <Typography
          component="h1"
          variant="h4"
          align={'center'}
          sx={{ width: '100%', fontSize: 'clamp(0.7rem, 2.7vw, 0.7rem)' }}
        >
          It seems like this is the first time you've signed in with us :D
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControl>
            <FormLabel
              htmlFor="name"
              sx={{ display: 'flex', alignSelf: 'flex-start', color: "primary.main"}}
            >Please Tell Us Your Society's Name <Typography sx={{ ml: 0.5, color: "secondary.main"}}>*</Typography></FormLabel>
            <Input
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name"
              placeholder="Example Society"
              error={nameError}
              helperText={nameErrorMessage}
              color={nameError ? 'red' : 'secondary'}
              sx={{"&:before": { borderColor: "primary.main" }}} />
          </FormControl>
        </Box>
      </Card>
    </SignUpContainer></>
  );
}
