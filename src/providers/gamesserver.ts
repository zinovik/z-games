import { Injectable } from '@angular/core';

import io from 'socket.io-client';

import { ToastController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class GamesServerProvider {
  socket: any;
  usersOnline: any;
  currentUsername: any;
  openGameNumber: any;

  constructor(
    private toastCtrl: ToastController,
  ) {
    this.socket = io('http://gamesserver.herokuapp.com');

    this.socket.emit('getCurrentUsername');
    this.socket.emit('getAllGamesInfo');
    this.socket.emit('getUsersOnline');
    this.socket.emit('getOpenGameInfo');

    this.socket.on('connect_error', () => {
      this.toastCtrl.create({
        message: `Connection error`,
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
    this.socket.on('updateCurrentUsername', function(username) {
      console.log('updateCurrentUsername', username);
      this.currentUsername = username;
      // this.updateOpenGameNumber();
    });

  //   this.socket.on('updateAllGamesInfo', function(games) {
  //     if ((openGameNumber || openGameNumber === 0) && allGamesInfo) {
  //         games[openGameNumber] = allGamesInfo[openGameNumber];
  //     }
  //     allGamesInfo = games;
  //     updatePage();
  //   });

  //   this.socket.on('updateOpenGameInfo', function(game) {
  //     if (!allGamesInfo ) {
  //         allGamesInfo = [];
  //     }
  //     if ((openGameNumber || openGameNumber === 0)) {
  //         allGamesInfo[openGameNumber] = game;
  //         updatePage();
  //     }
  //   });

    this.socket.on('updateUsersOnline', function(users) {
      this.usersOnline = users;
      // this.updateOpenGameNumber();
    });
  }

  updateOpenGameNumber(): any {
    for (let i = 0; i < this.usersOnline.length; i++) {
      if (this.usersOnline[i].username === this.currentUsername) {
          this.openGameNumber = this.usersOnline[i].openGameNumber;
      }
    }
  }

  login(login) {
    this.socket.emit('authorize', login.username, login.password);
    // return this.getUsername();
    this.getUsername().subscribe((asd: any) => {
      console.log('login', asd);
    });
    return Observable.of(this.currentUsername);
  }

  getUsername() {
    return Observable.of(this.currentUsername);
  }
}
