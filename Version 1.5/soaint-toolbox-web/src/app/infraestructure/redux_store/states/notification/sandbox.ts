import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {CustomNotification} from "./reducers";
import * as statusMessages from '../../../utils/errors.messages';
import * as statusCodes from '../../../utils/errors-codes.properties';
import {Store} from "@ngrx/store";
import {State} from "../../redux-reducers";
import {PushNotificationAction} from "./actions";


@Injectable()
export class Sandbox {

  constructor(private _toastrService: ToastrService,private _store:Store<State>) {
  }

  showNotification(notification: CustomNotification) {
    switch (notification.severity) {
      case 'info':
        return this._toastrService.info(notification.detail, notification.summary, notification.options);
      case 'success':
        return this._toastrService.success(notification.detail, notification.summary, notification.options);
      case 'warn':
        return this._toastrService.warning(notification.detail, notification.summary, notification.options);
      case 'error':
        return this._toastrService.error(notification.detail, notification.summary, notification.options);
      default:
        return this.showConnectionError(notification.summary)
    }

  }

  notify(payload){

    this._store.dispatch(new PushNotificationAction(payload));
  }

  showConnectionError(code) {
    return this._toastrService.error('', this.getStatusMessage(code));
  }

  hideNotification(id) {
    this._toastrService.clear(id);
  }

  getStatusMessage(statusCode) {
    switch (statusCode) {
      case statusCodes.BAD_GATEWAY: return statusMessages.BAD_GATEWAY;
      case statusCodes.CONNECTION_TIMEOUT: return statusMessages.CONNECTION_TIMEOUT;
      case statusCodes.NOT_AUTHORIZED: return statusMessages.NOT_AUTHORIZED;
      case statusCodes.SERVER_ERROR: return statusMessages.SERVER_ERROR;
      case statusCodes.GATEWAY_TIMEOUT: return statusMessages.GATEWAY_TIMEOUT;
      case statusCodes.NOT_FOUND: return statusMessages.NOT_FOUND;
      case statusCodes.CUSTOMER_NOT_SUPPORTED: return statusMessages.CUSTOMER_NOT_SUPPORTED;
      case statusCodes.BAD_REQUEST: return statusMessages.CUSTOMER_NOT_SUPPORTED;
      default:
        return statusMessages.SERVER_ERROR;
    }
  }
}
