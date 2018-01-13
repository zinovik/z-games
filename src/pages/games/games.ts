import { Component, ViewChild } from '@angular/core';

import { AlertController, App, List, ModalController, NavController, ToastController, LoadingController } from 'ionic-angular';

import { GamesServerProvider } from '../../providers/gamesserver/gamesserver';

@Component({
  selector: 'page-schedule',
  templateUrl: 'games.html'
})
export class GamesPage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  allGamesInfo: any = [];
  SERVER_URL = 'https://gamesserver.herokuapp.com';

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public gamesServer: GamesServerProvider,
  ) {
    gamesServer.getAllGamesInfo().subscribe((allGamesInfo) => {
      this.allGamesInfo = allGamesInfo;
      console.log(this.allGamesInfo);
    });
  }

  ionViewDidLoad() {
    this.app.setTitle('Games');
  }

  updateGames() {
    console.log('updateGames()');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('GamesFilterPage', this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
      }
    });

  }

  goToGameDetail(gameNumber: any) {
    this.navCtrl.push('GameDetailPage', { gameNumber: gameNumber });
  }
}
