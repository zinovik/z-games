import * as types from '../constants/ActionTypes';

const currentUser = (state = <any>[], action) => {
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

export default currentUser;
