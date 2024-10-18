import React from 'react'
import { Typography, Container, Box, Avatar, Stack } from '@mui/material'
import FormsLogo from '../../assets/google-forms-logo.png';
import ProfileImage from '../../assets/logo.png';

const QrCodeScanned = () => {
  return (
    <Container
        sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh' 
        }}>
        <Typography sx={{ textAlign: 'center', marginBottom: 21, color:"secondary.main", fontSize: '3rem' }}>
            Please select your preferred option:
        </Typography>

        <Stack direction="row" spacing={15} justifyContent="center" alignItems="center" >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar alt="Profile Image" src={ProfileImage} sx={{ width: 150, height: 150 }} />
                <Typography sx={{ textAlign: 'center', marginTop: 4, color:"primary.main", fontSize: '1.5rem' }}>
                    Log in
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="img" sx={{ height: 150, width: 109 }} alt="Google forms logo" src={FormsLogo}/>
                <Typography sx={{ textAlign: 'center', marginTop: 4, color:"primary.main", fontSize: '1.5rem' }}>
                    Google Forms
                </Typography>
            </Box>
        </Stack>
    </Container>
  )
}

export default QrCodeScanned
