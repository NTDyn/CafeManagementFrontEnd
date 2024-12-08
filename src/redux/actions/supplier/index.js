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