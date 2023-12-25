// material-ui
import { Box, Toolbar } from '@mui/material';

import HeaderWithMenus from './Header/HeaderWithMenus';
import navigation from '../../menu-items';
import Breadcrumbs from '../../components/@extended/Breadcrumbs';
import RequireAuth from '../../components/RequireAuth';

// ==============================|| MAIN LAYOUT ||============================== //
import { USER_ROLES } from '../../config'

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <HeaderWithMenus/>
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        <Breadcrumbs navigation={navigation} title />
        <RequireAuth allowedRoles={[USER_ROLES.admin]}/>
      </Box>
    </Box>
  );
};

export default MainLayout;
