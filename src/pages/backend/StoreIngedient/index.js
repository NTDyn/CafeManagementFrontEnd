import * as React from 'react';

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Header from '../../../components/Header/Header';
import SideMenu from '../../../components/Menu/SideMenu';
import MainGrid from './mainGrid';

export default function Dashboard() {
    return (
        <>
            <CssBaseline enableColorScheme />

            <Box sx={{ display: 'flex' }}>

                <SideMenu />
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : alpha(theme.palette.background.default, 1),
                        overflow: 'auto',
                    })}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <Header
                            pageName="Store Ingedient"
                        />
                        <MainGrid />
                    </Stack>
                </Box>
            </Box>
        </>
    );
}