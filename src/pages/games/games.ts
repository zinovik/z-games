import { Component, ViewChild } from '@angular/core';

import { PopoverController, AlertController, App, List, ModalController, NavController, ToastController, LoadingController } from 'ionic-angular';

import { PopoverPage } from '../about-popover/about-popover';

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
  allGamesInfoSubscription: any;
  currentUsername: string;
  currentUsernameSubscription: any;
  SERVER_URL = window["process_env"].serverURL;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public gamesServer: GamesServerProvider,
    public popoverCtrl: PopoverController,
  ) {
    this.allGamesInfoSubscription = gamesServer.getAllGamesInfo().subscribe((allGamesInfo) => {
      console.log('allGamesInfo', allGamesInfo);
      this.allGamesInfo = allGamesInfo;
    });

    this.currentUsernameSubscription = gamesServer.getCurrentUsername().subscribe((currentUsername) => {
      this.currentUsername = currentUsername;
    });
  }

  ionViewDidLoad() {
    this.app.setTitle('Games');
  }

  ngOnDestroy() {
    this.allGamesInfoSubscription.unsubscribe();
    this.currentUsernameSubscription.unsubscribe();
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
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
    if (!this.currentUsername) {
      this.toastCtrl.create({
        message: `You need to login to join the game`,
        duration: 3000,
        position: 'top'
      }).present();
      return;
    }

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
