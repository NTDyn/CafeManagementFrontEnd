import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import '../../../css/backend/product/index.css';
import { getReceiptByStatus } from "../../../redux/actions/supplier";
import { Box } from "@mui/material";
import DetailReceipt from "./DetailReceipt";

const TableReceipt = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [receipt, setReceipt] = useState([]);

    const handleStateChange = () => {
        setRefreshKey((prev) => prev + 1); // Tăng trigger để reload
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getReceiptByStatus(1);
                setReceipt(res.data.data || []);
                console.log(res.data.data);
            } catch (error) {
                console.error("Failed to fetch receipt data:", error);
            }
        };
        fetchData();
    }, [refreshKey]);

    const columns = [
        // { field: "receipt_ID", headerName: "Num. Receipt", align: "center", flex: 1, minWidth: 100 },
        { field: "customer_Name", headerName: "Name", align: "center", flex: 1, maxWidth: 250 },
        { field: "totalPrice", headerName: "Price", align: "center", flex: 1, maxWidth: 100 },
        {
            field: "status",
            headerName: "Status",
            align: "center",
            flex: 1,
            maxWidth: 100,
            renderCell: (params) => {
                const receipt = params.row;
                return receipt.status === 1
                    ? "Pending"
                    : receipt.status === 2
                    ? "Deny"
                    : "Approve";
            },
        },
        {
            field: "features",
            headerName: "Features",
            align: "center",
            flex: 1,
            minWidth: 100,
            renderCell: (params) => {
                const receipt = params.row;
                return (
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                        <DetailReceipt
                            onUpdate={handleStateChange}
                            receiptId={receipt.receipt_ID}
                        />
                    </Box>
                );
            },
        },
    ];

    return (
        <DataGrid
            autoHeight
            rows={receipt || []}
            columns={columns}
            getRowId={(row) => row.receipt_ID}
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
            pageSizeOptions={[10, 20, 50]}
            density="compact"
        />
    );
};

export default TableReceipt;
