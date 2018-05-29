import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

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
    public location: Location,
    public gamesServer: GamesserverService,
  ) {
    location.replaceState('game');

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
