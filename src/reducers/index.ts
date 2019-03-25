import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import users from './users';
import games from './games';

export default (history: History) => combineReducers({
  router: connectRouter(history),
  users,
  games,
});
