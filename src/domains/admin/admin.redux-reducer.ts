import { Admin } from './admin';
import { AdminReduxActions } from './admin.redux-actions';

const initialState: ReducerState = {
    admin: null
};

export function AdminReduxReducer(state = initialState, action: ReducerAction): ReducerState {
    switch (action.type) {
        case AdminReduxActions.SET_ADMIN:
            return {
                ...state,
                admin: action.admin
            };

        case AdminReduxActions.REMOVE_ADMIN:
            return {
                ...state,
                admin: null
            };

        default:
            return state;
    }
}

type ReducerAction = {
    type: string,
    [key: string]: any
}

export type ReducerState = {
    admin: Admin | null
};