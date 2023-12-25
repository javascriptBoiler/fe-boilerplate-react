// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import user from './user';
import appointment from './appointment';
import pet from './pet';
import walker from './walker';

import credential from './credential';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, user, appointment, credential, pet, walker });

export default reducers;
