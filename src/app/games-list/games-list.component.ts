import { Component, OnInit, OnDestroy } from '@angular/core';

import { GamesserverService } from './../gamesserver.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit, OnDestroy {
  allGamesInfo: any = [];
  allGamesInfoSubscription: any;
  currentUsername: string;
  currentUsernameSubscription: any;
  usersOnline: any = [];
  usersOnlineSubscription: any;
  currentGames: any = [];
  SERVER_URL: String = window['configVars'].serverURL;

  constructor(
    public gamesServer: GamesserverService,
  ) {
    this.allGamesInfoSubscription = gamesServer.getAllGamesInfo().subscribe((allGamesInfo) => {
      this.allGamesInfo = JSON.parse(JSON.stringify(allGamesInfo));
      this.allGamesInfo.reverse();
    });
    this.currentUsernameSubscription = gamesServer.getCurrentUsername().subscribe((currentUsername) => {
      this.currentUsername = currentUsername;
      this.updateCurrentGames();
    });
    this.usersOnlineSubscription = gamesServer.getUsersOnline().subscribe((usersOnline) => {
      this.usersOnline = usersOnline;
      this.updateCurrentGames();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.allGamesInfoSubscription.unsubscribe();
    this.currentUsernameSubscription.unsubscribe();
    this.usersOnlineSubscription.unsubscribe();
  }

  updateCurrentGames() {
    if (this.currentUsername && this.usersOnline.length) {
      this.usersOnline.forEach(user => {
        if (user.username === this.currentUsername) {
          this.currentGames = user.currentGames;
        }
      });
    }
  }

  updateGames() {
    console.log('updateGames()');
  }

  joinGame(gameNumber: number) {
    if (!this.currentUsername) {
      console.log(`You need to login to join the game`);
      return;
    }

    const subscription = this.gamesServer.joinGame(gameNumber)
      .subscribe((openGameNumber) => {
        if (openGameNumber === gameNumber) {
          setTimeout(() => {
            subscription.unsubscribe();
          });
        }
      });
  }

}
