import {tassign} from 'tassign';
import {Actions, ActionTypes} from './actions';
import {IndividualConfig} from 'ngx-toastr/toastr/toastr-config';

type messageType = 'info' | 'error' | 'success' | 'warn';

export interface CustomNotification {
    severity?: messageType;
    summary: string;
    detail?: string;
    action?: any;
    id?: number;
    options?: IndividualConfig;
}

export interface State {
    ids: number[];
    entities: { [id: string]: CustomNotification };
    filter: string;
}

const initialState: State = {
    ids: [],
    entities: {},
    filter: null
};


export function reducer(state = initialState, action: Actions): State{
    switch (action.type) {

        case ActionTypes.PUSH_NOTIFICATION: {
            const newValue = action.payload;
            const newValueId = state.ids.length + 1;
            return tassign(state, {
                ids: [...state.ids, newValueId],
                entities: tassign(state.entities, {
                    [newValueId]: newValue
                })
            });
        }

        default:
            return state;
    }
}
