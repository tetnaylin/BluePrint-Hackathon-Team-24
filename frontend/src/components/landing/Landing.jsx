import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ProfileImage from '../../assets/logo.png';
import { Avatar, Button, Typography } from '@mui/material';

export default function Landing() {
  
  return (
      <><CssBaseline enableColorScheme />
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar
            alt="Profile Image"
            src={ProfileImage}
            sx={{ width: 300, height: 300 }} />
        </Box>
        <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 20vw, 5rem)', fontFamily:'cursive' }}
          >
            PRESENT
          </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center', pt: '15%' }}>
          <Button
            // type="submit"
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
            // type="cancel"
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
