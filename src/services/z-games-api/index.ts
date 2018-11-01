import * as io from 'socket.io-client';

import { updateStatus, setCurrentUsername } from '../../actions';

const SERVER_URL = 'https://z-games-api-dev.herokuapp.com';

// const GAMES_IMAGES: any = {
//   'No, Thanks!': `${SERVER_URL}/images/No,%20Thanks!.png`,
//   'Perudo': `${SERVER_URL}/images/Perudo.png`,
// };
// const CHIP: string = '\u2B24';
// const DICES: string[] = [
//   '\u2680',
//   '\u2681',
//   '\u2682',
//   '\u2683',
//   '\u2684',
//   '\u2685',
// ];

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

    this.socket.on('connect_error', () => {
      console.log(`socket.on('connect_error')`);
      this.store.dispatch(updateStatus(false));
    });

    this.socket.on('connect', () => {
      console.log(`socket.on('connect')`);
      this.store.dispatch(updateStatus(true));
    });

    this.socket.on('updateCurrentUsername', username => {
      console.log(`socket.on('updateCurrentUsername') - username: ${username}`);
      this.store.dispatch(setCurrentUsername(username));
      // this.updateOpenGameNumber();
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
}
// add subscrivers to resux to emit socket.io!!!!




// allGamesInfo: any = new BehaviorSubject<any>([]);
// openGameInfo: any = new BehaviorSubject<any>({});
// usersOnline: any = new BehaviorSubject<any>([]);
// openGameNumber: any = new BehaviorSubject<any>(null);
// openGame: any = new BehaviorSubject<any>(null);


// // updates from the server

// this.socket.on('updateAllGamesInfo', (allGamesInfo) => {
//   console.log(`socket.on('updateAllGamesInfo') - allGamesInfo: `, allGamesInfo);
//   if ((this.openGameNumber.value || this.openGameNumber.value === 0)
//     && this.allGamesInfo.value
//     && this.allGamesInfo.value[this.openGameNumber.value]) {
//     allGamesInfo[this.openGameNumber.value] = this.allGamesInfo.value[this.openGameNumber.value];
//   }
//   this.allGamesInfo.next(allGamesInfo);
//   this.updateGame();
// });

// this.socket.on('updateOpenGameInfo', (game) => {
//   console.log(`socket.on('updateOpenGameInfo') - game: `, game);
//   const allGamesInfo = this.allGamesInfo.value ? this.allGamesInfo.value : [];
//   if (this.openGameNumber.value || this.openGameNumber.value === 0) {
//     allGamesInfo[this.openGameNumber.value] = game;
//     this.allGamesInfo.next(allGamesInfo);
//   }
//   this.updateGame();
// });

// this.socket.on('updateUsersOnline', (usersOnline) => {
//   console.log(`socket.on('updateUsersOnline') - usersOnline: `, usersOnline);
//   this.usersOnline.next(usersOnline);
//   this.updateOpenGameNumber();
// });
//   }

// updateOpenGameNumber(): any {
//   for (let i = 0; i < this.usersOnline.value.length; i++) {
//     if (this.usersOnline.value[i].username === this.currentUsername.value) {
//       this.openGameNumber.next(this.usersOnline.value[i].openGameNumber);
//     }
//   }
//   this.updateGame();
// }

// updateGame() {
//   this.openGame.next(this.allGamesInfo.value[this.openGameNumber.value]);
// }
