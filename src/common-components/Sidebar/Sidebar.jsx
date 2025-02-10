// src/components/Sidebar.js
import React from 'react';
import { Divider, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { routerData } from '../../routes';

function Sidebar({ openSidebar, handleSidebarToggle }) {

    const location = useLocation()

    const hideList = ['*', '/login']
    var sidebarItems = routerData.filter((data)=> !hideList.includes(data.path));

    if(location.pathname == '/dashboard') {
        sidebarItems = sidebarItems.filter((data)=>data.path=='/dashboard')
    }

return(
    <Drawer
        open={openSidebar}
        onClose={handleSidebarToggle}
        sx={{
            width: 216,
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
        <List sx={{pt: 8, height: '70vh',overflow: 'hidden'}}>
            {sidebarItems.map((item, index) => (
                item.name && 
                <>
                <ListItem sx={{ml:3, mr:3}} button key={index}>
                    <Link to={item.path} style={{ textDecoration: 'none', color: 'white' }}>
                        <ListItemText primary={item.name} />
                    </Link>
                </ListItem>
                {item.divider && 
                    <Divider sx={{backgroundColor:'gray'}}/>
                }
                </>
                
               
            ))}
        </List>
        <Divider sx={{backgroundColor:'gray'}}/>
        <List sx={{ml: 3, mt: 3}}>
            <ListItem button>
                Setting
            </ListItem>
            <ListItem button>
                Logout
            </ListItem>
        </List>
    </Drawer>
  );
    
}
    
    

export default Sidebar;
