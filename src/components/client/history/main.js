import React, { useEffect, useState } from 'react'
import './main.css'
import statusList from './statusList.js'
import CardHistory from './cardHistory.js'
import { getInitialData as getAllReceipt } from '../../../redux/actions/receipt/index.js'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { TextField, FormControl, InputLabel, Select, MenuItem, Box, Typography, Grid2, Button } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Grid } from '@mui/joy'

function Main() {
    const receiptList = useSelector(state => state.dataReceipt.data)
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [selectedStartDate, setSelectedStartDate] = useState(null); // Để lưu ngày bắt đầu
    const [selectedEndDate, setSelectedEndDate] = useState(null); // Để lưu ngày kết thúc

    const dispatch = useDispatch();

    useEffect(() => {
        const dataUser = localStorage.getItem("@userLogin");
        if (!dataUser) {
            Swal.fire("Please login to see purchase history ", "", "warning");
            return;
        }
        const user = JSON.parse(dataUser);
        const data = {
            customer_ID: user.customer_Id
        }

        dispatch(getAllReceipt(data));

    }, [])

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };


    const handleStartDateChange = (newValue) => {
        setSelectedStartDate(newValue);
    };

    const handleEndDateChange = (newValue) => {
        setSelectedEndDate(newValue);
    };
    const filteredReceipts = receiptList.filter(item => {
        const receiptDate = dayjs(item.createdDate);

        // Nếu ngày không hợp lệ thì bỏ qua đơn này
        if (!receiptDate.isValid()) return false;

        const isStatusMatched =
            selectedStatus === 'all' || item.status === parseInt(selectedStatus);

        const isStartDateMatched = selectedStartDate
            ? receiptDate.isAfter(dayjs(selectedStartDate).startOf('day').subtract(1, 'second'))
            : true;

        const isEndDateMatched = selectedEndDate
            ? receiptDate.isBefore(dayjs(selectedEndDate).endOf('day').add(1, 'second'))
            : true;

        return isStatusMatched && isStartDateMatched && isEndDateMatched;
    });
    return (
        <main style={{ marginTop: '6rem' }}>
            <div className="p-5  text-white hero-history">
                <Grid container spacing={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {/* Dropdown lọc trạng thái */}
                    <Grid xs={2} >
                        <FormControl fullWidth>
                            <InputLabel id="status-filter-label">Filter by Status</InputLabel>
                            <Select
                                labelId="status-filter-label"
                                value={selectedStatus}
                                label="Filter by Status"
                                onChange={handleStatusChange}
                            >
                                <MenuItem value="all">All</MenuItem>
                                {statusList?.map(status => (
                                    <MenuItem key={status.Status_ID} value={status.Status_ID}>
                                        {status.Status_Name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Lọc theo thời gian */}
                    <Grid xs={6} sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Grid container spacing={2}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Grid container spacing={2}>
                                    <Grid xs={6}>
                                        <DatePicker
                                            label="Start Date"
                                            value={selectedStartDate}
                                            onChange={handleStartDateChange}
                                            slotProps={{ textField: { fullWidth: true } }}
                                        />
                                    </Grid>
                                    <Grid xs={6}>
                                        <DatePicker
                                            label="End Date"
                                            value={selectedEndDate}
                                            onChange={handleEndDateChange}
                                            slotProps={{ textField: { fullWidth: true } }}
                                        />
                                    </Grid>
                                </Grid>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Grid xs={2}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                setSelectedStatus('all');
                                setSelectedStartDate(null);
                                setSelectedEndDate(null);
                            }}
                        >
                            Clear Filters
                        </Button>
                    </Grid>
                </Grid>
                {/* CARD START!! */}
                <div className="container-fluid">
                    <div className="row mt-5">
                        <div className="col">
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                <CardHistory
                                    receiptData={
                                        Array.isArray(filteredReceipts)
                                            ? filteredReceipts
                                            : []
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* CARD END!! */}
            </div>
        </main >
    )
}

export default Main