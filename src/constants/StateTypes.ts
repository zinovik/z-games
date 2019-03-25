import { NoThanksPlayer } from 'z-games-no-thanks';
import { PerudoPlayer } from 'z-games-perudo';
import { LostCitiesPlayer } from 'z-games-lost-cities';

export type GamePlayer = NoThanksPlayer | PerudoPlayer | LostCitiesPlayer;

export interface IUsersState {
  isConnected: boolean;
  currentUser: IUser | null;
  usersOnline: IUsersOnline;
  usersRating: IUser[];
}

export interface IUsersOnline {
  users: IUser[];
  usersCount: number;
};

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
