import io, { Socket } from 'socket.io-client';
import { Store } from 'redux';
import { SERVER_URL } from '../../config';
import { push } from 'connected-react-router';

import {
  updateStatus,
  updateCurrentUser,
  updateUsersOnline,
  updateAllGames,
  updateOpenGame,
  addNewGame,
  updateGame,
  addNewLog,
} from '../../actions';
import { IGame, IUser, IUsersOnline, ILog } from '../../interfaces';

export class ZGamesApi {
  private static instance: ZGamesApi;

  public socket: (typeof Socket) & { query: { token: string } };

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  setStore = async (store: Store) => {
    const token = localStorage.getItem('token');

    this.socket = io(SERVER_URL, {
      query: { token },
    }) as (typeof Socket) & { query: { token: string } };

    // updates from the server
    this.socket.on('connect_error', (): void => {

      store.dispatch(updateStatus(false));
    });

    this.socket.on('connect', (): void => {
      store.dispatch(updateStatus(true));

      this.socket.emit('get-all-games', { ignoreNotStarted: false, ignoreStarted: false, ignoreFinished: false });
      this.socket.emit('get-current-user');
      this.socket.emit('get-users-online');
      this.socket.emit('get-opened-game');
    });


    this.socket.on('update-current-user', (currentUser: IUser): void => {
      store.dispatch(updateCurrentUser(currentUser));
    });

    this.socket.on('update-users-online', (usersOnline: IUsersOnline): void => {
      store.dispatch(updateUsersOnline(usersOnline));
    });


    this.socket.on('all-games', (allGames: IGame[]): void => {
      store.dispatch(updateAllGames(allGames));
    });

    this.socket.on('new-game', (newGame: IGame): void => {
      store.dispatch(addNewGame(newGame));
    });

    this.socket.on('update-game', (game: IGame): void => {
      store.dispatch(updateGame(game));
    });

    this.socket.on('update-opened-game', (openGame: IGame): void => {
      const oldOpenGame = store.getState().games.openGame;

      store.dispatch(updateOpenGame(openGame));

      if (openGame !== oldOpenGame) {
        const gameNumber = openGame && openGame.number;

        if (gameNumber === undefined || gameNumber === null) {
          store.dispatch(push('/games'));
          return;
        }

        store.dispatch(push(`/game/${gameNumber}`));
      }
    });

    this.socket.on('new-log', (newLog: ILog): void => {
      store.dispatch(addNewLog(newLog));
    });

    this.socket.on('new-token', (newToken: string): void => {
      localStorage.setItem('token', newToken);
    });

    this.socket.on('error-message', ({ message }: { message: string }): void => {
      alert(message);
    });
  }

  updateToken = (): void => {
    const token = localStorage.getItem('token') || '';

    this.socket.query.token = token;
    this.socket.disconnect();
    this.socket.connect();
  };

}
