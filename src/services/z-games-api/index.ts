import * as io from 'socket.io-client';

import {
  updateStatus,
  setCurrentUsername,
  updateUsersOnline,
  updateAllGamesInfo,
  updateOpenGameInfo,
  updateOpenGameNumber,
} from '../../actions';
import * as types from '../../constants';

const SERVER_URL = 'https://z-games-api-dev.herokuapp.com';

export const GAMES_IMAGES: any = {
  'No, Thanks!': `${SERVER_URL}/images/No,%20Thanks!.png`,
  'Perudo': `${SERVER_URL}/images/Perudo.png`,
};
export const CHIP: string = '\u2B24';
export const DICES: string[] = [
  '\u2680',
  '\u2681',
  '\u2682',
  '\u2683',
  '\u2684',
  '\u2685',
];

export class ZGamesApi {
  private static _instance: ZGamesApi;
  private socket;
  private store;

  private constructor() {
    this.socket = io(SERVER_URL);
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  addStore = store => {
    this.store = store;

    this.socket.emit('getCurrentUsername');
    this.socket.emit('getAllGamesInfo');
    this.socket.emit('getUsersOnline');
    this.socket.emit('getOpenGameInfo');

    // updates from the server
    this.socket.on('connect_error', () => {
      console.log(`socket.on('connect_error')`);
      this.store.dispatch(updateStatus(false));
    });

    this.socket.on('connect', () => {
      console.log(`socket.on('connect')`);
      this.store.dispatch(updateStatus(true));
    });

    this.socket.on('updateCurrentUsername', (currentUsername: string): void => {
      console.log(`socket.on('updateCurrentUsername'): ${currentUsername}`);
      this.store.dispatch(setCurrentUsername(currentUsername));
      this.updateOpenGameNumber();
    });

    this.socket.on('updateUsersOnline', (usersOnline: types.UserOnline[]): void => {
      console.log(`socket.on('updateUsersOnline'): `, usersOnline);
      this.store.dispatch(updateUsersOnline(usersOnline))
      this.updateOpenGameNumber();
    });

    this.socket.on('updateAllGamesInfo', (allGames: types.Game[]): void => {
      console.log(`socket.on('updateAllGamesInfo'): `, allGames);
      this.store.dispatch(updateAllGamesInfo(allGames));
    });

    this.socket.on('updateOpenGameInfo', (openGameInfo: types.GameInfo): void => {
      console.log(`socket.on('updateOpenGameInfo'): `, openGameInfo);
      this.store.dispatch(updateOpenGameInfo(openGameInfo));
    });
  }

  // Accounts
  register = (username: string, password: string): void => {
    this.socket.emit('register', username, password);
  };

  login = (username: string, password: string): void => {
    this.socket.emit('authorize', username, password);
  };

  logout = (): void => {
    this.socket.emit('logout');
  };


  joinGame = (gameNumber: number): void => {
    this.socket.emit('joingame', gameNumber);
  }

  leaveGame = (): void => {
    this.socket.emit('leavegame');
  }

  readyToGame = (): void => {
    this.socket.emit('readytogame');
  }

  startGame = (): void => {
    this.socket.emit('startgame');
  }

  move = (move: any): void => {
    this.socket.emit('move', move);
  }

  message = (message: string): void => {
    this.socket.emit('message', message);
  }

  newGame = (gameName: string): void => {
    this.socket.emit('newgame', gameName);
  }

  updateOpenGameNumber = (): void => {
    const { currentUsername, usersOnline } = this.store.getState().users;

    usersOnline.forEach((userOnline) => {
      if (userOnline.username === currentUsername) {
        this.store.dispatch(updateOpenGameNumber(userOnline.openGameNumber));
      }
    });
  };
}
