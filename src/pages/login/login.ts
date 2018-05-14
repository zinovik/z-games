import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, ToastController, LoadingController } from 'ionic-angular';

import { GamesServerProvider } from '../../providers/gamesserver/gamesserver';

import { UserOptions } from '../../interfaces/user-options';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public navCtrl: NavController,
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
      let step = 0;
      var loginSubscription = this.gamesServer.login(this.login).subscribe((currentUsername) => {
        step++;
        if (step === 1) return;
        if (currentUsername === this.login.username) {
          this.toastCtrl.create({
            message: `You have successfully logged in as ${currentUsername}`,
            duration: 3000,
            position: 'top'
          }).present();
          this.navCtrl.push('GamesPage');
        } else {
          this.toastCtrl.create({
            message: `Wrong username/password!`,
            duration: 3000,
            position: 'top'
          }).present();
        }
        if (step === 2) {
          loading.dismiss();
          loginSubscription.unsubscribe();
        }
      });
    }
  }

  onSignup() {
    this.navCtrl.push('SignupPage');
  }
}
