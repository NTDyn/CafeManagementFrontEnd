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
