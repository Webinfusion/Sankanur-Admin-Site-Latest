// src/components/Header.js
import React from 'react';
import { Box, IconButton, Typography, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = ({ openSidebar, handleSidebarToggle }) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#333',
            color: 'white',
            transition: openSidebar ? 'margin-left 0.3s': '',
            marginLeft: openSidebar ? '240px' : '0',
        }}
    >
        {/* Sidebar Toggle */}
        <IconButton color="inherit" onClick={handleSidebarToggle}>
            <MenuIcon />
        </IconButton>

        <Typography variant="h5">Sankanur Admin Portal</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ marginRight: 1, backgroundColor: '#1bbd7e' }}>
                <AccountCircleIcon />
            </Avatar>
            <Typography>Profile</Typography>
        </Box>
    </Box>
);

export default Header;
