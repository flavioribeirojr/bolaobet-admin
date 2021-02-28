import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdminReduxActions } from '../../domains/admin/admin.redux-actions';
import { createAdminAuthAPI } from '../../domains/admin/api/admin-auth.api';
import { StoreState } from '../../redux-store';

export function useAdminLoader() {
    const admin = useSelector((state: StoreState) => state.admin.admin);
    const reduxDispatcher = useDispatch();
    const adminAuthApi = createAdminAuthAPI();

    useEffect(() => {
        loadAdminIfNotLoadedYet();
    });

    async function loadAdminIfNotLoadedYet() {
        if (admin) {
            return;
        }

        const adminResponse = await adminAuthApi.getJWTOwner();
        reduxDispatcher({ type: AdminReduxActions.SET_ADMIN, admin: adminResponse });
    }

    return admin;
}