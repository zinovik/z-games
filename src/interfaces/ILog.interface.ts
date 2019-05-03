import { IUser } from './';

export interface ILog {
  createdAt: Date;
  gameId: string;
  id: string;
  type: string;
  createdBy: IUser;

  text?: string;
}
