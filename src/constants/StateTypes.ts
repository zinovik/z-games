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
  openGame: Game | null;
  openGameNumber: number | null;
}

export interface Game {
  gameInfo: GameInfo;
  name: string;
  players: Player[];
  timeStarted: number;
  watchers: any[];

  logNchat?: Message[];
  nextPlayersNames?: any[];
  rules?: string;
}

export interface GameInfo {
  PLAYERS_MAX: number;
  PLAYERS_MIN: number;
  finished: boolean;
  nextPlayers: number[];
  started: boolean;

  players?: PlayerInGame[];

  cardsLeft?: number;
  currentCard?: number;
  currentCardCost?: number;

  currentDiceFigure?: number;
  currentDiceNumber?: number;
  currentRound?: number;
  lastPlayerNumber?: number;
  lastRoundResults?: any;
}

export interface Player {
  username: string;
  ready: boolean;
}

export interface Message {
  type: string;
  time: number;
  username: string;
  text: string;
}

export interface PlayerInGame {
  place: number;

  cards?: number[];
  chips?: number;
  points?: number;

  dicesCount?: number;
  dices?: number[];
}
