import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthorizeComponent } from './authorize/authorize.component';
import { NewGameComponent } from './new-game/new-game.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GameComponent } from './game/game.component';
import { GameInfoComponent } from './game-info/game-info.component';
import { NoThanksComponent } from './no-thanks/no-thanks.component';
import { PerudoComponent } from './perudo/perudo.component';
import { ChatAndLogComponent } from './chat-and-log/chat-and-log.component';
import { GameResultsComponent } from './game-results/game-results.component';

import { GamesserverService } from './gamesserver.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthorizeComponent,
    NewGameComponent,
    GamesListComponent,
    GameComponent,
    GameInfoComponent,
    NoThanksComponent,
    PerudoComponent,
    ChatAndLogComponent,
    GameResultsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [
    GamesserverService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
