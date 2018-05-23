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
import { UsersListComponent } from './users-list/users-list.component';

import { GamesserverService } from './gamesserver.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

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
    UsersListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
  ],
  providers: [
    GamesserverService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
