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
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../../css/components/Menu/MenuContent.css'

const mainListItems = [
    {
        text: 'Home',
        icon: <HomeRoundedIcon />,
        link: ''
    },
    {
        text: 'Customers',
        icon: <PeopleRoundedIcon />,
        link: 'admin/customer'
    },
    {
        text: 'Warehouse',
        icon: <InventoryIcon />,
        link: 'admin/warehouse'
    },
    {
        text: 'Suppliers',
        icon: <AssignmentRoundedIcon />,
        link: 'admin/suppliers'
    },
    {
        text: 'Request Import',
        icon: <AssignmentRoundedIcon />,
        link: 'admin/import'
    },
    {
        text: 'History Import',
        icon: <AssignmentRoundedIcon />,
        link: 'admin/historyimport'
    },
    {
        text: 'Products',
        icon: <AssignmentRoundedIcon />,
        link: 'admin/product'
    },
    {
        text: 'Batch Recipe',
        icon: <AssignmentRoundedIcon />,
        link: 'admin/batch-recipe'
    },
    {
        text: 'Ingredient Category',
        icon: <AssignmentRoundedIcon />,
        link: 'admin/ingredientCategory'
    },

    {
        text: 'Ingredients',
        icon: <AssignmentRoundedIcon />,
        link: 'admin/ingredient'
    },
    {
        text: 'Spoiled Ingredient',
        icon: <AssignmentRoundedIcon />,
        link: 'admin/spoiled-ingredient'
    },

    {
        text: 'Product Categories',
        icon: <AssignmentRoundedIcon />,
        link: 'admin/productCategory'
    },
    {
        text: 'Stored Ingredient',
        icon: <AssignmentRoundedIcon />,
        link: 'admin/store-ingredient'
    },
    {
        text: 'Menu ',
        icon: <AssignmentRoundedIcon />,
        link: 'admin/menu'
    },
];

const secondaryListItems = [
    { text: 'Settings', icon: <SettingsRoundedIcon /> },
    { text: 'About', icon: <InfoRoundedIcon /> },
    { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
    const location = useLocation();
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };
    React.useEffect(() => {
        const currentIndex = mainListItems.findIndex(item => location.pathname.includes(item.link));
        setSelectedIndex(currentIndex);
    }, [location.pathname]);

    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block', paddingTop: '2%', paddingBottom: '2%' }}>
                        <ListItemButton
                            component={Link}
                            to={"/" + item.link}
                            selected={location.pathname === "/" + item.link}
                            onClick={() => handleListItemClick(index)}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(25, 118, 210, 0.1)', // Màu khi chọn
                                    color: '#0080ff',
                                    '&:hover': {
                                        backgroundColor: 'rgba(25, 118, 210, 0.15)', // Màu khi hover
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)', // Màu khi hover nếu không được chọn
                                },

                            }}
                        >

                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} className='CategoryName' />

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
        </Stack >
    );
}