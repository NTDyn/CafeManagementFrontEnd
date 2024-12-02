import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { getInitialData } from '../../../redux/actions/products';
import UpdateProduct from './UpdateProduct';
import DetailProduct from './DetailProduct'
import { Box } from "@mui/material";
import { NumericFormat } from 'react-number-format';

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
      headerName: 'ID',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      minWidth: 20,
    },
    {
      field: 'image_URL',
      headerName: 'Image',
      headerAlign: 'center',
      width: 150,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <img
            src={params.row.productImage[0]?.image_URL}
            alt="Product"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            onError={(e) => e.target.src = '/path/to/placeholder.png'} // Thêm placeholder khi lỗi
          />
        </div>
      ),
    },
    {
      field: 'product_Name',
      headerName: 'Product Name',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      minWidth: 100,
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
      minWidth: 100,
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
              product_ID={params.row.id}
              product_Point={params.row.point}
              product_Price={params.row.price}
              product_Name={params.row.product_Name}
              buttonLabel={params.row.isActive ? " Lock " : "Unlock"}
              isActive={params.row.isActive ? false : true}

            />
            <DetailProduct
              key={params.row.id}
              product={params.row}
            />
          </Box>
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