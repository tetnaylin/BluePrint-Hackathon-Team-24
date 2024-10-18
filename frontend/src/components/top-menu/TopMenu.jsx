import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import AccountMenu from './AccountMenu';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../../assets/logo.png';

const drawerWidth = 240;

const societyArray = ['Upcoming Events', 'All Events', 'Create New Event'];
const attendeeArray = ['My Events', 'My Societies', 'All Events', 'All Societies'];

export default function TopMenu(props) {

    const navigate = useNavigate();
    
    const currArray = props.isSociety ? societyArray : attendeeArray;
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
  
    const handleDrawerClose = () => {
      setIsClosing(true);
      setMobileOpen(false);
    };
  
    const handleDrawerTransitionEnd = () => {
      setIsClosing(false);
    };
  
    const handleDrawerToggle = () => {
      if (!isClosing) {
        setMobileOpen(!mobileOpen);
      }
    };
  
    const drawer = (
      <div>
        <Toolbar />
        <Divider />
        <List>
          {currArray.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton display="flex" justifyContent="center">
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    );

  return (
    <Box sx={{ display: 'flex'}}>
    <CssBaseline />
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
      elevation={0}
    >
      <Toolbar sx={{bgcolor: "background.default", display: "flex", justifyContent: "space-between"}}>
        <IconButton
          color="primary"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' }, fontSize: 45 }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
        color="primary"
        edge="start"
        onClick={navigate("/")}
        sx={{ margin: "auto"}}
        >
          <Box
          component="img"
          src={ProfileImage}
          sx={{ width: 50, height: 50}}
          />
        </IconButton>


    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
    <AccountMenu/>
      </Toolbar>
    </AppBar>
    </Box>
  );
}