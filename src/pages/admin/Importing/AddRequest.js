import React, { useState, useEffect } from "react"
import Button from '@mui/joy/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from "react-redux";
import { getInitialData } from "../../../redux/actions/productCategory";
import { addData as addDataProduct, getInitialData as dataProduct } from "../../../redux/actions/products";
import { getInitialData as dataIngredient } from "../../../redux/actions/ingredient"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Modal } from "@mui/material";
import Swal from 'sweetalert2'
import Grid from '@mui/material/Grid2';
import withReactContent from 'sweetalert2-react-content';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import { useTheme } from '@mui/material/styles';
import { color, maxWidth, styled, width } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import '../../../css/backend/product/index.css?v=19'
import { ModalDialog } from "@mui/joy";

export default function AddRequest() {

    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(null);
    const top100Films = [
        {
            'label': 'hsdkfds',
            'id': 1
        },
        {
            'label': 'hsdkfdsff',
            'id': 2
        },
    ]

    return (
        <>
            <Stack
                direction="row"
                justifyContent="end"
            >
                <Button

                    variant="outlined"
                    color="neutral"
                    startIcon={<Add />}
                    onClick={() => setOpen(true)}
                >
                    New Purchase Order
                </Button>
            </Stack>
            <Modal
                open={open}
                onClose={() => setOpen(false)}

            >
                <ModalDialog sx={{ width: '90%', background: '#f0f8ff', display: 'flex', maxHeight: '95vh', overflow: 'auto' }}>
                    <AppBar sx={{ position: 'relative', maxHeight: 40, }}>
                        <Toolbar sx={{ display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start' }}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={() => setOpen(false)}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1, alignContent: 'center' }} variant="h6" component="div">
                                New purchase order
                            </Typography>

                        </Toolbar>
                    </AppBar>
                    <Box sx={{ width: '100%' }}>
                        <Grid container sx={{ marginBottom: "2%" }}>
                            <Grid size={6}>
                                <Typography>warehouse</Typography>
                                <Autocomplete
                                    disablePortal
                                    options={top100Films}
                                    size="small"
                                    sx={{ width: '70%' }}
                                    renderInput={(params) => <TextField {...params} placeholder="---Select warehouse---"></TextField>}
                                />
                            </Grid>
                            <Grid size={6}>
                                <Typography>Supplier</Typography>
                                <Autocomplete
                                    disablePortal
                                    options={top100Films}
                                    size="small"
                                    sx={{ width: '70%' }}
                                    renderInput={(params) => <TextField {...params} placeholder="---Select supplier---"></TextField>}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ marginBottom: '2%' }}>
                            <Grid size={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Typography>Delivery Date</Typography>
                                    <DatePicker sx={{ marginRight: '1%', width: '30%' }} />
                                    <TimePicker
                                        label="Time"
                                        value={time}
                                        onChange={(newValue) => setTime(newValue)}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid size={6}>
                                <Grid container>
                                    <Grid size={6} >
                                        <Stack >
                                            <Typography> Name:</Typography>
                                            <TextField
                                                size="small"
                                            ></TextField>
                                        </Stack>
                                        <Stack >
                                            <Typography>Address:</Typography>
                                            <TextField
                                                size="small"
                                            ></TextField>
                                        </Stack>
                                    </Grid>
                                    <Grid size={6} >
                                        <Stack >
                                            <Typography>Phone:</Typography>
                                            <TextField
                                                size="small"
                                            ></TextField>
                                        </Stack>
                                        <Stack >
                                            <Typography>Email:</Typography>
                                            <TextField
                                                size="small"
                                            ></TextField>
                                        </Stack>
                                    </Grid>
                                </Grid>

                            </Grid>


                        </Grid>
                        <Grid container spacing={2} sx={{ marginBottom: '2%' }}>
                            <Grid size={6} sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Grid size={5} >
                                    <Typography>Ship cost</Typography>
                                    <TextField
                                        type="number"
                                        size='small'
                                    ></TextField>
                                </Grid>
                                <Grid size={7}>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value="5%" control={<Radio />} label="Tax 5%" />
                                            <FormControlLabel value="10%" control={<Radio />} label="Tax 10%" />
                                            <FormControlLabel value="15%" control={<Radio />} label="Tax 15%" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid container>
                            <DataGrid
                                columns={[{ field: 'ID' }, { field: 'First name' }, { field: 'Last name' }]}
                                rows={[]}

                                sx={{ '--DataGrid-overlayHeight': '300px' }}
                            />
                        </Grid>
                    </Box>

                </ModalDialog >
            </Modal >
        </>
    );

}



const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const StyledInputRoot = styled('div')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
        };
    display: grid;
    grid-template-columns: 1fr 19px;
    grid-template-rows: 1fr 1fr;
    overflow: hidden;
    column-gap: 8px;
    padding: 4px;
  
    &.${numberInputClasses.focused} {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
    }
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

const StyledInputElement = styled('input')(
    ({ theme }) => `
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.5;
    grid-column: 1/2;
    grid-row: 1/3;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: inherit;
    border: none;
    border-radius: inherit;
    padding: 8px 12px;
    outline: 0;
  `,
);

const StyledButton = styled('button')(
    ({ theme }) => `
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    appearance: none;
    padding: 0;
    width: 19px;
    height: 19px;
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    line-height: 1;
    box-sizing: border-box;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 0;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
    type: "button";
    
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      cursor: pointer;
    }
  
    &.${numberInputClasses.incrementButton} {
      grid-column: 2/3;
      grid-row: 1/2;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border: 1px solid;
      border-bottom: 0;
      border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
      color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  
      &:hover {
        cursor: pointer;
        color: #FFF;
        background: ${theme.palette.mode === 'dark' ? blue[600] : blue[500]};
        border-color: ${theme.palette.mode === 'dark' ? blue[400] : blue[600]};
      }
    }
  
    &.${numberInputClasses.decrementButton} {
      grid-column: 2/3;
      grid-row: 2/3;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border: 1px solid;
      border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
      color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    }
  
    &:hover {
      cursor: pointer;
      color: #FFF;
      background: ${theme.palette.mode === 'dark' ? blue[600] : blue[500]};
      border-color: ${theme.palette.mode === 'dark' ? blue[400] : blue[600]};
    }
  
    & .arrow {
      transform: translateY(-1px);
    }
  
    & .arrow {
      transform: translateY(-1px);
    }
  `,
);

const StyledBox = styled('div')(({ theme }) => ({
    height: 300,
    width: '100%',
    '& .MuiDataGrid-cell--editing': {
        backgroundColor: 'rgb(255,215,115, 0.19)',
        color: '#1a3e72',
        '& .MuiInputBase-root': {
            height: '100%',
        },
    },
    '& .Mui-error': {
        backgroundColor: 'rgb(126,10,15, 0.1)',
        color: '#1a3e55',
        ...theme.applyStyles('dark', {
            backgroundColor: 'rgb(126,10,15, 0)',
        }),
    },
}));