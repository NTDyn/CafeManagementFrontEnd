import axios from "axios";

const   API_URL_BASE_REQUEST="https://localhost:7250/api";
export const getListRequestStart=()=>{
    return axios.get(API_URL_BASE_REQUEST+"/RequestImport/0");
}
export const getListRequestApprove=()=>{
    return axios.get(API_URL_BASE_REQUEST+"/RequestImport/1");
}
export const getListRequestDeny=()=>{
    return axios.get(API_URL_BASE_REQUEST+"/RequestImport/2");
}
export const getListRequestCheck=()=>{
    return axios.get(API_URL_BASE_REQUEST+"/RequestImport/3");
}
export const ChangeStatusRequest=(data)=>{
    return axios.put(API_URL_BASE_REQUEST+"/RequestImport",data);
}
export const UpdateDetailInteredientandSupplier=(data)=>{
    return axios.put(API_URL_BASE_REQUEST+"/RequestImport/updatedetail",data);
}
