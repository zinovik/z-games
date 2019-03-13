import io, { Socket } from 'socket.io-client';
import { Store } from 'redux';

import {
  updateStatus,
  updateCurrentUser,
  updateUsersOnline,
  updateAllGames,
  updateOpenGame,
  addNewGame,
  updateGame,
  addNewLog,
  addServerUrl,
} from '../../actions';
import * as types from '../../constants';

export interface IHistory {
  push: (path: string) => void;
}

export class ZGamesApi {
  private static instance: ZGamesApi;

  private socket: (typeof Socket) & { query: { token: string } };
  private store: Store;
  private history: IHistory;

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  setStore = async (store: Store) => {
    const token = localStorage.getItem('token');

    const SERVER_URL = ((window as any).envs && (window as any).envs.SERVER_URL);

    if (SERVER_URL) {
      store.dispatch(addServerUrl(SERVER_URL));
    }

    const serverUrl = store.getState().server.serverUrl;

    this.socket = io(serverUrl, {
      query: { token },
    }) as (typeof Socket) & { query: { token: string } };

    this.store = store;

    // updates from the server
    this.socket.on('connect_error', (): void => {
      console.log(`socket.on('connect_error')`);
      store.dispatch(updateStatus(false));
    });

    this.socket.on('connect', (): void => {
      console.log(`socket.on('connect')`);
      store.dispatch(updateStatus(true));

      this.socket.emit('get-all-games', { ignoreNotStarted: false, ignoreStarted: false, ignoreFinished: false });
      this.socket.emit('get-current-user');
      this.socket.emit('get-users-online');
      this.socket.emit('get-opened-game');
    });


    this.socket.on('update-current-user', (currentUser: types.IUser): void => {
      console.log(`socket.on('update-current-user'): `, currentUser);
      store.dispatch(updateCurrentUser(currentUser));
    });

    this.socket.on('update-users-online', (usersOnline: types.IUser[]): void => {
      console.log(`socket.on('update-users-online'): `, usersOnline);
      store.dispatch(updateUsersOnline(usersOnline));
    });


    this.socket.on('all-games', (allGames: types.IGame[]): void => {
      console.log(`socket.on('all-games'): `, allGames);
      store.dispatch(updateAllGames(allGames));
    });

    this.socket.on('new-game', (newGame: types.IGame): void => {
      console.log(`socket.on('new-game'): `, newGame);
      store.dispatch(addNewGame(newGame));
    });

    this.socket.on('update-game', (game: types.IGame): void => {
      console.log(`socket.on('update-game'): `, game);
      store.dispatch(updateGame(game));
    });

    this.socket.on('update-opened-game', (openGame: types.IGame): void => {
      console.log(`socket.on('update-opened-game'): `, openGame);

      const oldOpenGame = this.store.getState().games.openGame;

      store.dispatch(updateOpenGame(openGame));

      if (openGame !== oldOpenGame) {
        this.updateRoute(openGame && openGame.number);
      }
    });

    this.socket.on('new-log', (newLog: types.ILog): void => {
      console.log(`socket.on('new-log'): `, newLog);
      store.dispatch(addNewLog(newLog));
    });

    this.socket.on('new-token', (newToken: string): void => {
      console.log(`socket.on('new-token'): `, newToken);
      localStorage.setItem('token', newToken);
    });

    this.socket.on('error-message', ({ message }: { message: string }): void => {
      console.log(`socket.on('error-message'): `, message);
      alert(message);
    });
  }

  setHistory = (history: IHistory) => {
    this.history = history;
  };

  // Accounts
  register = async (username: string, password: string, email: string): Promise<types.IUser> => {
    const serverUrl = this.store.getState().server.serverUrl;

    const fetchResult = await fetch(`${serverUrl}/api/users/register`, {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
        email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const parsedResult = await fetchResult.json();

    if (parsedResult !== 'error') { // TODO: Error
      alert(parsedResult);
    } else {
      alert('Error, try another username');
    }

    return parsedResult;
  };

  login = async (username: string, password: string): Promise<types.IUser> => {
    const serverUrl = this.store.getState().server.serverUrl;

    const fetchResult = await fetch(`${serverUrl}/api/users/authorize`, {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const token = fetchResult.headers.get('Authorization');
    const currentUser = await fetchResult.json();

    if (token) {
      this.setToken(token);

      this.store.dispatch(updateCurrentUser(currentUser));
    }

    return currentUser;
  };

  logout = (): void => {
    this.socket.emit('logout');
  };

  getUsers = async (): Promise<types.IUser[]> => {
    const serverUrl = this.store.getState().server.serverUrl;

    const fetchResult = await fetch(`${serverUrl}/api/users`);

    const parsedResult = await fetchResult.json();

    return parsedResult;
  };

  joinGame = (gameNumber: number): void => {
    this.socket.emit('join-game', gameNumber);
  };

  openGame = (gameNumber: number): void => {
    this.socket.emit('open-game', gameNumber);
  };

  watchGame = (gameNumber: number): void => {
    this.socket.emit('watch-game', gameNumber);
  };

  leaveGame = (gameNumber: number): void => {
    this.socket.emit('leave-game', gameNumber);
  };

  closeGame = (gameNumber: number): void => {
    this.socket.emit('close-game', gameNumber);
  };


  readyToGame = (gameNumber: number): void => {
    this.socket.emit('toggle-ready', gameNumber);
  };

  startGame = (gameNumber: number): void => {
    this.socket.emit('start-game', gameNumber);
  };

  makeMove = ({ gameNumber, move }: { gameNumber: number, move: string }): void => {
    this.socket.emit('make-move', { gameNumber, move });
  };

  message = ({ gameId, message }: { gameId: string, message: string }): void => {
    this.socket.emit('message', { gameId, message });
  };

  newGame = (gameName: string): void => {
    this.socket.emit('new-game', gameName);
  };


  setToken = (token: string): void => {
    localStorage.setItem('token', token);
    this.socket.query.token = token;

    this.history.push('/home');

    this.socket.disconnect();
    this.socket.connect();
  }

  updateRoute = (gameNumber?: number): void => {
    if (gameNumber === undefined || gameNumber === null) {
      return this.history.push('/games');
    }

    return this.history.push(`/game/${gameNumber}`);
  };
}
