import { Component } from '@angular/core';

import { AlertController, NavController, ToastController, LoadingController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
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
    public userData: UserData,
    public gamesServer: GamesServerProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) {

  }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.userData.setUsername(data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.nav.setRoot('LoginPage');

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    let subscription = this.gamesServer.logout()
    .subscribe(() => {
      loading.dismiss();
      this.toastCtrl.create({
        message: `You have successfully logged out`,
        duration: 3000,
        position: 'top'
      }).present();
      this.userData.logout();
      subscription.unsubscribe();
    });
  }

  support() {
    this.nav.push('SupportPage');
  }
}
