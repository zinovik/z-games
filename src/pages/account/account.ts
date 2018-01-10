import { Component } from '@angular/core';

import { AlertController, NavController, ToastController, LoadingController } from 'ionic-angular';

import { GamesServerProvider } from '../../providers/gamesserver';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;

  constructor(
    public alertCtrl: AlertController,
    public nav: NavController,
    public gamesServer: GamesServerProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) {

  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  support() {
    this.nav.push('SupportPage');
  }
}
