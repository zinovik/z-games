import * as types from '../constants';
import { Action } from '../actions';

const initialState = {
  isConnected: false,
  currentUser: null,
  usersOnline: [],
};

const users = (state: types.IUsersState = initialState, action: Action): types.IUsersState => {

  switch (action.type) {

    case types.UPDATE_STATUS:
      return {
        ...state,
        isConnected: action.isConnected,
      };

    case types.UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };

    case types.UPDATE_USERS_ONLINE:
      return {
        ...state,
        usersOnline: [
          ...action.usersOnline
        ],
      };

    default:
      return state;

  }

};

export default users;
