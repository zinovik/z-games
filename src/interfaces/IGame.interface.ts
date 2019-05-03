import { IUser, ILog } from './';

export interface IGame {
  id: string;
  number: number;
  name: string;
  state: number;
  playersMax: number;
  playersMin: number;
  createdAt: Date;
  createdBy: IUser;
  gameData: string;
  players: IUser[];
  isPrivate: boolean;

  watchersOnline: IUser[];
  logs: ILog[];

  nextPlayers: IUser[];
  playersOnline: IUser[];
}
