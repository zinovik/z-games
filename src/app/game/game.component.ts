import { Component, OnInit, OnDestroy } from '@angular/core';

import { GamesserverService } from './../gamesserver.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  gameSubscription: any;
  game: any = { gameInfo: {} };

  constructor(
    public gamesServer: GamesserverService,
  ) {
    this.gameSubscription = gamesServer.getGame().subscribe((openGame) => {
      if (openGame) {
        this.game = openGame;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
  }
}
