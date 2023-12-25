import axios from '../api/axios';
import setAuth from './useAuth';
import {endpoints} from '../config'
import { USER_ROLES } from '../config'

const useRefreshToken = () => {
    const userData = JSON.parse(localStorage.getItem("UserAttributes"));

    const refresh = async () => {
        const response = await axios.post(endpoints.REFRESH, {
            refresh: userData?.refreshToken
        });
        const {firstName, lastName, image, mobile} = response?.data || {}
        const accessToken = response?.data?.accessToken;
        const refreshToken = response?.data?.refreshToken;

        const roles = response?.data?.userRole ? [USER_ROLES[response?.data?.userRole]] : [5150];
        setAuth({ user: response?.data?.email, roles, accessToken, refreshToken, sub: {firstName, lastName, image, mobile} });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
