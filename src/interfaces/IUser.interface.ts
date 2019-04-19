import { IGame, IInvite } from './';

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
  invitesInviter: IInvite[];
  invitesInvitee: IInvite[];
}
