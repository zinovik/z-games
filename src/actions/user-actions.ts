import { Dispatch, AnyAction } from 'redux';
import { push } from 'connected-react-router';

import { SocketService, registerUser, authorizeUser, activateUser, fetchUsersRating } from '../services';
import * as ActionTypes from './action-types';

const socketService = SocketService.Instance;

// Users

export const register = (serverUrl: string, username: string, password: string, email: string) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    try {
      await registerUser(serverUrl, username, password, email);
    } catch (error) {
      return dispatch({
        type: ActionTypes.ADD_ERROR,
        message: error.message,
      });
    }

    dispatch(push('/games'));

    return dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      message: 'You have successfully registered! Check email to activate your account',
    });
  };

export const authorize = (serverUrl: string, username: string, password: string) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    let token = '';

    try {
      ({ token } = await authorizeUser(serverUrl, username, password));
    } catch (error) {
      return dispatch({
        type: ActionTypes.ADD_ERROR,
        message: error.message,
      });
    }

    localStorage.setItem('token', token);
    socketService.reconnect();

    dispatch(push('/games'));

    return dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      message: 'You have successfully logged in!',
    });
  };

export const activate = (serverUrl: string, activationToken: string) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    let token = '';

    try {
      ({ token } = await activateUser(serverUrl, activationToken));
    } catch (error) {
      return dispatch({
        type: ActionTypes.ADD_ERROR,
        message: error.message,
      });
    } finally {
      dispatch(push('/games'));
    }

    localStorage.setItem('token', token);
    socketService.reconnect();

    return dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      message: 'User has been successfully activated!',
    });
  };

export const fetchRating = (serverUrl: string) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    const users = await fetchUsersRating(serverUrl);

    return dispatch({
      type: ActionTypes.FETCH_RATING,
      users,
    });
  };

export const logout = () =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    localStorage.setItem('token', '');
    socketService.reconnect();

    dispatch({
      type: ActionTypes.UPDATE_CURRENT_USER,
      currentUser: null,
    });

    return dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      message: 'You have successfully logged out!',
    });
  };

// Games

export const joinGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    socketService.joinGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const openGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    socketService.openGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const watchGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    socketService.watchGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const leaveGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    socketService.leaveGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const closeGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    socketService.closeGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const readyToGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    socketService.readyToGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const startGame = (gameNumber: number) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    socketService.startGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const makeMove = ({ gameNumber, move }: { gameNumber: number, move: string }) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
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
  async (dispatch: Dispatch): Promise<AnyAction> => {
    socketService.newGame(gameName);

    return dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      message: `New ${gameName} game was successfully created`,
    });
  };

export const refreshToken = (newToken: string) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    localStorage.setItem('token', newToken);
    socketService.reconnect();

    dispatch(push('/games'));

    return dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      message: 'You have successfully logged in!',
    });
  };

export const removeError = (errorId: number) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    return dispatch({
      type: ActionTypes.REMOVE_ERROR,
      errorId,
    });
  };

export const removeNotification = (notificationId: number) =>
  async (dispatch: Dispatch): Promise<AnyAction> => {
    return dispatch({
      type: ActionTypes.REMOVE_NOTIFICATION,
      notificationId,
    });
  };

export const updateServerUrl = (serverUrl: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch({
      type: ActionTypes.UPDATE_SERVER_URL,
      serverUrl,
    });

    socketService.connectToTheServer(serverUrl, dispatch);
  };
