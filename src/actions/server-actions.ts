import { Dispatch, AnyAction } from 'redux';
import { push } from 'connected-react-router';

import { SocketService } from '../services';
import { IUser, IUsersOnline, IGame, ILog, IState, IInvite } from '../interfaces';
import * as ActionTypes from './action-types';

const socketService = SocketService.Instance;

export const updateStatus = (isConnected: boolean) =>
  (dispatch: Dispatch): AnyAction => {
    return dispatch({
      type: ActionTypes.UPDATE_STATUS,
      isConnected,
    });
  };

export const updateCurrentUser = (currentUser: IUser | null) =>
  (dispatch: Dispatch): AnyAction => dispatch({
    type: ActionTypes.UPDATE_CURRENT_USER,
    currentUser,
  });

export const updateUsersOnline = (usersOnline: IUsersOnline) =>
  (dispatch: Dispatch): AnyAction => dispatch({
    type: ActionTypes.UPDATE_USERS_ONLINE,
    usersOnline,
  });

export const updateAllGames = (allGames: IGame[]) =>
  (dispatch: Dispatch): AnyAction => dispatch({
    type: ActionTypes.UPDATE_ALL_GAMES,
    allGames,
  });

export const updateOpenGame = (openGameToUpdate: IGame) =>
  (dispatch: Dispatch, getState: () => IState): AnyAction => {

    const gameNumber = openGameToUpdate && openGameToUpdate.number;

    if (openGameToUpdate) {
      const { currentUser } = getState().users;

      if (currentUser) {
        const { nextPlayers } = openGameToUpdate;
        const isMyTurn = nextPlayers.some(nextPlayer => nextPlayer.id === currentUser.id);

        if (isMyTurn) {
          dispatch({
            type: ActionTypes.ADD_NOTIFICATION,
            message: 'Your turn!',
          })
        }
      }
    }

    dispatch({
      type: ActionTypes.UPDATE_OPEN_GAME,
      openGame: openGameToUpdate,
    });

    dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: false,
    });

    if (gameNumber === undefined || gameNumber === null) {
      return dispatch(push('/games'));
    }

    return dispatch(push(`/game/${gameNumber}`));
  };

export const addNewGame = (newGameToAdd: IGame) =>
  (dispatch: Dispatch): AnyAction => dispatch({
    type: ActionTypes.ADD_NEW_GAME,
    newGame: newGameToAdd,
  });

export const updateGame = (game: IGame) =>
  (dispatch: Dispatch): AnyAction => dispatch({
    type: ActionTypes.UPDATE_GAME,
    game,
  });

export const removeGameServer = (gameId: string) =>
  (dispatch: Dispatch): AnyAction => dispatch({
    type: ActionTypes.REMOVE_GAME,
    gameId,
  });

export const addNewLog = (newLog: ILog) =>
  (dispatch: Dispatch): AnyAction => dispatch({
    type: ActionTypes.ADD_NEW_LOG,
    newLog,
  });

export const setNewToken = (newToken: string) =>
  (dispatch: Dispatch): void => {
    localStorage.setItem('token', newToken);
  };

export const addError = (message: string) =>
  (dispatch: Dispatch): AnyAction => {
    dispatch({
      type: ActionTypes.ADD_ERROR,
      message,
    });

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: false,
    });
  };

export const addNotification = (message: string) =>
  (dispatch: Dispatch): AnyAction => {
    return dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      message,
    });
  };

export const addInvite = (invite: IInvite) =>
  (dispatch: Dispatch, getState: () => IState): void => {

    const { currentUser } = getState().users;

    if (!currentUser) {
      return;
    }

    if (currentUser.id === invite.createdBy.id) {
      dispatch({
        type: ActionTypes.ADD_INVITE_INVITER,
        invite,
      });
      return;
    }

    if (currentUser.id === invite.invitee.id) {
      dispatch({
        type: ActionTypes.ADD_INVITE_INVITEE,
        invite,
      });

      // TODO: Dialog window
      if (confirm(`You was invited to the new game by ${invite.createdBy.username}. Do you want to join?`)) {
        return socketService.acceptInvite(invite.id);
      }

      socketService.declineInvite(invite.id);
    }
  };

export const updateInvite = (invite: IInvite) =>
  (dispatch: Dispatch): AnyAction => {
    return dispatch({
      type: ActionTypes.UPDATE_INVITE,
      invite,
    });
  };
