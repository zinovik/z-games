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
  SERVER_URL = window["process_env"].serverURL;

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
      console.log('allGamesInfo', allGamesInfo);
      this.allGamesInfo = allGamesInfo;
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
    let subscription = this.gamesServer.joinGame(gameNumber).subscribe((openGameNumber) => {
      if (openGameNumber === gameNumber) {
        this.navCtrl.push('GameDetailPage', { gameNumber: gameNumber });
        setTimeout(() => {
          subscription.unsubscribe();
        });
      }
    });
  }
}
