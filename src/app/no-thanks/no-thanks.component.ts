import { Component, OnInit } from '@angular/core';

import { GamesserverService } from './../gamesserver.service';

@Component({
  selector: 'app-no-thanks',
  templateUrl: './no-thanks.component.html',
  styleUrls: ['./no-thanks.component.css']
})
export class NoThanksComponent implements OnInit {
  gameSubscription: any;
  game: any = { gameInfo: {} };
  currentUsernameSubscription: any;
  currentUsername: any;

  constructor(
    public gamesServer: GamesserverService,
  ) {
    this.gameSubscription = gamesServer.getGame().subscribe((openGame) => {
      if (openGame) {
        this.game = openGame;
      }
    });
    this.currentUsernameSubscription = gamesServer.getCurrentUsername().subscribe((currentUsername) => {
      console.log('app-no-thanks: currentUsername', currentUsername);
      this.currentUsername = currentUsername;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
    this.currentUsernameSubscription.unsubscribe();
  }

  movePay() {
    this.gamesServer.move({ takeCard: false });
  }

  moveTake() {
    this.gamesServer.move({ takeCard: true });
  }
  
}
