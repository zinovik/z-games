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
  activeInvite: null,
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
        currentUser:
          state.currentUser && action.currentUser
            ? {
                ...state.currentUser,
                ...action.currentUser,
              }
            : action.currentUser,
      };

    case ActionTypes.UPDATE_USERS_ONLINE:
      return {
        ...state,
        usersOnline: {
          users: [...action.usersOnline.users],
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

    case ActionTypes.ADD_INVITE_INVITEE:
      if (!state.currentUser) {
        return { ...state };
      }

      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          invitesInvitee: [action.invite, ...state.currentUser.invitesInvitee],
        },
      };

    case ActionTypes.ADD_INVITE_INVITER:
      if (!state.currentUser) {
        return { ...state };
      }

      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          invitesInviter: [action.invite, ...state.currentUser.invitesInviter],
        },
      };

    case ActionTypes.UPDATE_INVITE:
      if (!state.currentUser) {
        return { ...state };
      }

      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          invitesInvitee: state.currentUser.invitesInvitee.map(invite =>
            invite.id === action.invite.id ? { ...action.invite } : { ...invite },
          ),
          invitesInviter: state.currentUser.invitesInviter.map(invite =>
            invite.id === action.invite.id ? { ...action.invite } : { ...invite },
          ),
        },
      };

    case ActionTypes.REMOVE_GAME:
      if (!state.currentUser) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          invitesInvitee: state.currentUser.invitesInvitee.filter(invite => invite.game.id !== action.gameId),
          invitesInviter: state.currentUser.invitesInviter.filter(invite => invite.game.id !== action.gameId),
        },
      };

    case ActionTypes.UPDATE_ACTIVE_INVITE:
      return {
        ...state,
        activeInvite: action.invite,
      };

    default:
      return state;
  }
};

export default users;
