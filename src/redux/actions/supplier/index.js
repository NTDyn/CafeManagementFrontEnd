import axios from "axios";
import { fetchAPI, putAPI, postAPI } from "../../../api";
const   API_URL_BASE_SUPPLIER="https://localhost:7250/api";
export const getAllSuppliers=()=>{
   return  axios.get(API_URL_BASE_SUPPLIER+"/Supplier");
}

export const updateSupplier=(data)=>{
    return axios.put(API_URL_BASE_SUPPLIER+"/Supplier",data);
}
export const addSupplier=(data)=>{
    return axios.post(API_URL_BASE_SUPPLIER+"/Supplier",data);
}
export const getSupllierActive=()=>{
    return axios.get(API_URL_BASE_SUPPLIER+"/Supplier/active");
}
// WareHouse
export const getWareHouseActive=()=>{
    return axios.get(API_URL_BASE_SUPPLIER+"/Warehouse/active");
}

//Ingredient
export const getIngredientActive=()=>{
    return axios.get(API_URL_BASE_SUPPLIER+"/Ingredient/active");

}
export const getIngredientId=(id)=>{
    
    // console.log(API_URL_BASE_SUPPLIER+"/Ingredient/",id)
    return axios.get(API_URL_BASE_SUPPLIER+"/Ingredient/"+id);
}

//staff
export const getStaffByUserName=(userName)=>{
    return axios.get(API_URL_BASE_SUPPLIER+"/Staff/username?userName="+userName);
}

//Add Request Import
export const AddRequest=(Data)=>{
    return axios.post(API_URL_BASE_SUPPLIER+"/RequestImport",Data);
}

//Get Request 
export const GetRequest =(id)=>{
    return axios.get(API_URL_BASE_SUPPLIER+"/RequestImport/id_link?id="+id);
}

export const GetListRequestDetail=(id)=>{
    return axios.get(API_URL_BASE_SUPPLIER+"/RequestImport/id?id="+id);
}
//
export const GetSupplierById=(id)=>{
    return axios.get(API_URL_BASE_SUPPLIER+"/Supplier/id?id="+id);
}
//
export const GetWareHouse=(id)=>{
    return axios.get(API_URL_BASE_SUPPLIER+"/Warehouse/id?id="+id);
}
//
export const GetStaffById=(id)=>{
    return axios.get(API_URL_BASE_SUPPLIER+"/Staff/staff_id?id="+id);
}

export const getImportDetail=(id)=>{
    return axios.get(API_URL_BASE_SUPPLIER+"/RequestImport/detaillink?id="+id);
}

//product
export const getProductActive=()=>{
    return axios.get(API_URL_BASE_SUPPLIER+"/Product?isActive=true");
}
export const getProductById=(id)=>{
    return axios.get(API_URL_BASE_SUPPLIER+"/Product/id?id="+id);
}

//login
export const LoginUser=(userName,password)=>{
    return axios.post(API_URL_BASE_SUPPLIER+"/Login/user?userName="+userName+"&password="+password);
}

// customer
export const getCustomerLoginByUserName=(userName)=>{
    return axios.get(API_URL_BASE_SUPPLIER+"/Customer/userName?userName="+userName);
}

//checkout
export const checkoutReceipt=(data)=>{
    return axios.post(API_URL_BASE_SUPPLIER+"/Receipt/createCheckout",data);
}

//cart
export const getListCart=(id)=>{
    return axios.get(API_URL_BASE_SUPPLIER+"/Receipt/getcart?id="+id);
}

export const AddCart  =(data)=>{
    return axios.post(API_URL_BASE_SUPPLIER+"/Receipt/addCart",data);
}

//cart
export const ChangeQuantityDetailReceipt=(id,quantity)=>{
    return axios.put(API_URL_BASE_SUPPLIER+"/Receipt/changeQuantity?id="+id+"&quantity="+quantity);
}
export const DeleteDetailReceipt=( id)=>{
    return axios.delete(API_URL_BASE_SUPPLIER+"/Receipt/deleteDetail?id="+id);
}

//change status receipt
export const ChangeStatusReceipt=(form)=>{
    return axios.put(API_URL_BASE_SUPPLIER+"/Receipt/changeStatus",form);
}

//get receipt by status
 
export const getReceiptByStatus=(status)=>{
    return axios.get(API_URL_BASE_SUPPLIER+"/Receipt/getReceiptByStatus?status="+status);
}

//get detail receipt

export const getDetailReceipt=(id)=>{
    return axios.get(API_URL_BASE_SUPPLIER+"/Receipt/getDetailById?id="+id);
}