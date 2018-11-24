import * as types from '../constants';

const initialState = {
  connected: false,
  currentUser: null,
  usersOnline: [],
};

const users = (state: types.UsersState = initialState, action): types.UsersState => {

  switch (action.type) {

    case types.UPDATE_STATUS:
      return {
        ...state,
        connected: action.connected,
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
