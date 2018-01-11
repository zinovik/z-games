import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import io from 'socket.io-client';


@Injectable()
export class GamesServerProvider {
  socket: any;
  usersOnline: any = new BehaviorSubject<any>(null);
  currentUsername: any = new BehaviorSubject<any>(null);
  openGameNumber: any = new BehaviorSubject<any>(null);
  allGamesInfo: any = new BehaviorSubject<any>([]);

  constructor(
    private toastCtrl: ToastController,
  ) {
    this.socket = io('http://gamesserver.herokuapp.com');
    // this.socket = io('http://localhost:3000');

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
      if ((this.openGameNumber.value || this.openGameNumber.value === 0) && this.allGamesInfo.value) {
        allGamesInfo[this.openGameNumber.value] = this.allGamesInfo.value[this.openGameNumber];
      }
      this.allGamesInfo.next(allGamesInfo);
    });

    // this.socket.on('updateOpenGameInfo', function(game) {
    //   if (!this.allGamesInfo ) {
    //     this.allGamesInfo = [];
    //   }
    //   if ((this.openGameNumber || this.openGameNumber === 0)) {
    //     this.allGamesInfo[this.openGameNumber] = game;
    //   }
    // });

    // this.socket.on('updateUsersOnline', (users) => {
    //   this.usersOnline.next(users);
    //   this.updateOpenGameNumber();
    // });
  }

  updateOpenGameNumber(): any {
    for (let i = 0; i < this.usersOnline.length; i++) {
      if (this.usersOnline[i].username === this.currentUsername) {
          this.openGameNumber.next(this.usersOnline[i].openGameNumber);
      }
    }
  }

  // getUsersOnline(): Observable<any> {
  //   return this.usersOnline.asObservable();
  // }

  // getCurrentUsername(): Observable<any> {
  //   return this.currentUsername.asObservable();
  // }

  // getOpenGameNumber(): Observable<any> {
  //   return this.openGameNumber.asObservable();
  // }

  getAllGamesInfo(): Observable<any> {
    return this.allGamesInfo.asObservable();
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
