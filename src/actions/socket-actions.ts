import { Dispatch, AnyAction } from 'redux';
import { push } from 'connected-react-router';

import { IUser, IUsersOnline, IGame, ILog, IState } from '../interfaces';
import * as ActionTypes from './action-types';

export const updateStatus = (isConnected: boolean) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    return dispatch({
      type: ActionTypes.UPDATE_STATUS,
      isConnected,
    });
  };

export const updateCurrentUser = (currentUser: IUser | null) =>
  async (dispatch: Dispatch): Promise<AnyAction> => dispatch({
    type: ActionTypes.UPDATE_CURRENT_USER,
    currentUser,
  });

export const updateUsersOnline = (usersOnline: IUsersOnline) =>
  async (dispatch: Dispatch): Promise<AnyAction> => dispatch({
    type: ActionTypes.UPDATE_USERS_ONLINE,
    usersOnline,
  });

export const updateAllGames = (allGames: IGame[]) =>
  async (dispatch: Dispatch): Promise<AnyAction> => dispatch({
    type: ActionTypes.UPDATE_ALL_GAMES,
    allGames,
  });

export const updateOpenGame = (openGameToUpdate: IGame) =>
  async (dispatch: Dispatch, getState: () => IState): Promise<AnyAction> => {

    const gameNumber = openGameToUpdate && openGameToUpdate.number;

    if (gameNumber === undefined || gameNumber === null) {
      dispatch(push('/games'));
    } else {
      dispatch(push(`/game/${gameNumber}`));
    }

    if (openGameToUpdate) {
      const currentUser = getState().users.currentUser;

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

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: false,
    });
  };

export const addNewGame = (newGameToAdd: IGame) =>
  async (dispatch: Dispatch): Promise<AnyAction> => dispatch({
    type: ActionTypes.ADD_NEW_GAME,
    newGame: newGameToAdd,
  });

export const updateGame = (game: IGame) =>
  async (dispatch: Dispatch): Promise<AnyAction> => dispatch({
    type: ActionTypes.UPDATE_GAME,
    game,
  });

export const addNewLog = (newLog: ILog) =>
  async (dispatch: Dispatch): Promise<AnyAction> => dispatch({
    type: ActionTypes.ADD_NEW_LOG,
    newLog,
  });

export const setNewToken = (newToken: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    localStorage.setItem('token', newToken);
  };

export const addError = (message: string) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    return dispatch({
      type: ActionTypes.ADD_ERROR,
      message,
    });
  };

export const addNotification = (message: string) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    return dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      message,
    });
  };
