import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

import { SocketService, registerUser, authorizeUser, activateUser, fetchUsersRating } from '../services';
import * as ActionTypes from './action-types';

const socketService = SocketService.Instance;

// Users

export const register = (username: string, password: string, email: string) =>
  async (dispatch: Dispatch): Promise<any> => {
    const user = await registerUser(username, password, email);

    dispatch({
      type: ActionTypes.REGISTER,
      user,
    });

    // TODO: Error

    return alert('Check email to activate your account');
  };

export const authorize = (username: string, password: string) =>
  async (dispatch: Dispatch): Promise<any> => {
    const { token } = await authorizeUser(username, password);

    localStorage.setItem('token', token);
    socketService.reconnect();

    return dispatch({
      type: ActionTypes.LOGIN,
      token,
    });
  };

export const activate = (activationToken: string) =>
  async (dispatch: Dispatch): Promise<any> => {
    const { token } = await activateUser(activationToken);

    localStorage.setItem('token', token);
    socketService.reconnect();

    dispatch({
      type: ActionTypes.ACTIVATE,
      token,
    });

    return dispatch(push('/games'));
  };

export const fetchRating = () =>
  async (dispatch: Dispatch): Promise<any> => {
    const users = await fetchUsersRating();

    return dispatch({
      type: ActionTypes.FETCH_RATING,
      users,
    });
  };

export const logout = () =>
  async (dispatch: Dispatch): Promise<any> => {
    localStorage.setItem('token', '');
    socketService.reconnect();

    return dispatch({
      type: ActionTypes.UPDATE_CURRENT_USER,
      currentUser: null,
    });
  };

// Games

export const joinGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<any> => {
    socketService.joinGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const openGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<any> => {
    socketService.openGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const watchGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<any> => {
    socketService.watchGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const leaveGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<any> => {
    socketService.leaveGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const closeGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<any> => {
    socketService.closeGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const readyToGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<any> => {
    socketService.readyToGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const startGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<any> => {
    socketService.startGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const makeMove = ({ gameNumber, move }: { gameNumber: number, move: string }) =>
  async (dispatch: Dispatch): Promise<any> => {
    socketService.makeMove({ gameNumber, move });

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const sendMessage = ({ gameId, message }: { gameId: string, message: string }) =>
  async (dispatch: Dispatch): Promise<void> => {
    socketService.sendMessage({ gameId, message });
  };

export const newGame = (gameName: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    socketService.newGame(gameName);
  };

export const refreshToken = (newToken: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    localStorage.setItem('token', newToken);
    socketService.reconnect();
    dispatch(push('/games'));
  };
