
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

import { IUser, IUsersOnline, IGame, ILog } from '../interfaces';
import * as ActionTypes from './action-types';

export const updateStatus = (isConnected: boolean) =>
  async (dispatch: Dispatch): Promise<any> => {
    return dispatch({
      type: ActionTypes.UPDATE_STATUS,
      isConnected,
    });
  };

export const updateCurrentUser = (currentUser: IUser | null) =>
  async (dispatch: Dispatch): Promise<any> => dispatch({
    type: ActionTypes.UPDATE_CURRENT_USER,
    currentUser,
  });

export const updateUsersOnline = (usersOnline: IUsersOnline) =>
  async (dispatch: Dispatch): Promise<any> => dispatch({
    type: ActionTypes.UPDATE_USERS_ONLINE,
    usersOnline,
  });

export const updateAllGames = (allGames: IGame[]) =>
  async (dispatch: Dispatch): Promise<any> => dispatch({
    type: ActionTypes.UPDATE_ALL_GAMES,
    allGames,
  });

export const updateOpenGame = (openGameToUpdate: IGame) =>
  async (dispatch: Dispatch): Promise<any> => {

    const gameNumber = openGameToUpdate && openGameToUpdate.number;

    if (gameNumber === undefined || gameNumber === null) {
      dispatch(push('/games'));
    } else {
      dispatch(push(`/game/${gameNumber}`));
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
  async (dispatch: Dispatch): Promise<any> => dispatch({
    type: ActionTypes.ADD_NEW_GAME,
    newGame: newGameToAdd,
  });

export const updateGame = (game: IGame) =>
  async (dispatch: Dispatch): Promise<any> => dispatch({
    type: ActionTypes.UPDATE_GAME,
    game,
  });

export const addNewLog = (newLog: ILog) =>
  async (dispatch: Dispatch): Promise<any> => dispatch({
    type: ActionTypes.ADD_NEW_LOG,
    newLog,
  });

export const setNewToken = (newToken: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    localStorage.setItem('token', newToken);
  };
