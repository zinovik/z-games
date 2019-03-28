import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import users from './users';
import games from './games';
import errors from './errors';
import notifications from './notifications';

export default (history: History) => combineReducers({
  router: connectRouter(history),
  users,
  games,
  errors,
  notifications,
});
