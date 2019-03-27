import { IUser, IUsersOnline, IGame, ILog } from '../interfaces';

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

export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const ACTIVATE = 'ACTIVATE';
export const FETCH_RATING = 'FETCH_RATING';

export interface IUpdateStatus { type: typeof UPDATE_STATUS, isConnected: boolean };
export interface IUpdateIsButtonsDisabled { type: typeof UPDATE_IS_BUTTONS_DISABLED, isButtonsDisabled: boolean };
export interface IUpdateCurrentUser { type: typeof UPDATE_CURRENT_USER, currentUser: IUser | null };
export interface IUpdateUsersOnline { type: typeof UPDATE_USERS_ONLINE, usersOnline: IUsersOnline };
export interface IUpdateAllGames { type: typeof UPDATE_ALL_GAMES, allGames: IGame[] };
export interface IUpdateOpenGame { type: typeof UPDATE_OPEN_GAME, openGame: IGame };
export interface IAddNewGame { type: typeof ADD_NEW_GAME, newGame: IGame };
export interface IUpdateGame { type: typeof UPDATE_GAME, game: IGame };
export interface IAddNewLog { type: typeof ADD_NEW_LOG, newLog: ILog };

export interface IRegister { type: typeof REGISTER, user: IUser };
export interface IAuthorize { type: typeof LOGIN, token: string };
export interface IActivate { type: typeof ACTIVATE, token: string };
export interface IUsersRating { type: typeof FETCH_RATING, users: IUser[] };

export type Action = IUpdateStatus
  | IUpdateCurrentUser
  | IUpdateIsButtonsDisabled
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
