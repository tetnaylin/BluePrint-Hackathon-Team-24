import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { Avatar, Typography, Autocomplete, Chip, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import TopMenu from '../components/top-menu/TopMenu';
import Banner from '../assets/banner.png';
import QR from '../assets/qr.png';


const ManageEventContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0),
  },
}));

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    margin: 'auto',
    background: "primary",
    borderWidth: 6,
    borderRadius: 8,
    boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
      [theme.breakpoints.up('sm')]: {
        width: '450px',
      },
      [theme.breakpoints.up('md')]: {
      width: '700px',
    },
    ...theme.applyStyles('dark', {
      boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
  }));

export default function EventPage() {

const temp = () => {
    return;
}



  return (
      <>
      <TopMenu/>
      <CssBaseline enableColorScheme /><ManageEventContainer direction="column" justifyContent="space-between">
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Typography
          variant="h2"
          sx={{ 
            padding:3,
            fontStyle: 'italic',
          }}>
            Event Name
          </Typography>
        </Box>


        <Card variant="outlined">
            <Box
                component="img"
                alt="Event banner"
                src={Banner}
            />
        </Card>

        <Box display="flex" flexDirection="column" justifyContent="center">
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Box
                component="img"
                alt="QR Code"
                src={QR}
                maxWidth="10vw"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            />

            <Button
              type="button"
              variant="contained"
              onClick={temp}
              color="secondary"
            >
                Regenerate QR Code
            </Button>
          </Box>
        </Box>

          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              onClick={temp}
              color="secondary"
            >
              Create
            </Button>
            <Button
              type="cancel"
              variant="contained"
              onClick={temp}
              color="primary"
            >
              Cancel
            </Button>
        </Box>
    </ManageEventContainer></>
  );
}
