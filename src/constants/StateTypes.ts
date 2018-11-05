export interface UsersState {
  connected: boolean;
  currentUsername: string | null;
  usersOnline: UserOnline[];
}

export interface UserOnline {
  currentGames: any[];
  openGameNumber: number;
  username: string;
}

export interface GamesState {
  allGames: Game[];
  openGameInfo: GameInfo | null;
  openGameNumber: number | null;
}

export interface Game {
  gameInfo: GameInfo;
  name: string;
  players: Player[];
  timeStarted: number;
  watchers: any[];
}

export interface GameInfo {
  PLAYERS_MAX: number;
  PLAYERS_MIN: number;
  finished: boolean;
  nextPlayers: number[];
  started: boolean;
}

export interface Player {
  username: string;
  ready: boolean;
}
