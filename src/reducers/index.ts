import { combineReducers } from 'redux';

import games from './games';
import currentUser from './current-user';

export default combineReducers({
  currentUser,
  games,
});
