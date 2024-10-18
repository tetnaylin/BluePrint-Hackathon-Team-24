import React from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      aria-current={props.selected && 'page'}
      {...props}
      sx={{
        marginRight: 2,
        marginLeft: 2
      }}
    />
  );
}

LinkTab.propTypes = {
  selected: PropTypes.bool,
};

export default function NavTabs( { isSociety } ) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%', marginTop: '15%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
        indicatorColor="secondary"
        color="secondary"
        sx={{
          '& .MuiTab-root.Mui-selected': {
            color: (theme) => theme.palette.secondary.main,
          },
          borderBottom: '1px solid gray',
          
        }}
      >
        <LinkTab 
          label={isSociety ? "Upcoming events" : "My Societies"}
         href="/event" 
         indicatorColor="secondary" />
        <LinkTab 
        label={isSociety ? "All events" : "All Societies"} 
        />
      </Tabs>
    </Box>
    
  );
}