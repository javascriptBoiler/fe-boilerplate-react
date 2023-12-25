import axios from 'axios';
import {BASE_URL} from '../config';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        'Accept': '*',
        'allow_origin': '*'
    },
    // withCredentials: true,
});