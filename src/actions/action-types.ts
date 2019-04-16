import { IUser, IUsersOnline, IGame, ILog, IFilterSettings } from '../interfaces';

export const UPDATE_STATUS = 'UPDATE_STATUS';
export const UPDATE_IS_BUTTONS_DISABLED = 'UPDATE_IS_BUTTONS_DISABLED';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
export const UPDATE_USERS_ONLINE = 'UPDATE_USERS_ONLINE';

export const UPDATE_ALL_GAMES = 'UPDATE_ALL_GAMES';
export const UPDATE_OPEN_GAME = 'UPDATE_OPEN_GAME';
export const ADD_NEW_GAME = 'ADD_NEW_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';
export const ADD_NEW_LOG = 'ADD_NEW_LOG';

export const ADD_SERVER_URL = 'ADD_SERVER_URL';

export const FETCH_RATING = 'FETCH_RATING';

export const ADD_ERROR = 'ADD_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const UPDATE_SERVER_URL = 'UPDATE_SERVER_URL';

export const RELOAD_GAMES = 'RELOAD_GAMES';


export interface IUpdateStatus { type: typeof UPDATE_STATUS, isConnected: boolean };
export interface IUpdateIsButtonsDisabled { type: typeof UPDATE_IS_BUTTONS_DISABLED, isButtonsDisabled: boolean };
export interface IUpdateCurrentUser { type: typeof UPDATE_CURRENT_USER, currentUser: IUser | null };
export interface IUpdateUsersOnline { type: typeof UPDATE_USERS_ONLINE, usersOnline: IUsersOnline };
export interface IUpdateAllGames { type: typeof UPDATE_ALL_GAMES, allGames: IGame[] };
export interface IUpdateOpenGame { type: typeof UPDATE_OPEN_GAME, openGame: IGame };
export interface IAddNewGame { type: typeof ADD_NEW_GAME, newGame: IGame };
export interface IUpdateGame { type: typeof UPDATE_GAME, game: IGame };
export interface IAddNewLog { type: typeof ADD_NEW_LOG, newLog: ILog };

export interface IUsersRating { type: typeof FETCH_RATING, users: IUser[] };

export interface IAddError { type: typeof ADD_ERROR, message: string };
export interface IRemoveError { type: typeof REMOVE_ERROR, errorId: number };

export interface IAddNotification { type: typeof ADD_NOTIFICATION, message: string };
export interface IRemoveNotification { type: typeof REMOVE_NOTIFICATION, notificationId: number };

export interface IUpdateServerUrl { type: typeof UPDATE_SERVER_URL, serverUrl: string };

export interface IReloadGames { type: typeof RELOAD_GAMES, filterSettings: IFilterSettings };


export type Action = IUpdateStatus
  | IUpdateCurrentUser
  | IUpdateIsButtonsDisabled
  | IUpdateUsersOnline
  | IUpdateAllGames
  | IUpdateOpenGame
  | IAddNewGame
  | IUpdateGame
  | IAddNewLog
  | IUsersRating
  | IAddError
  | IRemoveError
  | IAddNotification
  | IRemoveNotification
  | IUpdateServerUrl
  | IReloadGames;
