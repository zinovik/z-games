import { IGame, IUser } from './';

export interface IInvite {
  id: string;
  game: IGame;
  invitee: IUser;
  createdAt: Date;
  createdBy: IUser;
  isClosed: boolean;
}
