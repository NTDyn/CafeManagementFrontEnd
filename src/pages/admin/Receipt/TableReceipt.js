import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import '../../../css/backend/product/index.css';
import { Box } from "@mui/material";
import DetailReceipt from "./DetailReceipt";
import statusList from './statusList.js'
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../../../redux/actions/menu/index.js";

const TableReceipt = ({ customerList, listReceipt, productData }) => {

    const [refreshKey, setRefreshKey] = useState(0);
    const [receipt, setReceipt] = useState([]);
    const dispatch = useDispatch();

    const handleStateChange = () => {
        setRefreshKey((prev) => prev + 1); // Tăng trigger để reload
    };
    const getStatusName = (id) => {
        const found = statusList.find(status => status.Status_ID === id);
        return found ? found.Status_Name : "Haven't update";
    }

    const getCustomerDetail = (id) => {
        const cus = customerList?.find(customer => customer.customer_Id === id);
        return cus;
    }

    const formatCurrency = (number) => {
        return number.toLocaleString('vi-VN');
    }

    const formatDateTime = (isoDateString) => {
        const date = new Date(isoDateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    };


    const columns = [
        {
            field: "receipt_ID",
            headerName: "Receipt Num",
            align: "center",
            headerAlign: 'center',
            flex: 1,
            minWidth: 10
        },
        {
            field: "customer_ID",
            headerName: "Name",
            headerAlign: 'center',
            align: "center", flex: 1,
            maxWidth: 450,
            renderCell: (params) => {
                const item = params.row;
                return getCustomerDetail(item.customer_ID)?.customer_Name
            },
        },
        {
            field: "totalPrice", headerName: "Total",
            headerAlign: 'center',
            align: "center", flex: 1,
            maxWidth: 100,
            renderCell: (params) => {
                const item = params.row;
                return formatCurrency(item.totalPrice.toLocaleString())
            },
        },
        {
            field: "createdDate", headerName: "Date",
            headerAlign: 'center',
            align: "center", flex: 1,
            maxWidth: 200,
            renderCell: (params) => {
                const item = params.row;
                return formatDateTime(item.createdDate)
            },
        },
        {
            field: "status",
            headerName: "Status",
            headerAlign: 'center',
            align: "center",
            flex: 1,
            maxWidth: 200,
            renderCell: (params) => {
                const item = params.row;
                return getStatusName(item.status)
            },
        },
        {
            field: "features",
            headerName: "Features",
            headerAlign: 'center',
            align: "center",
            flex: 1,
            minWidth: 300,
            renderCell: (params) => {
                const receipt = params.row;
                return (
                    <Box sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                    }}>
                        <DetailReceipt
                            onUpdate={handleStateChange}
                            receipt={receipt}
                            productData={productData}
                        />
                    </Box>
                );
            },
        },
    ];

    return (
        <DataGrid
            autoHeight
            rows={listReceipt || []}
            columns={columns}
            getRowId={(row) => row.receipt_ID}
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            getRowHeight={() => 100}
            initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
            pageSizeOptions={[10, 20, 50]}
            density="compact"
        />
    );
};

export default TableReceipt;
