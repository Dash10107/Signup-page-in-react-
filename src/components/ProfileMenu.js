import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Badge, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';

export default function NotificationMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {/* <MenuItem component={Link} to="/profile" onClick={handleClose}>
          Profile
        </MenuItem> */}
        <MenuItem component={Link} to="/login" onClick={handleClose}>
        <Typography> Logout</Typography> 
        </MenuItem>
      </Menu>
    </div>
  );
}
