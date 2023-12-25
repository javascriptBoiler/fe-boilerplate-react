// project import
import { NotificationOutlined, HomeOutlined, ContactsOutlined, ReadOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PetsIcon from '@mui/icons-material/Pets';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FactCheckIcon from '@mui/icons-material/FactCheck';
// icons
const icons = {
  NotificationOutlined,
  HomeOutlined,
  ContactsOutlined,
  ReadOutlined,
  UserOutlined,
  CalendarOutlined,
  DirectionsWalkIcon,
  CalendarMonthIcon,
  PetsIcon,
  ManageAccountsIcon,
  FactCheckIcon
};
// ==============================|| MENU ITEMS ||============================== //


export const openMenuItems = {
  items: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/',
      icon: icons.HomeOutlined,
      breadcrumbs: false
    },
    {
      id: 'contact',
      title: 'Contact',
      type: 'item',
      url: '/contact',
      icon: icons.ContactsOutlined,
      breadcrumbs: false
    },
    {
      id: 'about',
      title: 'About Us',
      type: 'item',
      url: '/about',
      icon: icons.ReadOutlined,
      breadcrumbs: false
    },
  ]
};

const privateItems = {
  items: [
    {
      id: 'customer',
      title: 'Customer',
      type: 'item',
      url: '/customer',
      icon: icons.ManageAccountsIcon,
      breadcrumbs: false
    },
    {
      id: 'calender',
      title: 'Calender',
      type: 'item',
      url: '/calender',
      icon: icons.CalendarMonthIcon,
      breadcrumbs: false
    },
    {
      id: 'appointment',
      title: 'Appointment',
      type: 'item',
      url: '/appointment',
      icon: icons.FactCheckIcon,
      breadcrumbs: false
    },
    {
      id: 'pets',
      title: 'Pets',
      type: 'item',
      url: '/pet',
      icon: icons.PetsIcon,
      breadcrumbs: false
    },
    {
      id: 'walkers',
      title: 'Walkers',
      type: 'item',
      url: '/walker',
      icon: icons.DirectionsWalkIcon,
      breadcrumbs: false
    }
  ]
};



export default privateItems;
