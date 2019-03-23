import { Dispatch } from 'redux';

import { ZGamesApi, registerUser, authorizeUser } from '../services';
import * as types from '../constants';

const zGamesApi = ZGamesApi.Instance;

export interface IUpdateStatus { type: typeof types.UPDATE_STATUS, isConnected: boolean };
export interface IUpdateCurrentUser { type: typeof types.UPDATE_CURRENT_USER, currentUser: types.IUser | null };
export interface IUpdateUsersOnline { type: typeof types.UPDATE_USERS_ONLINE, usersOnline: types.IUsersOnline };
export interface IUpdateAllGames { type: typeof types.UPDATE_ALL_GAMES, allGames: types.IGame[] };
export interface IUpdateOpenGame { type: typeof types.UPDATE_OPEN_GAME, openGame: types.IGame };
export interface IAddNewGame { type: typeof types.ADD_NEW_GAME, newGame: types.IGame };
export interface IUpdateGame { type: typeof types.UPDATE_GAME, game: types.IGame };
export interface IAddNewLog { type: typeof types.ADD_NEW_LOG, newLog: types.ILog };
export interface IRegister { type: string, user: types.IUser };
export interface IAuthorize { type: string, token: string };

export type Action = IUpdateStatus
  | IUpdateCurrentUser
  | IUpdateUsersOnline
  | IUpdateAllGames
  | IUpdateOpenGame
  | IAddNewGame
  | IUpdateGame
  | IAddNewLog;

export const updateStatus = (isConnected: boolean): IUpdateStatus => ({
  type: types.UPDATE_STATUS,
  isConnected,
});

export const updateCurrentUser = (currentUser: types.IUser | null): IUpdateCurrentUser => ({
  type: types.UPDATE_CURRENT_USER,
  currentUser,
});

export const updateUsersOnline = (usersOnline: types.IUsersOnline): IUpdateUsersOnline => ({
  type: types.UPDATE_USERS_ONLINE,
  usersOnline,
});

export const updateAllGames = (allGames: types.IGame[]): IUpdateAllGames => ({
  type: types.UPDATE_ALL_GAMES,
  allGames,
});

export const updateOpenGame = (openGame: types.IGame): IUpdateOpenGame => ({
  type: types.UPDATE_OPEN_GAME,
  openGame,
});

export const addNewGame = (newGame: types.IGame): IAddNewGame => ({
  type: types.ADD_NEW_GAME,
  newGame,
});

export const updateGame = (game: types.IGame): IUpdateGame => ({
  type: types.UPDATE_GAME,
  game,
});

export const addNewLog = (newLog: types.ILog): IAddNewLog => ({
  type: types.ADD_NEW_LOG,
  newLog,
});

export const register = (username: string, password: string, email: string) =>
  async (dispatch: Dispatch): Promise<IRegister> => {
    const user = await registerUser(username, password, email);

    return dispatch({
      type: types.REGISTER,
      user,
    });
  };

export const authorize = (username: string, password: string) =>
  async (dispatch: Dispatch): Promise<IAuthorize> => {
    const { token } = await authorizeUser(username, password);

    zGamesApi.setToken(token);

    return dispatch({
      type: types.REGISTER,
      token,
    });
  };
