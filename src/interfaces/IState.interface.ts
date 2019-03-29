import { IUsersState, IGamesState, IErrorsState, INotificationsState } from './';

export interface IState {
  users: IUsersState;
  games: IGamesState;
  errors: IErrorsState;
  notifications: INotificationsState;
}
