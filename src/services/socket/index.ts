import io, { Socket } from 'socket.io-client';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';

import {
  updateStatus as updateStatusWithoutDispatch,
  updateCurrentUser as updateCurrentUserWithoutDispatch,
  updateUsersOnline as updateUsersOnlineWithoutDispatch,
  updateAllGames as updateAllGamesWithoutDispatch,
  updateOpenGame as updateOpenGameWithoutDispatch,
  addNewGame as addNewGameWithoutDispatch,
  updateGame as updateGameWithoutDispatch,
  addNewLog as addNewLogWithoutDispatch,
  setNewToken as setNewTokenWithoutDispatch,
  addError as addErrorWithoutDispatch,
} from '../../actions';
import { IGame, IUser, IUsersOnline, ILog, IFilterSettings } from '../../interfaces';
import { SERVER_URL } from '../../config';

export class SocketService {

  private static instance: SocketService;
  private SocketClient: (typeof Socket) & { query: { token: string } };

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  constructor() {
    this.connectToTheServer(SERVER_URL);

    setInterval(() => {
      this.reconnect();
    }, 1000 * 60 * 60 * 24 * 7);
  }

  connectToTheServer = (serverUrl: string, dispatch?: Dispatch) => {
    const token = localStorage.getItem('token');

    this.SocketClient = io(serverUrl, {
      query: { token },
    }) as (typeof Socket) & { query: { token: string } };

    if (dispatch) {
      this.provideDispatch(dispatch);
    }
  };

  provideDispatch = async (dispatch: Dispatch) => {
    const updateStatus = bindActionCreators(updateStatusWithoutDispatch, dispatch);
    const updateCurrentUser = bindActionCreators(updateCurrentUserWithoutDispatch, dispatch);
    const updateUsersOnline = bindActionCreators(updateUsersOnlineWithoutDispatch, dispatch);
    const updateAllGames = bindActionCreators(updateAllGamesWithoutDispatch, dispatch);
    const updateOpenGame = bindActionCreators(updateOpenGameWithoutDispatch, dispatch);
    const addNewGame = bindActionCreators(addNewGameWithoutDispatch, dispatch);
    const updateGame = bindActionCreators(updateGameWithoutDispatch, dispatch);
    const addNewLog = bindActionCreators(addNewLogWithoutDispatch, dispatch);
    const setNewToken = bindActionCreators(setNewTokenWithoutDispatch, dispatch);
    const addError = bindActionCreators(addErrorWithoutDispatch, dispatch);

    // updates from the server

    this.SocketClient.on('connect_error', (): void => {
      updateStatus(false);
    });

    this.SocketClient.on('connect', (): void => {
      updateStatus(true);

      this.SocketClient.emit('get-all-games', {});
      this.SocketClient.emit('get-current-user');
      this.SocketClient.emit('get-opened-game');
    });

    this.SocketClient.on('update-current-user', (currentUser: IUser): void => {
      updateCurrentUser(currentUser);
      this.SocketClient.emit('get-users-online');
    });

    this.SocketClient.on('update-users-online', (usersOnline: IUsersOnline): void => {
      updateUsersOnline(usersOnline);
    });

    this.SocketClient.on('all-games', (allGames: IGame[]): void => {
      updateAllGames(allGames);
    });

    this.SocketClient.on('new-game', (newGame: IGame): void => {
      addNewGame(newGame);
    });

    this.SocketClient.on('update-game', (game: IGame): void => {
      updateGame(game);
    });

    this.SocketClient.on('update-opened-game', (openGame: IGame): void => {
      updateOpenGame(openGame);
    });

    this.SocketClient.on('new-log', (newLog: ILog): void => {
      addNewLog(newLog);
    });

    this.SocketClient.on('new-token', (newToken: string): void => {
      setNewToken(newToken);
    });

    this.SocketClient.on('error-message', ({ message }: { message: string }): void => {
      addError(message);
    });
  }


  // updates from the user

  public getAllGames(filterSettings: IFilterSettings) {
    this.SocketClient.emit('get-all-games', filterSettings);
  }

  public joinGame(gameNumber: number) {
    this.SocketClient.emit('join-game', gameNumber);
  }

  public openGame(gameNumber: number) {
    this.SocketClient.emit('open-game', gameNumber);
  }

  public watchGame(gameNumber: number) {
    this.SocketClient.emit('watch-game', gameNumber);
  }

  public leaveGame(gameNumber: number) {
    this.SocketClient.emit('leave-game', gameNumber);
  }

  public closeGame(gameNumber: number) {
    this.SocketClient.emit('close-game', gameNumber);
  }

  public readyToGame(gameNumber: number) {
    this.SocketClient.emit('toggle-ready', gameNumber);
  }

  public startGame(gameNumber: number) {
    this.SocketClient.emit('start-game', gameNumber);
  }

  public makeMove({ gameNumber, move }: { gameNumber: number, move: string }) {
    this.SocketClient.emit('make-move', { gameNumber, move });
  }

  public sendMessage({ gameId, message }: { gameId: string, message: string }) {
    this.SocketClient.emit('message', { gameId, message });
  }

  public newGame(gameName: string) {
    this.SocketClient.emit('new-game', gameName);
  }

  public removeGame(gameNumber: number) {
    this.SocketClient.emit('remove-game', gameNumber);
  }

  public repeatGame(gameNumber: number) {
    this.SocketClient.emit('repeat-game', gameNumber);
  }

  public updateOption({ gameNumber, name, value }: { gameNumber: number, name: string, value: string }) {
    this.SocketClient.emit('update-option', { gameNumber, name, value });
  }


  public reconnect = (): void => {
    const token = localStorage.getItem('token') || '';

    this.SocketClient.query.token = token;
    this.SocketClient.disconnect();
    this.SocketClient.connect();
  };

}
