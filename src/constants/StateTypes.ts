export interface UsersState {
  connected: boolean;
  currentUser: User | null;
  usersOnline: User[];
}

export interface User {
  avatar: string;
  createdAt: Date;
  email: string;
  firstName: string;
  gamesPlayed: number;
  gamesWon: number;
  id: string;
  isConfirmed: boolean;
  lastName: string;
  provider: string;
  updatedAt: Date;
  username: string;

  currentGames: Game[]; // ?
}

export interface GamesState {
  allGames: Game[];
  openGame: Game | null;
}

export interface Game {
  id: string;
  number: number;
  name: string;
  state: number;
  playersMax: number;
  playersMin: number;
  createdAt: Date;
  gameData: string;
  players: User[];

  watchers: any[];

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
