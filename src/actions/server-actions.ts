import { Dispatch, AnyAction } from 'redux';
import { push } from 'connected-react-router';

import { IUser, IUsersOnline, IGame, ILog, IState, IInvite } from '../interfaces';
import * as ActionTypes from './action-types';

export const updateStatus = (isConnected: boolean) => (dispatch: Dispatch): AnyAction => {
  return dispatch({
    type: ActionTypes.UPDATE_STATUS,
    isConnected,
  });
};

export const updateCurrentUser = (currentUser: IUser | null) => (dispatch: Dispatch): AnyAction =>
  dispatch({
    type: ActionTypes.UPDATE_CURRENT_USER,
    currentUser,
  });

export const updateUsersOnline = (usersOnline: IUsersOnline) => (dispatch: Dispatch): AnyAction =>
  dispatch({
    type: ActionTypes.UPDATE_USERS_ONLINE,
    usersOnline,
  });

export const updateAllGames = (allGames: IGame[]) => (dispatch: Dispatch): AnyAction =>
  dispatch({
    type: ActionTypes.UPDATE_ALL_GAMES,
    allGames,
  });

export const updateOpenGame = (openGameToUpdate: IGame) => (dispatch: Dispatch, getState: () => IState): void => {
  const gameNumber = openGameToUpdate && openGameToUpdate.number;

  if (openGameToUpdate) {
    const { currentUser } = getState().users;

    if (currentUser) {
      const { openGame } = getState().games;

      let wasMyTurn = false;

      if (openGame) {
        const { nextPlayers: nextPlayersOld } = openGame;
        wasMyTurn = nextPlayersOld.some(nextPlayer => nextPlayer.id === currentUser.id);
      }

      const { nextPlayers: nextPlayersNew } = openGameToUpdate;
      const isMyTurn = nextPlayersNew.some(nextPlayer => nextPlayer.id === currentUser.id);

      if (!wasMyTurn && isMyTurn) {
        dispatch({
          type: ActionTypes.ENABLE_YOUR_TURN,
        });

        setTimeout(() => {
          dispatch({
            type: ActionTypes.DISABLE_YOUR_TURN,
          });
        }, 1000);
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

  const {
    router: {
      location: { pathname },
    },
  } = getState();

  if (gameNumber === undefined || gameNumber === null) {
    if (pathname !== '/games') {
      dispatch(push('/games'));
    }
  } else {
    if (pathname !== `/game/${gameNumber}`) {
      dispatch(push(`/game/${gameNumber}`));
    }
  }
};

export const addNewGame = (newGameToAdd: IGame) => (dispatch: Dispatch): AnyAction =>
  dispatch({
    type: ActionTypes.ADD_NEW_GAME,
    newGame: newGameToAdd,
  });

export const updateGame = (game: IGame) => (dispatch: Dispatch): AnyAction =>
  dispatch({
    type: ActionTypes.UPDATE_GAME,
    game,
  });

export const removeGameServer = (gameId: string) => (dispatch: Dispatch): AnyAction =>
  dispatch({
    type: ActionTypes.REMOVE_GAME,
    gameId,
  });

export const addNewLog = (newLog: ILog) => (dispatch: Dispatch, getState: () => IState): void => {
  dispatch({
    type: ActionTypes.ADD_NEW_LOG,
    newLog,
  });

  if (newLog.type !== 'message') {
    return;
  }

  const { currentUser } = getState().users;

  if (!currentUser || currentUser.id === newLog.createdBy.id) {
    return;
  }

  dispatch({
    type: ActionTypes.ADD_NOTIFICATION,
    message: `${newLog.createdBy.username}: ${newLog.text}`,
  });
};

export const setNewToken = (newToken: string) => (dispatch: Dispatch): void => {
  localStorage.setItem('token', newToken);
};

export const addError = (message: string) => (dispatch: Dispatch): AnyAction => {
  dispatch({
    type: ActionTypes.ADD_ERROR,
    message,
  });

  return dispatch({
    type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
    isButtonsDisabled: false,
  });
};

export const addNotification = (message: string) => (dispatch: Dispatch): AnyAction => {
  return dispatch({
    type: ActionTypes.ADD_NOTIFICATION,
    message,
  });
};

export const addInvite = (invite: IInvite) => (dispatch: Dispatch, getState: () => IState): void => {
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

    dispatch({
      type: ActionTypes.UPDATE_ACTIVE_INVITE,
      invite,
    });
  }
};

export const updateInvite = (invite: IInvite) => (dispatch: Dispatch): AnyAction => {
  dispatch({
    type: ActionTypes.UPDATE_INVITE,
    invite,
  });

  return dispatch({
    type: ActionTypes.ADD_NOTIFICATION,
    message: `Game ${invite.game.number} invite was ${invite.isAccepted ? 'accepted' : 'declined'}`,
  });
};
