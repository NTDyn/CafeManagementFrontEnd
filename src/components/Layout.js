import React from 'react';
import SideMenu from './admin/Menu/SideMenu'
import { Stack } from '@mui/material';
const Layout = ({ children }) => {
  return (
    <Stack direction="row" sx={{ height: '100vh', overflow: 'hidden' }}>
      <SideMenu />
      <main style={{ flexGrow: 1, overflowY: 'auto' }}>
        {children}
      </main>
    </Stack>
  );
};

export default Layout;
