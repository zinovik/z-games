import * as ActionTypes from '../actions/action-types';
import { IUsersState } from '../interfaces';
import { SERVER_URL } from '../config';

const initialState = {
  isConnected: false,
  isButtonsDisabled: false,
  currentUser: null,
  usersOnline: {
    users: [],
    usersCount: 0,
  },
  usersRating: [],
  serverUrl: SERVER_URL,
};

const users = (state: IUsersState = initialState, action: ActionTypes.Action): IUsersState => {

  switch (action.type) {

    case ActionTypes.UPDATE_STATUS:
      return {
        ...state,
        isConnected: action.isConnected,
      };

    case ActionTypes.UPDATE_IS_BUTTONS_DISABLED:
      return {
        ...state,
        isButtonsDisabled: action.isButtonsDisabled,
      };

    case ActionTypes.UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };

    case ActionTypes.UPDATE_USERS_ONLINE:
      return {
        ...state,
        usersOnline: {
          users: [
            ...action.usersOnline.users,
          ],
          usersCount: action.usersOnline.usersCount,
        },
      };

    case ActionTypes.FETCH_RATING:
      return {
        ...state,
        usersRating: [...action.users],
      };

    case ActionTypes.UPDATE_SERVER_URL:
      return {
        ...state,
        serverUrl: action.serverUrl,
      };

    default:
      return state;

  }

};

export default users;
