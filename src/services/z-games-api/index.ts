import * as io from 'socket.io-client';

import { updateStatus } from '../../actions';

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

let store;

export const addStore = storeToAdd => {
  store = storeToAdd;
}

const socket = io(SERVER_URL);

socket.on('connect_error', () => {
  console.log(`socket.on('connect_error')`);

  store.dispatch(updateStatus(false));
});

socket.on('connect', () => {
  console.log(`socket.on('connect')`);

  store.dispatch(updateStatus(true));
});

// Accounts
export const register = (username: string, password: string): void => {
  socket.emit('register', username, password);
};

export const login = (username: string, password: string): void => {
  socket.emit('authorize', username, password);
};

export const logout = (): void => {
  socket.emit('logout');
};

// add subscrivers to resux to emit socket.io!!!!




// import { connect } from 'react-redux';
// import { updateStatus } from '../../actions';


//   // connected: any = new BehaviorSubject<any>(null);

//   // currentUsername: any = new BehaviorSubject<any>(null);
//   // allGamesInfo: any = new BehaviorSubject<any>([]);
//   // openGameInfo: any = new BehaviorSubject<any>({});
//   // usersOnline: any = new BehaviorSubject<any>([]);
//   // openGameNumber: any = new BehaviorSubject<any>(null);
//   // openGame: any = new BehaviorSubject<any>(null);


//     // props.dispatch(updateStatus(true));

//     this.socket.emit('getCurrentUsername');
//     this.socket.emit('getAllGamesInfo');
//     this.socket.emit('getUsersOnline');
//     this.socket.emit('getOpenGameInfo');

//     this.socket.on('connect_error', () => {
//       console.log(`socket.on('connect_error')`);
//       // this.connected.next(false);
//     });

//     this.socket.on('connect', () => {
//       console.log(`socket.on('connect')`);
//       // this.connected.next(true);
//     });

//     //   // updates from the server
//     this.socket.on('updateCurrentUsername', (username) => {
//       console.log(`socket.on('updateCurrentUsername') - username: ${username}`);
//       // this.currentUsername.next(username);
//       // this.updateOpenGameNumber();
//     });

//     //   this.socket.on('updateAllGamesInfo', (allGamesInfo) => {
//     //     console.log(`socket.on('updateAllGamesInfo') - allGamesInfo: `, allGamesInfo);
//     //     if ((this.openGameNumber.value || this.openGameNumber.value === 0)
//     //       && this.allGamesInfo.value
//     //       && this.allGamesInfo.value[this.openGameNumber.value]) {
//     //       allGamesInfo[this.openGameNumber.value] = this.allGamesInfo.value[this.openGameNumber.value];
//     //     }
//     //     this.allGamesInfo.next(allGamesInfo);
//     //     this.updateGame();
//     //   });

//     //   this.socket.on('updateOpenGameInfo', (game) => {
//     //     console.log(`socket.on('updateOpenGameInfo') - game: `, game);
//     //     const allGamesInfo = this.allGamesInfo.value ? this.allGamesInfo.value : [];
//     //     if (this.openGameNumber.value || this.openGameNumber.value === 0) {
//     //       allGamesInfo[this.openGameNumber.value] = game;
//     //       this.allGamesInfo.next(allGamesInfo);
//     //     }
//     //     this.updateGame();
//     //   });

//     //   this.socket.on('updateUsersOnline', (usersOnline) => {
//     //     console.log(`socket.on('updateUsersOnline') - usersOnline: `, usersOnline);
//     //     this.usersOnline.next(usersOnline);
//     //     this.updateOpenGameNumber();
//     //   });
//   }

//   // updateOpenGameNumber(): any {
//   //   for (let i = 0; i < this.usersOnline.value.length; i++) {
//   //     if (this.usersOnline.value[i].username === this.currentUsername.value) {
//   //       this.openGameNumber.next(this.usersOnline.value[i].openGameNumber);
//   //     }
//   //   }
//   //   this.updateGame();
//   // }

//   // updateGame() {
//   //   this.openGame.next(this.allGamesInfo.value[this.openGameNumber.value]);
//   // }

//   // getConnected(): Observable<any> {
//   //   return this.connected.asObservable();
//   // }

//   // getGame(): Observable<any> {
//   //   return this.openGame.asObservable();
//   // }

//   // getUsersOnline(): Observable<any> {
//   //   return this.usersOnline.asObservable();
//   // }

//   // getCurrentUsername(): Observable<any> {
//   //   return this.currentUsername.asObservable();
//   // }

//   // getOpenGameNumber(): Observable<any> {
//   //   return this.openGameNumber.asObservable();
//   // }

//   // getAllGamesInfo(): Observable<any> {
//   //   return this.allGamesInfo.asObservable();
//   // }

//   // joinGame(gameNumber: number) {
//   //   this.socket.emit('joingame', gameNumber);
//   //   return this.openGameNumber.asObservable();
//   // }

//   leaveGame() {
//     this.socket.emit('leavegame');
//   }

//   readyToGame() {
//     this.socket.emit('readytogame');
//   }

//   startGame() {
//     this.socket.emit('startgame');
//   }

//   move(move) {
//     this.socket.emit('move', move);
//   }

//   message(message) {
//     this.socket.emit('message', message);
//   }

//   newGame(gameName) {
//     this.socket.emit('newgame', gameName);
//   }

