// ==============================|| THEME CONFIG  ||============================== //

const config = {
  defaultPath: '/',
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en',
  miniDrawer: false,
  container: true,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr'
};

export default config;
export const drawerWidth = 260;

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const endpoints = {
  LOGIN_URL: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH: '/auth/refresh',
  CLIENTS: '/clientes',
  USER: '/user',
  PET: '/pet',
  WALKER: '/walker',
  APPOINTMENT: '/appointment',
}

export const USER_ROLES = {
  'client': 2001,
  'editor': 1984,
  'admin': 5150
}

export const USER_ROLE_BE_STORE_NAMES = {
  5150: 'admin',
  2001: 'client'
}