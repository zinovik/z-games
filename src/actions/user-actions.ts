import { Dispatch, AnyAction } from 'redux';
import { push } from 'connected-react-router';

import { SocketService, registerUser, authorizeUser, activateUser, fetchUsersRating } from '../services';
import { IFilterSettings } from '../interfaces';
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
  (dispatch: Dispatch): AnyAction => {
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
  (dispatch: Dispatch): AnyAction => {
    socketService.joinGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const openGame = (gameNumber: number) =>
  (dispatch: Dispatch): AnyAction => {
    socketService.openGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const watchGame = (gameNumber: number) =>
  (dispatch: Dispatch): AnyAction => {
    socketService.watchGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const leaveGame = (gameNumber: number) =>
  (dispatch: Dispatch): AnyAction => {
    socketService.leaveGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const closeGame = () =>
  (dispatch: Dispatch): AnyAction => {
    socketService.closeGame();

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const readyToGame = () =>
  (dispatch: Dispatch): AnyAction => {
    socketService.readyToGame();

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const startGame = (gameNumber: number) =>
  (dispatch: Dispatch): AnyAction => {
    socketService.startGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const makeMove = ({ gameNumber, move }: { gameNumber: number, move: string }) =>
  (dispatch: Dispatch): AnyAction => {
    socketService.makeMove({ gameNumber, move });

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const sendMessage = ({ gameId, message }: { gameId: string, message: string }) =>
  (dispatch: Dispatch): void => {
    socketService.sendMessage({ gameId, message });
  };

export const newGame = (gameName: string) =>
  (dispatch: Dispatch): AnyAction => {
    socketService.newGame(gameName);

    return dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      message: `New ${gameName} game was successfully created`,
    });
  };

export const refreshToken = (newToken: string) =>
  (dispatch: Dispatch): AnyAction => {
    localStorage.setItem('token', newToken);
    socketService.reconnect();

    dispatch(push('/games'));

    return dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      message: 'You have successfully logged in!',
    });
  };

export const removeError = (errorId: number) =>
  (dispatch: Dispatch): AnyAction => {
    return dispatch({
      type: ActionTypes.REMOVE_ERROR,
      errorId,
    });
  };

export const removeNotification = (notificationId: number) =>
  (dispatch: Dispatch): AnyAction => {
    return dispatch({
      type: ActionTypes.REMOVE_NOTIFICATION,
      notificationId,
    });
  };

export const updateServerUrl = (serverUrl: string) =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: ActionTypes.UPDATE_SERVER_URL,
      serverUrl,
    });

    socketService.connectToTheServer(serverUrl, dispatch);
  };

export const reloadGames = (filterSettings: IFilterSettings) =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: ActionTypes.RELOAD_GAMES,
      filterSettings,
    });

    socketService.getAllGames(filterSettings);
  };

export const removeGameUser = (gameNumber: number) =>
  (dispatch: Dispatch): AnyAction => {
    socketService.removeGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const repeatGame = (gameNumber: number) =>
  (dispatch: Dispatch): AnyAction => {
    socketService.repeatGame(gameNumber);

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };

export const updateOption = ({ gameNumber, name, value }: { gameNumber: number, name: string, value: string }) =>
  (dispatch: Dispatch): AnyAction => {
    socketService.updateOption({ gameNumber, name, value });

    return dispatch({
      type: ActionTypes.UPDATE_IS_BUTTONS_DISABLED,
      isButtonsDisabled: true,
    });
  };
