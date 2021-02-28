import { combineReducers, createStore } from 'redux';
import { AdminReduxReducer, ReducerState as AdminReducerState } from './domains/admin/admin.redux-reducer';

const reducers = combineReducers({
    admin: AdminReduxReducer
});

export const ReduxStore = createStore(reducers);

export interface StoreState {
    admin: AdminReducerState
}