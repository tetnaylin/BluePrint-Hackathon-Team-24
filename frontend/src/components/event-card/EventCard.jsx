import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import SampleEvent from '../../assets/bbq-devsoc-event.png';
import { Box, Button } from "@mui/material";

export default function ActionAreaCard( { isSociety } ) {
  return (
    <Card sx={{ maxWidth: 345, border: 5, borderColor: "gray", marginTop: "5%"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={SampleEvent}
          alt="Devsoc BBQ"
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Software Development Society
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Weekly BBQ (Week -1) 
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: "italic", fontSize: "12px" }}>
            AYO DID ANYONE SAY SECONDS, we will be having a second BBQ this week Friday 12 - 2pm (4th October) at Library Lawn, so show up pls again
          </Typography>
          { isSociety ? <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10%', justifyContent: 'center', pt: '5%' }}>
          <Button
            // type="submit"
            variant="contained"
            color="secondary"
            size="small"
            sx={{
              fontSize: '10px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'fcff38',                
              },
            }}
          >
            Edit Event
          </Button>
          <Button
            // type="cancel"
            variant="contained"
            color="secondary"
            size="small"
            sx={{
              fontSize: '10px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'fcff38',                
              },
            }}
          >
            Regenerate QR Code
          </Button>
        </Box> : <></>}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}