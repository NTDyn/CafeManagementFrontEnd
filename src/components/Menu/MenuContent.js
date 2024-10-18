import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { Link } from 'react-router-dom';
import '../../css/components/Menu/MenuContent.css'

const mainListItems = [
    { text: 'Home', icon: <HomeRoundedIcon />, link: '/home' },
    { text: 'Analytics', icon: <AnalyticsRoundedIcon />, link: '/analytic' },
    { text: 'Customers', icon: <PeopleRoundedIcon />, link: '/customer' },
    { text: 'Suppliers', icon: <AssignmentRoundedIcon />, link: '/suppiers' },
    { text: 'Warehouse', icon: <AssignmentRoundedIcon />, link: '/warehouse' },
    { text: 'Ingredients', icon: <AssignmentRoundedIcon />, link: '/ingredient' },
    { text: 'Products', icon: <AssignmentRoundedIcon />, link: '/product' },
];

const secondaryListItems = [
    { text: 'Settings', icon: <SettingsRoundedIcon /> },
    { text: 'About', icon: <InfoRoundedIcon /> },
    { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton selected={index === 0}>
                            <Link to={item.link} className='CategoryLink' >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} className='CategoryName' />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}