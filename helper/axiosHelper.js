import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const notAuthorizedURL = ['login', 'applicationparam'];
const baseUrl = 'https://fe5c-111-88-41-105.ngrok-free.app/api';

//region axiosHelper State

export let tenantID = '';
export let token = '';

//endregion

export const getAsync = async (url, requestHeaders) => {

    let headers = mergeHeaders(requestHeaders, url);

    const response = await axios.get(`${baseUrl}/${url}`, { headers });

    return response.data;
};

export const setState = (token, tenantID) => {

    console.log(token);
    console.log(tenantID);
    token = token;
    tenantID = tenantID;
};

export const clearState = () => {

    token = '';
    tenantID = '';
};

export const postAsync = async (url, requestBody, requestHeaders = null) => {

    let headers = mergeHeaders(requestHeaders, url);

    console.log('tenantID: ' + tenantID);

    console.log('token', token);

    console.log('headers: ' + headers);

    const response = await axios.post(`${baseUrl}/${url}`, requestBody, { headers });

    return response.data;
}

export const putAsync = async (url, requestBody, requestHeaders = null) => {

    let headers = mergeHeaders(requestHeaders, url);

    const response = await axios.put(`${baseUrl}/${url}`, requestBody, { headers });

    return response.data;
}

export const deleteAsync = async (url, requestBody, requestHeaders = null) => {

    let headers = mergeHeaders(requestHeaders, url);

    const data = requestBody;

    const response = await axios.delete(`${baseUrl}/${url}`, {
        headers,
        data,
    });

    return response.data;
}

async function mergeHeaders(requestHeaders, url) {
    let headers = { 'content-type': 'application/json', Accept: 'application/json', };

    if (notAuthorizedURL.includes(url.toLowerCase())) {
        const tenantHeader = { 'TenantID': 'cerm' };
        headers = {
            ...tenantHeader
        }
    }
    else {
        const authorizationHeader = { 'Authorization': token };
        headers = {
            ...authorizationHeader
        }
    }

    return { ...requestHeaders, ...headers };
}

// region Commented Function

// async function mergeHeaders(requestHeaders, url) {
//     let headers = {};

//     if (notAuthorizedURL.includes(url.toLowerCase())) {
//         const tenantID = await AsyncStorage.getItem('tenantID');
//         const tenantHeader = { 'TenantID': tenantID };
//         headers = {
//             ...tenantHeader
//         }
//     } else {
//         const token = await AsyncStorage.getItem('token');
//         const authorizationHeader = { 'Authorization': token };
//         headers = {
//             ...authorizationHeader
//         }
//     }

//     return { ...requestHeaders, ...headers };
// }

// endregion