import { Component, OnInit, OnDestroy } from '@angular/core';

import { GamesserverService } from './../gamesserver.service';

@Component({
  selector: 'app-chat-and-log',
  templateUrl: './chat-and-log.component.html',
  styleUrls: ['./chat-and-log.component.css']
})
export class ChatAndLogComponent implements OnInit, OnDestroy {
  gameSubscription: any;
  game: any = { gameInfo: {} };
  message: String = '';

  constructor(
    public gamesServer: GamesserverService,
  ) {
    this.gameSubscription = gamesServer.getGame().subscribe((openGame) => {
      if (openGame) {
        this.game = openGame;
        if (this.game.logNchat) {
          this.game.logNchat.reverse();
        }
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
  }

  sendMessage() {
    this.gamesServer.message(this.message);
  }
}
