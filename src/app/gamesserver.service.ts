import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import * as io from 'socket.io-client';

@Injectable()
export class GamesserverService {

  SERVER_URL: String;

  socket: any;

  currentUsername: any = new BehaviorSubject<any>(null);
  allGamesInfo: any = new BehaviorSubject<any>([]);
  openGameInfo: any = new BehaviorSubject<any>({});
  usersOnline: any = new BehaviorSubject<any>([]);
  openGameNumber: any = new BehaviorSubject<any>(null);
  openGame: any = new BehaviorSubject<any>(null);

  constructor() {
    this.SERVER_URL = window['configVars'].serverURL;

    this.socket = io(this.SERVER_URL);

    this.socket.emit('getCurrentUsername');
    this.socket.emit('getAllGamesInfo');
    this.socket.emit('getUsersOnline');
    this.socket.emit('getOpenGameInfo');

    this.socket.on('connect_error', () => {
      console.log(`Server connection error`);
    });

    this.socket.on('connect', () => {
      console.log(`Connected to the server`);
    });

    // updates from the server
    this.socket.on('updateCurrentUsername', (username) => {
      this.currentUsername.next(username);
      this.updateOpenGameNumber();
    });

    this.socket.on('updateAllGamesInfo', (allGamesInfo) => {
      if ((this.openGameNumber.value || this.openGameNumber.value === 0)
        && this.allGamesInfo.value
        && this.allGamesInfo.value[this.openGameNumber.value]) {
        allGamesInfo[this.openGameNumber.value] = this.allGamesInfo.value[this.openGameNumber.value];
      }
      this.allGamesInfo.next(allGamesInfo);
      this.updateGame();
    });

    this.socket.on('updateOpenGameInfo', (game) => {
      const allGamesInfo = this.allGamesInfo.value ? this.allGamesInfo.value : [];
      if (this.openGameNumber.value || this.openGameNumber.value === 0) {
        allGamesInfo[this.openGameNumber.value] = game;
        this.allGamesInfo.next(allGamesInfo);
      }
      this.updateGame();
    });

    this.socket.on('updateUsersOnline', (usersOnline) => {
      this.usersOnline.next(usersOnline);
      this.updateOpenGameNumber();
    });
  }

  updateOpenGameNumber(): any {
    for (let i = 0; i < this.usersOnline.value.length; i++) {
      if (this.usersOnline.value[i].username === this.currentUsername.value) {
        this.openGameNumber.next(this.usersOnline.value[i].openGameNumber);
      }
    }
    this.updateGame();
  }

  updateGame() {
    this.openGame.next(this.allGamesInfo.value[this.openGameNumber.value]);
  }

  getGame(): Observable<any> {
    return this.openGame.asObservable();
  }

  getUsersOnline(): Observable<any> {
    return this.usersOnline.asObservable();
  }

  getCurrentUsername(): Observable<any> {
    return this.currentUsername.asObservable();
  }

  getOpenGameNumber(): Observable<any> {
    return this.openGameNumber.asObservable();
  }

  getAllGamesInfo(): Observable<any> {
    return this.allGamesInfo.asObservable();
  }

  joinGame(gameNumber: number) {
    console.log(gameNumber);
    this.socket.emit('joingame', gameNumber);
    return this.openGameNumber.asObservable();
  }

  leaveGame() {
    this.socket.emit('leavegame');
  }

  readyToGame() {
    this.socket.emit('readytogame');
  }

  startGame() {
    this.socket.emit('startgame');
  }

  move(move) {
    this.socket.emit('move', move);
  }

  message(message) {
    this.socket.emit('message', message);
  }

  newGame(gameName) {
    this.socket.emit('newgame', gameName);
  }

  // Accounts
  register(username, password): Observable<any> {
    this.socket.emit('register', username, password);
    return this.currentUsername.asObservable();
  }

  login(username, password): Observable<any> {
    this.socket.emit('authorize', username, password);
    return this.currentUsername.asObservable();
  }

  logout(): Observable<any> {
    this.socket.emit('logout');
    return this.currentUsername.asObservable();
  }
}
