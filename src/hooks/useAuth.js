import { USER_ROLES} from '../config';

const setAuth = (props) => {
    localStorage.setItem("UserAttributes", JSON.stringify({ ...props}));
}

export const getUser = () => {
    const userData =  JSON.parse(localStorage.getItem("UserAttributes"));
    const [roleName] = userData?.roles ? Object.entries(USER_ROLES).find(([, value]) => userData?.roles?.includes(value)) : [undefined]
    return ({...userData, roleName})
}

export default setAuth;