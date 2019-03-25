import { Dispatch } from 'redux';

import { ZGamesApi, registerUser, authorizeUser, activateUser, fetchUsersRating } from '../services';
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

export interface IRegister { type: typeof types.REGISTER, user: types.IUser };
export interface IAuthorize { type: typeof types.LOGIN, token: string };
export interface IActivate { type: typeof types.ACTIVATE, token: string };
export interface IUsersRating { type: typeof types.FETCH_RATING, users: types.IUser[] };

export type Action = IUpdateStatus
  | IUpdateCurrentUser
  | IUpdateUsersOnline
  | IUpdateAllGames
  | IUpdateOpenGame
  | IAddNewGame
  | IUpdateGame
  | IAddNewLog
  | IRegister
  | IAuthorize
  | IActivate
  | IUsersRating;

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

export const updateOpenGame = (openGameToUpdate: types.IGame): IUpdateOpenGame => ({
  type: types.UPDATE_OPEN_GAME,
  openGame: openGameToUpdate,
});

export const addNewGame = (newGameToAdd: types.IGame): IAddNewGame => ({
  type: types.ADD_NEW_GAME,
  newGame: newGameToAdd,
});

export const updateGame = (game: types.IGame): IUpdateGame => ({
  type: types.UPDATE_GAME,
  game,
});

export const addNewLog = (newLog: types.ILog): IAddNewLog => ({
  type: types.ADD_NEW_LOG,
  newLog,
});

// Users

export const register = (username: string, password: string, email: string) =>
  async (dispatch: Dispatch): Promise<any> => {
    const user = await registerUser(username, password, email);

    return dispatch({
      type: types.REGISTER,
      user,
    });
  };

export const authorize = (username: string, password: string) =>
  async (dispatch: Dispatch): Promise<any> => {
    const { token } = await authorizeUser(username, password);

    localStorage.setItem('token', token);
    zGamesApi.updateToken();

    return dispatch({
      type: types.LOGIN,
      token,
    });
  };

export const activate = (activationToken: string) =>
  async (dispatch: Dispatch): Promise<any> => {
    const { token } = await activateUser(activationToken);

    localStorage.setItem('token', token);
    zGamesApi.updateToken();

    return dispatch({
      type: types.ACTIVATE,
      token,
    });
  };

export const fetchRating = () =>
  async (dispatch: Dispatch): Promise<any> => {
    const users = await fetchUsersRating();

    return dispatch({
      type: types.FETCH_RATING,
      users,
    });
  };

// Games

export const joinGame = (gameNumber: number): void => {
  zGamesApi.socket.emit('join-game', gameNumber);
};

export const openGame = (gameNumber: number): void => {
  zGamesApi.socket.emit('open-game', gameNumber);
};

export const watchGame = (gameNumber: number): void => {
  zGamesApi.socket.emit('watch-game', gameNumber);
};

export const leaveGame = (gameNumber: number): void => {
  zGamesApi.socket.emit('leave-game', gameNumber);
};

export const closeGame = (gameNumber: number): void => {
  zGamesApi.socket.emit('close-game', gameNumber);
};

export const readyToGame = (gameNumber: number): void => {
  zGamesApi.socket.emit('toggle-ready', gameNumber);
};

export const startGame = (gameNumber: number): void => {
  zGamesApi.socket.emit('start-game', gameNumber);
};

export const makeMove = ({ gameNumber, move }: { gameNumber: number, move: string }): void => {
  zGamesApi.socket.emit('make-move', { gameNumber, move });
};

export const sendMessage = ({ gameId, message }: { gameId: string, message: string }): void => {
  zGamesApi.socket.emit('message', { gameId, message });
};

export const newGame = (gameName: string): void => {
  zGamesApi.socket.emit('new-game', gameName);
};
