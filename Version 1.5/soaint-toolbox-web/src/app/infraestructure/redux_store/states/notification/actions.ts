import {Action} from '@ngrx/store';

export const ActionTypes = {
    PUSH_NOTIFICATION: '[NOTIFICATION] PushNotificationAction Dispatch',
    DELETE_NOTIFICATION: '[NOTIFICATION] DeleteNotificationAction Dispatch',
    DELETE_ALL_NOTIFICATIONS: '[NOTIFICATION] DeleteAllNotificationsAction Dispatch',

    NOTIFICATION_SUCCESS: '[NOTIFICATION] NotificationSuccessAction Dispatch',
    NOTIFICATION_FAIL: '[NOTIFICATION] NotificationFailAction Dispatch',
    FAIL: '[ERROR] FailAction',


};

type messageType = 'info' | 'error' | 'success' | 'warning';

export class PushNotificationAction implements Action {
    type = ActionTypes.PUSH_NOTIFICATION;
    constructor(public payload?: any, public severity: messageType = 'success') { }
}

export class DeleteNotificationAction implements Action {
    type = ActionTypes.DELETE_NOTIFICATION;

    constructor(public payload?: any) { }
}

export class DeleteAllNotificationsAction implements Action {
    type = ActionTypes.DELETE_ALL_NOTIFICATIONS;

    constructor(public payload?: any) { }
}

export class FailAction implements Action {
    type = ActionTypes.FAIL;

    constructor(public payload?: any) { }
}


export type Actions =
    PushNotificationAction |
    DeleteNotificationAction |
    DeleteAllNotificationsAction | FailAction
    ;

