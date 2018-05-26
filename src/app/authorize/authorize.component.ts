import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material';

import { GamesserverService } from './../gamesserver.service';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent implements OnInit, OnDestroy {
  currentUsernameSubscription: any;
  currentUsername: any;
  username: string;
  password: string;

  constructor(
    public snackBar: MatSnackBar,
    public gamesServer: GamesserverService,
  ) {
    this.currentUsernameSubscription = gamesServer.getCurrentUsername().subscribe((currentUsername) => {
      this.currentUsername = currentUsername;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.currentUsernameSubscription.unsubscribe();
  }

  signIn() {
    console.log('Loading...');
    let step = 0;
    const loginSubscription = this.gamesServer.login(this.username, this.password)
      .subscribe((currentUsername) => {
        step++;
        if (step === 1) {
          return;
        }
        if (currentUsername === this.username) {
          this.snackBar.open(`You have successfully logged in as ${currentUsername}`, 'Close', {
            duration: 3000
          });
        } else {
          this.snackBar.open(`Wrong username/password!`, 'Close', {
            duration: 3000
          });
        }
        if (step === 2) {
          console.log('Loading... Finished!');
          loginSubscription.unsubscribe();
        }
      });
  }

  signUp() {
    console.log('Loading...');
    let step = 0;
    const signUpsubscription = this.gamesServer.register(this.username, this.password)
      .subscribe((currentUsername) => {
        step++;
        if (step === 1) {
          return;
        }
        if (currentUsername === this.username) {
          this.snackBar.open(`You have successfully registered and logged in as ${currentUsername}`, 'Close', {
            duration: 3000
          });
        } else {
          this.snackBar.open(`You can't register with this username/password!`, 'Close', {
            duration: 3000
          });
        }
        if (step === 2) {
          console.log('Loading... Finished!');
          signUpsubscription.unsubscribe();
        }
      });
  }

  logOut() {
    console.log('Loading...');
    const logoutSubscription = this.gamesServer.logout().subscribe(() => {
      console.log('Loading... Finished!');
      this.snackBar.open(`You have successfully logged out`, 'Close', {
        duration: 3000
      });
      setTimeout(() => {
        logoutSubscription.unsubscribe();
      });
    });
  }
}
