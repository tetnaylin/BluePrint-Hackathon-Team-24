import React from "react";
import '../App.css';
import EventsTabs from "../components/events-tabs/EventsTabs"
import TopMenu from "../components/top-menu/TopMenu";
import { Typography } from "@mui/material";
import ActionAreaCard from "../components/event-card/EventCard";

function ViewCurrentEvents( { signed_in } ) {

    document.body.className="background";
  
    return (
    <div className="background">
      <TopMenu props={{ isSociety: true }}/>

      <Typography
        component="h1"
        variant="h4"
        sx={{ 
          width: '100%', 
          fontSize: 'clamp(2rem, 10vw, 2rem)', 
          pt: '5%', 
          textAlign: 'center',
          color: 'secondary.main',
          fontStyle: 'italic',
          mt: 3
        }}
      >
      Currently Ongoing Events
      </Typography>
      {signed_in ? <EventsTabs props={{ isSociety: false}}/> : <></>}
      <ActionAreaCard props={{ isSociety: false }}/>
      <ActionAreaCard/>
      
    </div>
  );
}
  
  export default ViewCurrentEvents;