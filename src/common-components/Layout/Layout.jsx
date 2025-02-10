// src/Layout.js
import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';
import { routerData } from '../../routes';

const Layout = ({ children, routerJson }) => {
    const [openSidebar, setOpenSidebar] = useState(true);
    const isLoginPage = useLocation().pathname === '/login';
    const is404Page = !(routerData.filter((data)=> data.name!='*').map((data)=> data.name)).includes(routerJson.name)


    const handleSidebarToggle = () => setOpenSidebar(!openSidebar);

    return (
        <Grid container spacing={0}>
            {/* Sidebar */}
            {!isLoginPage && !is404Page && 
                <Grid item xs={2} sx={{ position: 'relative', transition: 'width 1s' }}>
                    <Sidebar openSidebar={openSidebar} handleSidebarToggle={handleSidebarToggle} />
                </Grid>
            }
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                {!isLoginPage &&  !is404Page &&
                    <Header openSidebar={openSidebar} handleSidebarToggle={handleSidebarToggle} />
                }

                <Box className={isLoginPage || is404Page ? "dashboard-body-login-container" : "dashboard-body-container"} sx={{marginLeft: openSidebar && !isLoginPage && !is404Page ? '240px' : '0', transition: openSidebar ? 'margin-left 0.3s': ''}}>
                    {children}
                </Box>
            </Grid>
        </Grid>
    );
};

export default Layout;
