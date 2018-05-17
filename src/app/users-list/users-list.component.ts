import { Component, OnInit, OnDestroy } from '@angular/core';

import { GamesserverService } from './../gamesserver.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  usersOnlineSubscription: any;
  usersOnline: Array<any> = [];

  constructor(
    public gamesServer: GamesserverService,
  ) {
    this.usersOnlineSubscription = gamesServer.getUsersOnline().subscribe((usersOnline) => {
      console.log(usersOnline);
      if (usersOnline) {
        this.usersOnline = usersOnline;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.usersOnlineSubscription.unsubscribe();
  }
}
