import React, { useState } from 'react';
import { Grid, Box, Drawer, List, ListItem, ListItemText, IconButton, Avatar, Typography } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginPage from '../../components/LoginPage/LoginPage';
import Companies from '../../components/Companies/Companies';

// Define Sidebar Items in JSON Format
const sidebarItems = [
    { name: 'Dashboard', path: '/dashboard', component: <Companies/> },
    { name: 'Profile', path: '/profile', component: <LoginPage/> },
    { name: 'Settings', path: '/settings', component: <div>Settings Page</div> },
];

const Dashboard = () => {
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarToggle = () => setOpenSidebar(!openSidebar);

    return (
        <Grid container spacing={0} style={{ height: '100vh', margin: 0 }}>
            {/* Sidebar */}
            <Grid item xs={2} sx={{ position: 'relative' }}>
                <Drawer
                    open={openSidebar}
                    onClose={handleSidebarToggle}
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                            backgroundColor: '#333',
                            color: '#fff',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                >
                    <List>
                        {sidebarItems.map((item, index) => (
                            <ListItem button key={index}>
                                <Link to={item.path} style={{ textDecoration: 'none', color: 'white' }}>
                                    <ListItemText primary={item.name} />
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px',
                        backgroundColor: '#3f51b5',
                        color: 'white',
                        transition: 'margin-left 0.3s',  
                        marginLeft: openSidebar ? '240px' : '0', 
                    }}
                >
                    {/* Sidebar Toggle */}
                    <IconButton color="inherit" onClick={handleSidebarToggle}>
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6">Dashboard</Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ marginRight: 1, backgroundColor: '#1bbd7e' }}>
                            <AccountCircleIcon />
                        </Avatar>
                        <Typography>Profile</Typography>
                    </Box>
                </Box>

                {/* Dynamic Content Rendering */}
                <Box sx={{ flexGrow: 1, padding: 2, transition: 'margin-left 0.3s' }} ml={openSidebar && 30}>
                    <Routes>
                        {sidebarItems.map((item, index) => (
                            <Route key={index} path={item.path} element={item.component} />
                        ))}
                    </Routes>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
