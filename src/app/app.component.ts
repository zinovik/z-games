import { Component, OnInit, OnDestroy } from '@angular/core';

import { GamesserverService } from './gamesserver.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  connectedSubscription: any;
  connected: boolean;
  currentUsernameSubscription: any;
  currentUsername: any;
  openGameNumberSubscription: any;
  openGameNumber: number;
  progress: any = 0;
  PROGRESS_TIME: any = 13;

  constructor(
    public gamesServer: GamesserverService,
  ) {
    let timer = setInterval(() => {
      this.progress += 10 / this.PROGRESS_TIME;
      if (this.progress > 100) {
        timer = undefined;
      }
    }, 100);

    this.connectedSubscription = gamesServer.getConnected()
      .subscribe((connected) => {
        this.connected = connected;
      });
    this.currentUsernameSubscription = gamesServer.getCurrentUsername()
      .subscribe((currentUsername) => {
        this.currentUsername = currentUsername;
      });
    this.openGameNumberSubscription = gamesServer.getOpenGameNumber()
      .subscribe((openGameNumber) => {
        this.openGameNumber = openGameNumber;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.connectedSubscription.unsubscribe();
    this.currentUsernameSubscription.unsubscribe();
    this.openGameNumberSubscription.unsubscribe();
  }
}
