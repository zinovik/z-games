import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GamesserverService } from './../gamesserver.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  gameSubscription: any;
  game: any = { gameInfo: {} };
  currentUsernameSubscription: any;

  constructor(
    public gamesServer: GamesserverService,
    public route: ActivatedRoute,
    public router: Router,
  ) {
    this.gameSubscription = gamesServer.getGame()
      .subscribe((openGame) => {
        if (openGame) {
          this.game = openGame;
        }
      });
    let step = 0;
    this.currentUsernameSubscription = gamesServer.getCurrentUsername()
      .subscribe((currentUsername) => {
        step++;
        if (step === 1) {
          return;
        }
        if (currentUsername) {
          const subscription = this.gamesServer.joinGame(route.snapshot.params['gameNumber'])
            .subscribe((openGameNumber) => {
              if (openGameNumber === route.snapshot.params['gameNumber']) {
                setTimeout(() => {
                  subscription.unsubscribe();
                });
              }
            });
        } else {
          router.navigateByUrl('/games');
        }
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
    this.currentUsernameSubscription.unsubscribe();
  }
}
