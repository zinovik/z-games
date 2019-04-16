import { IUser, IUsersOnline } from './';

export interface IUsersState {
  isConnected: boolean;
  isButtonsDisabled: boolean;
  currentUser: IUser | null;
  usersOnline: IUsersOnline;
  usersRating: IUser[];
  serverUrl: string;
}
