import { IUser, IUsersOnline, IGame, ILog, IFilterSettings, IInvite } from '../interfaces';

export const UPDATE_STATUS = 'UPDATE_STATUS';
export const UPDATE_IS_BUTTONS_DISABLED = 'UPDATE_IS_BUTTONS_DISABLED';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
export const UPDATE_USERS_ONLINE = 'UPDATE_USERS_ONLINE';

export const UPDATE_ALL_GAMES = 'UPDATE_ALL_GAMES';
export const UPDATE_OPEN_GAME = 'UPDATE_OPEN_GAME';
export const ADD_NEW_GAME = 'ADD_NEW_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';
export const REMOVE_GAME = 'REMOVE_GAME';
export const ADD_NEW_LOG = 'ADD_NEW_LOG';

export const ADD_SERVER_URL = 'ADD_SERVER_URL';

export const FETCH_RATING = 'FETCH_RATING';

export const ADD_ERROR = 'ADD_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const UPDATE_SERVER_URL = 'UPDATE_SERVER_URL';

export const RELOAD_GAMES = 'RELOAD_GAMES';

export const ADD_INVITE_INVITER = 'ADD_INVITE_INVITER';
export const ADD_INVITE_INVITEE = 'ADD_INVITE_INVITEE';
export const UPDATE_INVITE = 'UPDATE_INVITE';


export interface IUpdateStatus { type: typeof UPDATE_STATUS, isConnected: boolean };
export interface IUpdateIsButtonsDisabled { type: typeof UPDATE_IS_BUTTONS_DISABLED, isButtonsDisabled: boolean };
export interface IUpdateCurrentUser { type: typeof UPDATE_CURRENT_USER, currentUser: IUser | null };
export interface IUpdateUsersOnline { type: typeof UPDATE_USERS_ONLINE, usersOnline: IUsersOnline };
export interface IUpdateAllGames { type: typeof UPDATE_ALL_GAMES, allGames: IGame[] };
export interface IUpdateOpenGame { type: typeof UPDATE_OPEN_GAME, openGame: IGame };
export interface IAddNewGame { type: typeof ADD_NEW_GAME, newGame: IGame };
export interface IUpdateGame { type: typeof UPDATE_GAME, game: IGame };
export interface IRemoveGame { type: typeof REMOVE_GAME, gameNumber: number };
export interface IAddNewLog { type: typeof ADD_NEW_LOG, newLog: ILog };

export interface IUsersRating { type: typeof FETCH_RATING, users: IUser[] };

export interface IAddError { type: typeof ADD_ERROR, message: string };
export interface IRemoveError { type: typeof REMOVE_ERROR, errorId: number };

export interface IAddNotification { type: typeof ADD_NOTIFICATION, message: string };
export interface IRemoveNotification { type: typeof REMOVE_NOTIFICATION, notificationId: number };

export interface IUpdateServerUrl { type: typeof UPDATE_SERVER_URL, serverUrl: string };

export interface IReloadGames { type: typeof RELOAD_GAMES, filterSettings: IFilterSettings };

export interface IAddInviteInviter { type: typeof ADD_INVITE_INVITER, invite: IInvite };
export interface IAddInviteInvitee { type: typeof ADD_INVITE_INVITEE, invite: IInvite };
export interface IUpdateInvite { type: typeof UPDATE_INVITE, invite: IInvite };


export type Action = IUpdateStatus
  | IUpdateCurrentUser
  | IUpdateIsButtonsDisabled
  | IUpdateUsersOnline
  | IUpdateAllGames
  | IUpdateOpenGame
  | IAddNewGame
  | IUpdateGame
  | IRemoveGame
  | IAddNewLog
  | IUsersRating
  | IAddError
  | IRemoveError
  | IAddNotification
  | IRemoveNotification
  | IUpdateServerUrl
  | IReloadGames
  | IAddInviteInviter
  | IAddInviteInvitee
  | IUpdateInvite;
