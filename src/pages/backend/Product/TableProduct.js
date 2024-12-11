import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { getInitialData } from '../../../redux/actions/products';
import UpdateProduct from './UpdateProduct';
import DetailProduct from './DetailProduct'
import { Box } from "@mui/material";
import { NumericFormat } from 'react-number-format';
import Loading from '../../../components/Loading/loading';

const useCustomizedDataGrid = () => {
  const data = useSelector(state => state.dataProduct.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInitialData())

  }, [dispatch])

  const listProductCategory = useSelector(state => state.dataProductCategory.data);

  let columns = [
    {
      field: 'product_ID',
      headerName: '',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      minWidth: 5,
      maxWidth: 100,
    },
    {
      field: 'product_Image',
      headerName: 'Image',
      headerAlign: 'center',
      width: 200,
      renderCell: (params) => (
        < div style={{
          padding: '2%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,  // Đặt chiều cao cố định cho khung chứa
          width: 200,   // Đặt chiều rộng cố định cho khung chứa
          borderRadius: '8px', // Thêm bo góc cho đẹp mắt (tùy chọn)
          overflow: 'hidden', // Giúp hình ảnh không tràn ra ngoài khung
          backgroundColor: '#f0f0f0', // Màu nền để hình ảnh không bị lộ khoảng trống khi chưa tải
        }
        }>
          <img
            src={`${process.env.REACT_APP_BASE_URL}/${params.row.product_Image}?t=${Date.now()}`}
            alt="Product"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            onError={(e) => {
              e.target.onerror = null; // Ngăn vòng lặp vô tận
              e.target.src = '/path/to/placeholder.png';
            }}
          />
        </div >
      ),
    },
    {
      field: 'product_Name',
      headerName: 'Product Name',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'price',
      headerName: 'Price',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return (
          <NumericFormat
            value={params.row.price.toFixed(0)}
            displayType={'text'}
            thousandSeparator={true}
          // prefix={'VND'}
          />
        )
      }
    },
    {
      field: 'point',
      headerName: 'Point',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      minWidth: 50,
    },
    {
      field: "isActive",
      headerName: 'Status',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      minWidth: 30,
      renderCell: (params) => {
        return params.value ? "Using" : "Unused";
      }
    },
    {
      field: "features",
      headerName: "Features",
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      minWidth: 300,
      renderCell: (params) => {

        return (
          <>
            <Loading></Loading>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                overflow: "hidden", // Đảm bảo không bị tràn
              }}
            >
              <UpdateProduct
                product={params.row}
                buttonLabel={params.row.isActive ? " Lock " : "Unlock"}
                isActive={params.row.isActive}

              />
              <DetailProduct
                key={params.row.id}
                product={params.row}
              />
            </Box>
          </>
        )
      }
    }
  ]



  return (
    <DataGrid

      autoHeight
      //checkboxSelection
      rows={data}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      getRowHeight={() => 100}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
  );
}




export default useCustomizedDataGrid