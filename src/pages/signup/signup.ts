import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, ToastController, LoadingController } from 'ionic-angular';

import { GamesServerProvider } from '../../providers/gamesserver/gamesserver';

import { UserOptions } from '../../interfaces/user-options';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public gamesServer: GamesServerProvider,
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      let step = 0;
      let signUpsubscription = this.gamesServer.register(this.signup).subscribe((currentUsername) => {
        step++;
        if (step === 1) return;
        if (currentUsername === this.signup.username) {
          this.toastCtrl.create({
            message: `You have successfully registered and logged in as ${currentUsername}`,
            duration: 3000,
            position: 'top'
          }).present();
          this.navCtrl.push('GamesPage');
        } else {
          this.toastCtrl.create({
            message: `You can't register with this username/password!`,
            duration: 3000,
            position: 'top'
          }).present();
        }
        if (step === 2) {
          loading.dismiss();
          signUpsubscription.unsubscribe();
        }
      });
    }
  }
}
