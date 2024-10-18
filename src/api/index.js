import axios from "axios"
//import { createGetToken, createPostToken } from "../codes/function"
import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE
} from '../redux/actions/actionTypes';

let urlSite = 'https://localhost:7250'



export async function fetchAPI(uri) {
    const response = await axios({
        type: FETCH_DATA_REQUEST,
        url: urlSite + uri,
        method: 'GET'
    });
    return response.data;
}

export async function postAPI(uri, data) {
    const response = await axios({
        url: urlSite + uri,
        method: 'POST',
        headers: {
            //   'Token': await createPostToken(uri, JSON.stringify(data)),
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(data)
    });
    return await response.data;

}

export async function putAPI(uri, data) {
    const response = await axios({
        url: urlSite + uri,
        method: 'PUT',
        headers: {
            //    'Token': await createPostToken(uri, JSON.stringify(data)),
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(data)
    });
    return await response.data;

}