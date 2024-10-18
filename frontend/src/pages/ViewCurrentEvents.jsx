import React, { useEffect, useState } from "react";
import '../App.css';
import EventsTabs from "../components/events-tabs/EventsTabs"
import TopMenu from "../components/top-menu/TopMenu";
import { Typography } from "@mui/material";
import ActionAreaCard from "../components/event-card/EventCard";
import checkLoggedIn from "../util/verifyUser";

function ViewCurrentEvents() {
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        const loginCheck =async () => {
            const signed_in = await checkLoggedIn();
            setSignedIn(signed_in);
        };
        loginCheck();
    }, []);
    

    document.body.className="background";
  
    return (
    <div className="background">
      {signedIn ? <TopMenu props={{ isSociety: true }}/>: <></>}

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
      {signedIn ? <EventsTabs props={{ isSociety: false, signedOut: !signedIn }}/> : <></>}
      <ActionAreaCard props={{ isSociety: false }}/>
      <ActionAreaCard/>
      
    </div>
  );
}
  
  export default ViewCurrentEvents;