import { Admin } from './admin'

export const AdminReduxActions = {
    SET_ADMIN: 'SET_ADMIN',
    REMOVE_ADMIN: 'REMOVE_ADMIN'
}

export function setAdmin(admin: Admin) {
    return {
        type: AdminReduxActions.SET_ADMIN,
        admin
    };
}

export function removeAdmin() {
    return {
        type: AdminReduxActions.REMOVE_ADMIN
    };
}