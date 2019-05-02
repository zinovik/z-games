import { IUser, IUsersOnline } from './';
import { IInvite } from '../interfaces';

export interface IUsersState {
  isConnected: boolean;
  isButtonsDisabled: boolean;
  currentUser: IUser | null;
  usersOnline: IUsersOnline;
  usersRating: IUser[];
  serverUrl: string;
  activeInvite: IInvite | null;
}
