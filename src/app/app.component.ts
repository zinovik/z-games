import { Component } from '@angular/core';

import { GamesserverService } from './gamesserver.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUsernameSubscription: any;
  currentUsername: any;
  openGameNumberSubscription: any;
  openGameNumber: number;

  constructor(
    public gamesServer: GamesserverService,
  ) {
    this.currentUsernameSubscription = gamesServer.getCurrentUsername().subscribe((currentUsername) => {
      this.currentUsername = currentUsername;
    });
    this.openGameNumberSubscription = gamesServer.getOpenGameNumber().subscribe((openGameNumber) => {
      this.openGameNumber = openGameNumber;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.currentUsernameSubscription.unsubscribe();
    this.openGameNumberSubscription.unsubscribe();
  }
}
