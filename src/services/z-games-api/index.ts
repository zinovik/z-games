import * as io from 'socket.io-client';

import {
  updateStatus,
  updateCurrentUser,
  updateAllGames,
  updateOpenGame,
  addNewGame,
  updateGame,
  addNewLog,
} from '../../actions';
import * as types from '../../constants';

const SERVER_URL = ((window as any).envs && (window as any).envs.SERVER_URL) || 'http://localhost:4000';
export class ZGamesApi {
  private static instance: ZGamesApi;

  private socket;
  private store;
  private history;

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  setStore = async store => {

    const token = localStorage.getItem('token');

    this.socket = io(SERVER_URL, {
      query: { token },
    });

    this.store = store;

    // updates from the server
    this.socket.on('connect_error', (): void => {
      console.log(`socket.on('connect_error')`);
      store.dispatch(updateStatus(false));
    });

    this.socket.on('connect', (): void => {
      console.log(`socket.on('connect')`);
      store.dispatch(updateStatus(true));

      this.socket.emit('get-all-games');
      this.socket.emit('get-current-user');
      this.socket.emit('get-opened-game');
    });


    this.socket.on('update-current-user', (currentUser: types.User): void => {
      console.log(`socket.on('update-current-user'): `, currentUser);
      store.dispatch(updateCurrentUser(currentUser));
    });


    this.socket.on('all-games', (allGames: types.Game[]): void => {
      console.log(`socket.on('all-games'): `, allGames);
      store.dispatch(updateAllGames(allGames));
    });

    this.socket.on('new-game', (newGame: types.Game): void => {
      console.log(`socket.on('new-game'): `, newGame);
      store.dispatch(addNewGame(newGame));
    });

    this.socket.on('update-game', (game: types.Game): void => {
      console.log(`socket.on('update-game'): `, game);
      store.dispatch(updateGame(game));
    });

    this.socket.on('update-opened-game', (openGame: types.Game): void => {
      console.log(`socket.on('update-opened-game'): `, openGame);

      const oldOpenGame = this.store.getState().games.openGame;

      store.dispatch(updateOpenGame(openGame));

      if (openGame !== oldOpenGame) {
        this.updateRoute(openGame && openGame.number);
      }
    });

    this.socket.on('new-log', (newLog: types.Log): void => {
      console.log(`socket.on('new-log'): `, newLog);
      store.dispatch(addNewLog(newLog));
    });

    this.socket.on('error-message', (message: string): void => {
      console.log(`socket.on('error-message'): `, message);
      alert(message);
    });
  }

  setHistory = history => {
    this.history = history;
  }

  // Accounts
  register = async (username: string, password: string): Promise<any> => {
    const fetchResult = await fetch(`${SERVER_URL}/api/users/register`, {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const parseResult = await fetchResult.json();

    return parseResult;
  };

  login = async (username: string, password: string): Promise<any> => {
    const fetchResult = await fetch(`${SERVER_URL}/api/users/authorize`, {
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
      localStorage.setItem('token', token);
      this.setToken(token);

      this.store.dispatch(updateCurrentUser(currentUser));
    }

    return currentUser;
  };

  logout = (): void => {
    localStorage.setItem('token', '');
    this.setToken('');

    this.socket.emit('logout');
  };


  joinGame = (gameNumber: number): void => {
    this.socket.emit('join-game', gameNumber);
  }

  openGame = (gameNumber: number): void => {
    this.socket.emit('open-game', gameNumber);
  }

  watchGame = (gameNumber: number): void => {
    this.socket.emit('watch-game', gameNumber);
  }

  leaveGame = (gameNumber: number): void => {
    this.socket.emit('leave-game', gameNumber);
  }

  closeGame = (gameNumber: number): void => {
    this.socket.emit('close-game', gameNumber);
  }


  readyToGame = (gameNumber: number): void => {
    this.socket.emit('toggle-ready', gameNumber);
  }

  startGame = (gameNumber: number): void => {
    this.socket.emit('start-game', gameNumber);
  }

  makeMove = (move: string): void => {
    this.socket.emit('make-move', move);
  }

  message = (message: string): void => {
    this.socket.emit('message', message);
  }

  newGame = (gameName: string): void => {
    this.socket.emit('new-game', gameName);
  }


  setToken = (token: string): void => {
    this.socket.query.token = token;
    this.socket.disconnect();
    this.socket.connect();
  }

  updateRoute(gameNumber?: number) {
    if (gameNumber === undefined) {
      return this.history.push('/games');
    }

    return this.history.push(`/game/${gameNumber}`);
  }

}
