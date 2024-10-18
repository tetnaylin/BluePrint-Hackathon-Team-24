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
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [zIdError, setzIdError] = React.useState(false);
  const [zIdErrorMessage, setzIdErrorMessage] = React.useState('');
  const [yearError, setYearError] = React.useState(false);
  const [yearErrorMessage, setYearErrorMessage] = React.useState('');

  const validateInputs = () => {
    const email = document.getElementById('email');
    const zId = document.getElementById('zId');
    const name = document.getElementById('name');
    const year = document.getElementById('year');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (year.value < 0 || year.value > 20) {
      setYearError(true);
      setYearErrorMessage('Please a valid year of study.');
      isValid = false;
    } else {
      setYearError(false);
      setYearErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    if (nameError || emailError || zIdError || yearError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      zId: data.get('zId'),
      year: data.get('year')
    });
  };

  const attendeezId = "z12345678";

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
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControl>
            <FormLabel
              htmlFor="name"
              sx={{ display: 'flex', alignSelf: 'flex-start', color: "primary.main"}}
            >Full Name <Typography sx={{ ml: 0.5, color: "secondary.main"}}>*</Typography></FormLabel>
            <Input
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name"
              placeholder="Supreme Potato"
              error={nameError}
              helperText={nameErrorMessage}
              color={nameError ? 'red' : 'secondary'}
              sx={{"&:before": { borderColor: "primary.main" }}} />
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="email"
              sx={{ display: 'flex', alignSelf: 'flex-start' }}
            >Email <Typography sx={{ ml: 0.5, color: "secondary.main"}}>*</Typography></FormLabel>
            <Input
              required
              fullWidth
              id="email"
              placeholder="potatoiskool@email.com"
              name="email"
              autoComplete="email"
              error={emailError}
              helperText={emailErrorMessage}
              color={nameError ? 'red' : 'secondary'}
              sx={{"&:before": { borderColor: "primary.main" }}}/>
          </FormControl>
          <FormControl disabled variant="standard">
            <FormLabel
              htmlFor="zId"
              sx={{ display: 'flex', alignSelf: 'flex-start' }}
            >zId</FormLabel>
            <Input
              required
              fullWidth
              name="zId"
              placeholder={attendeezId}
              type="zId"
              id="zId"
              variant="outlined"
              sx={{ display: 'flex', alignSelf: 'flex-start' }} />
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="name"
              sx={{ display: 'flex', alignSelf: 'flex-start' }}
            >Discord</FormLabel>
            <Input
              autoComplete="name"
              name="name"
              fullWidth
              id="name"
              placeholder="itz_potato"
              color={nameError ? 'red' : 'secondary'}
              sx={{"&:before": { borderColor: "primary.main" }}} />
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="year"
              sx={{ display: 'flex', alignSelf: 'flex-start' }}
            >Year of Study</FormLabel>
            <Input
              autoComplete="year"
              name="year"
              fullWidth
              id="year"
              placeholder="1, 2, 3, ..."
              error={yearError}
              helperText={yearErrorMessage}
              color={yearError ? 'red' : 'secondary'}
              sx={{"&:before": { borderColor: "primary.main" }}} />
          </FormControl>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            pb='15%'
          >
            <FormControlLabel
              control={<Checkbox value="arcMember" color="secondary"/>}
              label="Arc Member?"
              sx={{ mr: 0.5, color: "primary.main" }}/><Typography sx={{ color: "secondary.main"}}>*</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              onClick={validateInputs}
              color="secondary"
            >
              Sign up
            </Button>
            <Button
              type="cancel"
              variant="contained"
              onClick={validateInputs}
              color="primary"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Card>
    </SignUpContainer></>
  );
}
