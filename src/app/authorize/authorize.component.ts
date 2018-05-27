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
  loading: Boolean;

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
    this.loading = true;
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
          this.loading = false;
          loginSubscription.unsubscribe();
        }
      });
  }

  signUp() {
    this.loading = true;
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
          this.loading = false;
          signUpsubscription.unsubscribe();
        }
      });
  }

  logOut() {
    this.loading = true;
    const logoutSubscription = this.gamesServer.logout().subscribe(() => {
      this.loading = false;
      this.snackBar.open(`You have successfully logged out`, 'Close', {
        duration: 3000
      });
      setTimeout(() => {
        logoutSubscription.unsubscribe();
      });
    });
  }
}
