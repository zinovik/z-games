import { Component, OnInit, OnDestroy } from '@angular/core';

import { GamesserverService } from './../gamesserver.service';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent implements OnInit, OnDestroy {
  gameSubscription: any;
  results: any;

  constructor(
    public gamesServer: GamesserverService,
  ) {
    this.gameSubscription = gamesServer.getGame().subscribe((openGame) => {
      if (openGame && openGame.gameInfo.players) {
        this.results = openGame.gameInfo.players;
        this.results.forEach((result, i) => {
          result.username = openGame.players[i].username;
          result.cards = openGame.gameInfo.players[i].cards;
          result.dicesCount = openGame.gameInfo.players[i].dicesCount;
        });
        this.results.sort((a, b) => {
          if (a.place === b.place) {
            return a.points > b.points;
          }
          return a.place > b.place;
        });
        console.log(this.results);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
  }
}
