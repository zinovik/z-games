import * as ActionTypes from '../actions/action-types';
import { INotificationsState } from '../interfaces';

const initialState = {
  notifications: [],
};

const notifications = (state: INotificationsState = initialState, action: ActionTypes.Action): INotificationsState => {
  switch (action.type) {
    case ActionTypes.ADD_NOTIFICATION:
      const notificationId = state.notifications.length && state.notifications[state.notifications.length - 1].id + 1;

      return {
        notifications: [
          ...state.notifications,
          {
            id: notificationId,
            message: action.message,
          },
        ],
      };

    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        notifications: state.notifications.filter(notification => notification.id !== action.notificationId),
      };

    default:
      return state;
  }
};

export default notifications;
