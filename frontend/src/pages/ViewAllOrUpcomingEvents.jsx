import React from "react";
import '../App.css';
import EventsTabs from "../components/events-tabs/EventsTabs"
import TopMenu from "../components/top-menu/TopMenu";
import { Typography } from "@mui/material";
import ActionAreaCard from "../components/event-card/EventCard";

function ViewAllOrUpcomingEvents() {
  document.body.className="background";
  return (
    <div className="background">
      <TopMenu/>
      <EventsTabs/>
      <Typography
        component="h1"
        variant="h4"
        sx={{ 
          width: '100%', 
          fontSize: 'clamp(2rem, 10vw, 2rem)', 
          pt: '5%', 
          textAlign: 'center',
          color: 'yellow'
        }}
      >
        UPCOMING EVENTS
      </Typography>
      <ActionAreaCard/>
      <ActionAreaCard/>
      
    </div>
  );
}
  
  export default ViewAllOrUpcomingEvents;