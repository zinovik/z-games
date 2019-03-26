import { Dispatch } from 'redux';

import { ZGamesApi, registerUser, authorizeUser, activateUser, fetchUsersRating } from '../services';
import { IUser, IUsersOnline, IGame, ILog } from '../interfaces';
import * as ActionTypes from './action-types';

const zGamesApi = ZGamesApi.Instance;

export interface IUpdateStatus { type: typeof ActionTypes.UPDATE_STATUS, isConnected: boolean };
export interface IUpdateIsButtonsDisabled { type: typeof ActionTypes.UPDATE_IS_BUTTONS_DISABLED, isButtonsDisabled: boolean };
export interface IUpdateCurrentUser { type: typeof ActionTypes.UPDATE_CURRENT_USER, currentUser: IUser | null };
export interface IUpdateUsersOnline { type: typeof ActionTypes.UPDATE_USERS_ONLINE, usersOnline: IUsersOnline };
export interface IUpdateAllGames { type: typeof ActionTypes.UPDATE_ALL_GAMES, allGames: IGame[] };
export interface IUpdateOpenGame { type: typeof ActionTypes.UPDATE_OPEN_GAME, openGame: IGame };
export interface IAddNewGame { type: typeof ActionTypes.ADD_NEW_GAME, newGame: IGame };
export interface IUpdateGame { type: typeof ActionTypes.UPDATE_GAME, game: IGame };
export interface IAddNewLog { type: typeof ActionTypes.ADD_NEW_LOG, newLog: ILog };

export interface IRegister { type: typeof ActionTypes.REGISTER, user: IUser };
export interface IAuthorize { type: typeof ActionTypes.LOGIN, token: string };
export interface IActivate { type: typeof ActionTypes.ACTIVATE, token: string };
export interface IUsersRating { type: typeof ActionTypes.FETCH_RATING, users: IUser[] };

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

export const updateStatus = (isConnected: boolean): IUpdateStatus => ({
  type: ActionTypes.UPDATE_STATUS,
  isConnected,
});

export const updateIsButtonsDisabled = (isButtonsDisabled: boolean): IUpdateIsButtonsDisabled => ({
  type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
  isButtonsDisabled,
});

export const updateCurrentUser = (currentUser: IUser | null): IUpdateCurrentUser => ({
  type: ActionTypes.UPDATE_CURRENT_USER,
  currentUser,
});

export const updateUsersOnline = (usersOnline: IUsersOnline): IUpdateUsersOnline => ({
  type: ActionTypes.UPDATE_USERS_ONLINE,
  usersOnline,
});

export const updateAllGames = (allGames: IGame[]): IUpdateAllGames => ({
  type: ActionTypes.UPDATE_ALL_GAMES,
  allGames,
});

export const updateOpenGame = (openGameToUpdate: IGame): IUpdateOpenGame => ({
  type: ActionTypes.UPDATE_OPEN_GAME,
  openGame: openGameToUpdate,
});

export const addNewGame = (newGameToAdd: IGame): IAddNewGame => ({
  type: ActionTypes.ADD_NEW_GAME,
  newGame: newGameToAdd,
});

export const updateGame = (game: IGame): IUpdateGame => ({
  type: ActionTypes.UPDATE_GAME,
  game,
});

export const addNewLog = (newLog: ILog): IAddNewLog => ({
  type: ActionTypes.ADD_NEW_LOG,
  newLog,
});

// Users

export const register = (username: string, password: string, email: string) =>
  async (dispatch: Dispatch): Promise<any> => {
    const user = await registerUser(username, password, email);

    return dispatch({
      type: ActionTypes.REGISTER,
      user,
    });
  };

export const authorize = (username: string, password: string) =>
  async (dispatch: Dispatch): Promise<any> => {
    const { token } = await authorizeUser(username, password);

    localStorage.setItem('token', token);
    zGamesApi.updateToken();

    return dispatch({
      type: ActionTypes.LOGIN,
      token,
    });
  };

export const activate = (activationToken: string) =>
  async (dispatch: Dispatch): Promise<any> => {
    const { token } = await activateUser(activationToken);

    localStorage.setItem('token', token);
    zGamesApi.updateToken();

    return dispatch({
      type: ActionTypes.ACTIVATE,
      token,
    });
  };

export const fetchRating = () =>
  async (dispatch: Dispatch): Promise<any> => {
    const users = await fetchUsersRating();

    return dispatch({
      type: ActionTypes.FETCH_RATING,
      users,
    });
  };

// Games

export const joinGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<any> => {
    zGamesApi.socket.emit('join-game', gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const openGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<any> => {
    zGamesApi.socket.emit('open-game', gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const watchGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<any> => {
    zGamesApi.socket.emit('watch-game', gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const leaveGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<any> => {
    zGamesApi.socket.emit('leave-game', gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const closeGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<any> => {
    zGamesApi.socket.emit('close-game', gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const readyToGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<any> => {
    zGamesApi.socket.emit('toggle-ready', gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const startGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<any> => {
    zGamesApi.socket.emit('start-game', gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const makeMove = ({ gameNumber, move }: { gameNumber: number, move: string }) =>
  async (dispatch: Dispatch): Promise<any> => {
    zGamesApi.socket.emit('make-move', { gameNumber, move });
  };

export const sendMessage = ({ gameId, message }: { gameId: string, message: string }) =>
  async (dispatch: Dispatch): Promise<any> => {
    zGamesApi.socket.emit('message', { gameId, message });
  };

export const newGame = (gameName: string) =>
  async (dispatch: Dispatch): Promise<any> => {
    zGamesApi.socket.emit('new-game', gameName);
  };
