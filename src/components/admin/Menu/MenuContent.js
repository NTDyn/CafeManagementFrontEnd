import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import StoreIcon from '@mui/icons-material/Store';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../../../css/backend/menu/index.css'


const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  const location = useLocation();
  const [openInventory, setOpenInventory] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [openOrders, setOpenOrders] = React.useState(false);

  const toggleOrders = () => setOpenOrders(!openOrders);
  const toggleInventory = () => setOpenInventory(!openInventory);
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };



  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/home" selected={location.pathname === '/'}>
            <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItemButton onClick={toggleInventory}>
          <ListItemIcon><InventoryIcon /></ListItemIcon>
          <ListItemText primary="Inventory" />
          {openInventory ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openInventory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {[
              { text: 'Warehouse', link: 'admin/warehouse' },
              { text: 'Ingredients', link: 'admin/ingredient' },
              { text: 'Stored Ingredients', link: 'admin/store-ingredient' },
              { text: 'Spoiled Ingredients', link: 'admin/spoiled-ingredient' },
              { text: 'Ingredient Category', link: 'admin/ingredientCategory' },
            ].map((item) => (
              <ListItemButton
                key={item.text}
                component={Link}
                to={`/${item.link}`}
                sx={{
                  pl: 4,
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
                selected={location.pathname.includes(item.link)}
              >
                <ListItemIcon><NavigateNextRoundedIcon ></NavigateNextRoundedIcon></ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '14px' }} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        <ListItemButton onClick={toggleOrders}>
          <ListItemIcon><LocalDiningIcon /></ListItemIcon>
          <ListItemText primary="Orders & Menu" />
          {openOrders ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openOrders} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {[
              { text: 'Menu', link: 'admin/menu' },
              { text: 'Receipt', link: 'admin/receipt' },
              { text: 'Batch Recipe', link: 'admin/batch-recipe' },
              { text: 'Products', link: 'admin/product' },
              { text: 'Product Categories', link: 'admin/productCategory' },
            ].map((item) => (
              <ListItemButton
                key={item.text}
                component={Link}
                to={`/${item.link}`}
                sx={{ pl: 4 }}
                selected={location.pathname.includes(item.link)}
              >
                <ListItemIcon><NavigateNextRoundedIcon ></NavigateNextRoundedIcon></ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '14px' }} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/customer" selected={location.pathname.includes('admin/customer')}>
            <ListItemIcon><PeopleRoundedIcon /></ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/suppliers" selected={location.pathname.includes('admin/suppliers')}>
            <ListItemIcon><StoreIcon /></ListItemIcon>
            <ListItemText primary="Suppliers" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/staff" selected={location.pathname.includes('admin/staff')}>
            <ListItemIcon><ManageAccountsIcon /></ListItemIcon>
            <ListItemText primary="Staff" />
          </ListItemButton>
        </ListItem>

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