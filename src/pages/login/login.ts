import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { GamesServerProvider } from '../../providers/gamesserver';
import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs-page/tabs-page';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    public gamesServer: GamesServerProvider,
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.gamesServer.login(this.login).subscribe((currentUsername) => {
        if (currentUsername === this.login.username) {
          this.userData.login(this.login.username);
          this.navCtrl.push(TabsPage);
        }
      });
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
