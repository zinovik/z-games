import { Component, OnInit } from '@angular/core';

import { GamesserverService } from './../gamesserver.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {
  currentUsernameSubscription: any;
  currentUsername: any;

  constructor(
    public gamesServer: GamesserverService,
  ) { }

  ngOnInit() {
  }

  newGame(gameName: string) {
    this.gamesServer.newGame(gameName);
  }
}
