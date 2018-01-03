import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, ToastController, LoadingController } from 'ionic-angular';

import { GamesServerProvider } from '../../providers/gamesserver';
import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { SchedulePage } from '../schedule/schedule';
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
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      let subscription = this.gamesServer.login(this.login)
        .subscribe((currentUsername) => {
          loading.dismiss();
          if (currentUsername === this.login.username) {
            this.toastCtrl.create({
              message: `You have successfully logged in as ${currentUsername}`,
              duration: 3000,
              position: 'top'
            }).present();
            this.userData.login(this.login.username);
            this.navCtrl.push(SchedulePage);
          } else {
            this.toastCtrl.create({
              message: `Wrong username/password!`,
              duration: 3000,
              position: 'top'
            }).present();
          }
          subscription.unsubscribe();
        });
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
