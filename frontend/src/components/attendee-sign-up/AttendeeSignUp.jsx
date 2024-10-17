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
    const [zIdError, setzIdError] = React.useState(false);
    const [zIdErrorMessage, setzIdErrorMessage] = React.useState('');

  const validateInputs = () => {
    const zId = document.getElementById('zId');

    let isValid = true;

    return isValid;
  };

  const handleSubmit = (event) => {
    if ( zIdError ) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      zId: data.get('zId'),
    });
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
          <Box pb='15%'/>
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
