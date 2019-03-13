import { NoThanksPlayer } from 'z-games-no-thanks';
import { PerudoPlayer } from 'z-games-perudo';

export type GamePlayer = NoThanksPlayer | PerudoPlayer;

export interface IUsersState {
  isConnected: boolean;
  currentUser: IUser | null;
  usersOnline: IUser[];
}

export interface IUser {
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
  currentGames: IGame[];
}

export interface IGamesState {
  allGames: IGame[];
  openGame: IGame | null;
}

export interface IGame {
  id: string;
  number: number;
  name: string;
  state: number;
  playersMax: number;
  playersMin: number;
  createdAt: Date;
  gameData: string;
  players: IUser[];

  watchers: IUser[];
  logs: ILog[];

  nextPlayers: IUser[];
  playersOnline: IUser[];
}

export interface ILog {
  createdAt: Date;
  gameId: string;
  id: string;
  type: string;
  user: IUser;

  text?: string;
}

export interface IPlayerInGame {
  id: string;
  ready: boolean;
  place: number;

  cards?: number[];
  chips?: number;
  points?: number;

  dicesCount?: number;
  dices?: number[];
}

export interface IServerState {
  serverUrl: string;
}
