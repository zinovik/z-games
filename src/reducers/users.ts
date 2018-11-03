import * as types from '../constants';

const users = (state = <types.UsersState>{}, action): types.UsersState => {
  switch (action.type) {
    case types.UPDATE_STATUS:
      return {
        ...state,
        connected: action.connected,
      };
    case types.SET_CURRENT_USERNAME:
      return {
        ...state,
        currentUsername: action.currentUsername,
      };
    default:
      return state;
  }
};

export default users;
