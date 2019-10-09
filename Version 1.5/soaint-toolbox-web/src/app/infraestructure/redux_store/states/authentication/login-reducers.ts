import {ActionTypes, Actions} from './login-actions';
import {tassign} from 'tassign';
import { UserProfile } from 'src/app/ui/components/pages/auth/login/models/user-profile.model';
import {Action} from "@ngrx/store";
import {isNullOrUndefined} from "util";

export interface State {
  token: string;
  profile: UserProfile;
  isAuthenticated: boolean;
  isLoading: boolean,
  error: string;
 };

const initialState: State =  {
  token: null,
  profile: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
 };

/**
 * The reducer function.
 * @function reducer
 * @param {State} state Current state
 * @param {Actions} action Incoming action
 */
export function reducer(state = initialState, action: Action) {
  switch (action.type) {

    case ActionTypes.LOGIN: return tassign(state,{isLoading: true});

    case ActionTypes.LOGIN_SUCCESS:
      const payload = (<Actions>action).payload;
      const newState = {
        token: payload.properties.token,
        profile:{
          name:payload.name,
          email:payload.email,
          id:payload.id,
          username:payload.credentials.username,
          password: payload.credentials.password,
          roles:payload.properties.roles || []
        } as UserProfile,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      };
       return tassign(state, newState);

    case ActionTypes.LOGIN_FAIL:
      return tassign(state, {
        token: null,
        profile: null,
        isAuthenticated: false,
        error: (<Actions>action).payload.error,
        isLoading: false
      });

    case ActionTypes.LOGOUT:
      return tassign(state, {
        token: null,
        profile: null,
        error: null,
        isLoading: false,
        isAuthenticated: false
      });

    case ActionTypes.UPDATE_PROFILE: return tassign(state,{
      token: state.token,
      profile: (<Actions>action).payload,
      error: null,
      isLoading: false,
      isAuthenticated: true
    });

     default:
      return state;
  }
}


