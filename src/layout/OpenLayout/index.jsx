// material-ui
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

import HeaderWithMenus from '../MainLayout/Header/HeaderWithMenus';
import navigation from '../../menu-items';
import Breadcrumbs from '../../components/@extended/Breadcrumbs';

// ==============================|| OPEN LAYOUT ||============================== //

const OpenLayout = () => {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <HeaderWithMenus/>
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3, lg:0 } }}>
        <Toolbar />
        <Breadcrumbs navigation={navigation} title />
        <Outlet />
      </Box>
    </Box>
  );
};

export default OpenLayout;
