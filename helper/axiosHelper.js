/*import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const notAuthorizedURL = ['login'];

export const getAsync = async (url, requestHeaders) => {
    let headers = mergeHeaders(requestHeaders, url);
    const response = await axios.get(`http://localhost:5072/api/${url}`, { headers });
    return response.data;
};


async function mergeHeaders(requestHeaders, url) {
    let headers = {};

    if (notAuthorizedURL.includes(url.toLowerCase())) {
        const tenantID = await AsyncStorage.getItem('tenantID');
        const tenantHeader = { 'TenantID': tenantID };
        headers = {
            ...tenantHeader
        }
    } else {
        const token = await AsyncStorage.getItem('token');
        const authorizationHeader = { 'Authorization': token };
        headers = {
            ...authorizationHeader
        }
    }

    return { ...requestHeaders, ...headers };
}*/
