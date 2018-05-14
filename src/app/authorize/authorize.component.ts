import { Component, OnInit } from '@angular/core';

import { GamesserverService } from './../gamesserver.service';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent implements OnInit {
  currentUsernameSubscription: any;
  currentUsername: any;
  username: string;
  password: string;

  constructor(
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
    let loginSubscription = this.gamesServer.login(this.username, this.password)
      .subscribe((currentUsername) => {
        step++;
        if (step === 1) return;
        if (currentUsername === this.username) {
          console.log(`You have successfully logged in as ${currentUsername}`);
        } else {
          console.log(`Wrong username/password!`);
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
    let signUpsubscription = this.gamesServer.register(this.username, this.password)
      .subscribe((currentUsername) => {
        step++;
        if (step === 1) return;
        if (currentUsername === this.username) {
          console.log(`You have successfully registered and logged in as ${currentUsername}`);
        } else {
          console.log(`You can't register with this username/password!`);
        }
        if (step === 2) {
          console.log('Loading... Finished!');
          signUpsubscription.unsubscribe();
        }
      });
  }

  logOut() {
    console.log('Loading...');
    let logoutSubscription = this.gamesServer.logout().subscribe(() => {
      console.log('Loading... Finished!');
      console.log(`You have successfully logged out`);
      setTimeout(() => {
        logoutSubscription.unsubscribe();
      });
    });
  }
}
