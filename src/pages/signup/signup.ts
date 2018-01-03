import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, ToastController, LoadingController } from 'ionic-angular';

import { GamesServerProvider } from '../../providers/gamesserver';
import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { SchedulePage } from '../schedule/schedule';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    public gamesServer: GamesServerProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      let subscription = this.gamesServer.register(this.signup)
        .subscribe((currentUsername) => {
          loading.dismiss();
          if (currentUsername === this.signup.username) {
            this.toastCtrl.create({
              message: `You have successfully registered and logged in as ${currentUsername}`,
              duration: 3000,
              position: 'top'
            }).present();
            this.userData.signup(this.signup.username);
            this.navCtrl.push(SchedulePage);
          } else {
            this.toastCtrl.create({
              message: `You can't register with this username/password!`,
              duration: 3000,
              position: 'top'
            }).present();
          }
          subscription.unsubscribe();
        });
    }
  }
}
