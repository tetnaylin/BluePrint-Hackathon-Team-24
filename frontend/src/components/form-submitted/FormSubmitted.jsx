import React from 'react'
import { Button, Typography, Container } from '@mui/material'

const FormSubmitted = () => {
  return (
      <Container>
        <Typography sx={{ textAlign: 'center', fontWeight : "bold", fontSize : "2rem", color:"secondary.main" }}>
          Attendance form submitted!
        </Typography>
        <Typography sx={{ textAlign: 'center', color:"secondary.main" }}>
          Enjoy your event!
        </Typography>
      </Container>
  )
}

export default FormSubmitted
