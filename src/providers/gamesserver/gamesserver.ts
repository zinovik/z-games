import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import io from 'socket.io-client';


@Injectable()
export class GamesServerProvider {

  SERVER_URL = window["process_env"].serverURL;

  socket: any;

  currentUsername: any = new BehaviorSubject<any>(null);
  allGamesInfo: any = new BehaviorSubject<any>([]);
  openGameInfo: any = new BehaviorSubject<any>({});
  usersOnline: any = new BehaviorSubject<any>([]);
  openGameNumber: any = new BehaviorSubject<any>(null);

  constructor(
    private toastCtrl: ToastController,
  ) {
    this.socket = io(this.SERVER_URL);

    this.socket.emit('getCurrentUsername');
    this.socket.emit('getAllGamesInfo');
    this.socket.emit('getUsersOnline');
    this.socket.emit('getOpenGameInfo');

    this.socket.on('connect_error', () => {
      this.toastCtrl.create({
        message: `Server connection error`,
        duration: 3000,
        position: 'top'
      }).present();
    });

    this.socket.on('connect', () => {
      this.toastCtrl.create({
        message: `Connected to the server`,
        duration: 3000,
        position: 'top'
      }).present();
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
    });

    this.socket.on('updateOpenGameInfo', (game) => {
      let allGamesInfo = this.allGamesInfo.value ? this.allGamesInfo.value : [];

      if (this.openGameNumber.value || this.openGameNumber.value === 0) {
        allGamesInfo[this.openGameNumber.value] = game;
        this.allGamesInfo.next(allGamesInfo);
      }
    });

    this.socket.on('updateUsersOnline', (users) => {
      this.usersOnline.next(users);
      this.updateOpenGameNumber();
    });
  }

  updateOpenGameNumber(): any {
    for (let i = 0; i < this.usersOnline.value.length; i++) {
      if (this.usersOnline.value[i].username === this.currentUsername.value) {
        this.openGameNumber.next(this.usersOnline.value[i].openGameNumber);
      }
    }
  }

  // getUsersOnline(): Observable<any> {
  //   return this.usersOnline.asObservable();
  // }

  getCurrentUsername(): Observable<any> {
    return this.currentUsername.asObservable();
  }

  // getOpenGameNumber(): Observable<any> {
  //   return this.openGameNumber.asObservable();
  // }

  getAllGamesInfo(): Observable<any> {
    return this.allGamesInfo.asObservable();
  }

  joinGame(gameNumber) {
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

  // Accounts
  register(signup): Observable<any> {
    this.socket.emit('register', signup.username, signup.password);
    return this.currentUsername.asObservable();
  }

  login(login): Observable<any> {
    this.socket.emit('authorize', login.username, login.password);
    return this.currentUsername.asObservable();
  }

  logout(): Observable<any> {
    this.socket.emit('logout');
    return this.currentUsername.asObservable();
  }
}
