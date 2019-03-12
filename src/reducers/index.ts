import { combineReducers } from 'redux';

import users from './users';
import games from './games';
import server from './server';

export default combineReducers({
  users,
  games,
  server,
});
