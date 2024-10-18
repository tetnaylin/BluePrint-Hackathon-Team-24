import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ProfileImage from '../../assets/logo.png';
import { Avatar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from "../animated-background/AnimatedBackground"

export default function Landing() {
  const navigate = useNavigate();
  
  return (
      <><CssBaseline enableColorScheme />
      <AnimatedBackground/>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar
            alt="Profile Image"
            src={ProfileImage}
            sx={{ width: 250, height: 250 }} />
        </Box>
        <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(1.7rem, 17vw, 4.5rem)', fontFamily:'cursive', zIndex:'3', align: 'center' }}
          >
            PRESENT
          </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 7, justifyContent: 'center', pt: '15%' }}>
          <Button
            // type="submit"
            onClick={() => navigate("/login/attendee")}
            disableRipple
            variant="outlined"
            color="secondary"
            size="large"
            sx={{
              '&:hover': {
                backgroundColor: '#e8ce31',
                color: 'black',
                fontWeight: 'bold',
              },
            }}
          >
            ATTENDEE
          </Button>
          <Button
            onClick={() => navigate("/login/society")}
            disableRipple
            variant="outlined"
            color="secondary"
            size="large"
            sx={{
              '&:hover': {
                backgroundColor: '#e8ce31',
                color: 'black',
                fontWeight: 'bold',
              },
            }}
          >
            SOCIETY
          </Button>
        </Box>
      </>
  );
}
