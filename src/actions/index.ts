import * as types from '../constants';

export interface UpdateStatus { type: typeof types.UPDATE_STATUS, isConnected: boolean };
export interface UpdateCurrentUser { type: typeof types.UPDATE_CURRENT_USER, currentUser: types.User };
export interface UpdateUsersOnline { type: typeof types.UPDATE_USERS_ONLINE, usersOnline: types.User[] };
export interface UpdateAllGames { type: typeof types.UPDATE_ALL_GAMES, allGames: types.Game[] };
export interface UpdateOpenGame { type: typeof types.UPDATE_OPEN_GAME, openGame: types.Game };
export interface AddNewGame { type: typeof types.ADD_NEW_GAME, newGame: types.Game };
export interface UpdateGame { type: typeof types.UPDATE_GAME, game: types.Game };
export interface AddNewLog { type: typeof types.ADD_NEW_LOG, newLog: types.Log };

export type Action = UpdateStatus | UpdateCurrentUser | UpdateUsersOnline | UpdateAllGames | UpdateOpenGame | AddNewGame | UpdateGame | AddNewLog;

export const updateStatus = (isConnected: boolean): UpdateStatus => ({
  type: types.UPDATE_STATUS,
  isConnected,
});

export const updateCurrentUser = (currentUser: types.User): UpdateCurrentUser => ({
  type: types.UPDATE_CURRENT_USER,
  currentUser,
});

export const updateUsersOnline = (usersOnline: types.User[]): UpdateUsersOnline => ({
  type: types.UPDATE_USERS_ONLINE,
  usersOnline,
});

export const updateAllGames = (allGames: types.Game[]): UpdateAllGames => ({
  type: types.UPDATE_ALL_GAMES,
  allGames,
});

export const updateOpenGame = (openGame: types.Game): UpdateOpenGame => ({
  type: types.UPDATE_OPEN_GAME,
  openGame,
});

export const addNewGame = (newGame: types.Game): AddNewGame => ({
  type: types.ADD_NEW_GAME,
  newGame,
});

export const updateGame = (game: types.Game): UpdateGame => ({
  type: types.UPDATE_GAME,
  game,
});

export const addNewLog = (newLog: types.Log): AddNewLog => ({
  type: types.ADD_NEW_LOG,
  newLog,
});
