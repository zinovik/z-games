import io, { Socket } from 'socket.io-client';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';

import { initialState } from '../../reducers/games';
import {
  updateStatus as updateStatusWithoutDispatch,
  updateCurrentUser as updateCurrentUserWithoutDispatch,
  updateUsersOnline as updateUsersOnlineWithoutDispatch,
  updateAllGames as updateAllGamesWithoutDispatch,
  updateOpenGame as updateOpenGameWithoutDispatch,
  addNewGame as addNewGameWithoutDispatch,
  updateGame as updateGameWithoutDispatch,
  removeGameServer as removeGameWithoutDispatch,
  addNewLog as addNewLogWithoutDispatch,
  setNewToken as setNewTokenWithoutDispatch,
  addError as addErrorWithoutDispatch,
  updateInvite as updateInviteWithoutDispatch,
  addInvite as addInviteWithoutDispatch,
} from '../../actions';
import { IGame, IUser, IUsersOnline, ILog, IFilterSettings, IInvite } from '../../interfaces';
import { SERVER_URL } from '../../config';

export class SocketService {
  private static instance: SocketService;
  private SocketClient: (typeof Socket) & { query: { token: string } };

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  constructor() {
    const token = localStorage.getItem('token');

    this.SocketClient = io(SERVER_URL, {
      query: { token },
    }) as (typeof Socket) & { query: { token: string } };
    // this.connectToTheServer(SERVER_URL);

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
    const removeGame = bindActionCreators(removeGameWithoutDispatch, dispatch);
    const addNewLog = bindActionCreators(addNewLogWithoutDispatch, dispatch);
    const setNewToken = bindActionCreators(setNewTokenWithoutDispatch, dispatch);
    const addError = bindActionCreators(addErrorWithoutDispatch, dispatch);
    const addInvite = bindActionCreators(addInviteWithoutDispatch, dispatch);
    const updateInvite = bindActionCreators(updateInviteWithoutDispatch, dispatch);

    // updates from the server

    this.SocketClient.on('connect_error', (): void => {
      updateStatus(false);
    });

    this.SocketClient.on('connect', (): void => {
      updateStatus(true);

      this.SocketClient.emit('get-all-games', initialState.filterSettings);
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

    this.SocketClient.on('remove-game', (gameId: string): void => {
      removeGame(gameId);
    });

    this.SocketClient.on('update-opened-game', (openGame: IGame): void => {
      updateOpenGame(openGame);
    });

    this.SocketClient.on('new-log', (newLog: ILog): void => {
      addNewLog(newLog);
    });

    this.SocketClient.on('new-invite', (invite: IInvite) => {
      addInvite(invite);
    });

    this.SocketClient.on('update-invite', (invite: IInvite) => {
      updateInvite(invite);
    });

    this.SocketClient.on('new-token', (newToken: string): void => {
      setNewToken(newToken);
    });

    this.SocketClient.on('error-message', ({ message }: { message: string }): void => {
      addError(message);
    });
  };

  // updates from the user

  public getAllGames(filterSettings: IFilterSettings) {
    this.SocketClient.emit('get-all-games', filterSettings);
  }

  public joinGame(gameId: string) {
    this.SocketClient.emit('join-game', gameId);
  }

  public openGame(gameId: string) {
    this.SocketClient.emit('open-game', gameId);
  }

  public watchGame(gameId: string) {
    this.SocketClient.emit('watch-game', gameId);
  }

  public leaveGame(gameId: string) {
    this.SocketClient.emit('leave-game', gameId);
  }

  public closeGame() {
    this.SocketClient.emit('close-game');
  }

  public startGame(gameId: string) {
    this.SocketClient.emit('start-game', gameId);
  }

  public makeMove({ gameId, move }: { gameId: string; move: string }) {
    this.SocketClient.emit('make-move', { gameId, move });
  }

  public sendMessage({ gameId, message }: { gameId: string; message: string }) {
    this.SocketClient.emit('message', { gameId, message });
  }

  public newGame({ name, isPrivate }: { name: string; isPrivate: boolean }) {
    this.SocketClient.emit('new-game', { name, isPrivate });
  }

  public removeGame(gameId: string) {
    this.SocketClient.emit('remove-game', gameId);
  }

  public repeatGame(gameId: string) {
    this.SocketClient.emit('repeat-game', gameId);
  }

  public updateOption({ gameId, name, value }: { gameId: string; name: string; value: string }) {
    this.SocketClient.emit('update-option', { gameId, name, value });
  }

  public acceptInvite(inviteId: string) {
    this.SocketClient.emit('accept-invite', inviteId);
  }

  public declineInvite(inviteId: string) {
    this.SocketClient.emit('decline-invite', inviteId);
  }

  public newInvite({ gameId, userId }: { gameId: string; userId: string }) {
    this.SocketClient.emit('new-invite', { gameId, userId });
  }

  public reconnect = (): void => {
    const token = localStorage.getItem('token') || '';

    this.SocketClient.query.token = token;
    this.SocketClient.disconnect();
    this.SocketClient.connect();
  };
}
