import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createJWTTokenStorage } from '../../common/storage/jwt-token.storage';
import { createAdminSigninAPI } from './admin-signin.api';
import { AdminSigninPayload } from './types/admin-signin-payload';

export function useAdminSignin() {
    const adminSigninAPI = createAdminSigninAPI();
    const jwtTokenStorage = createJWTTokenStorage();
    const routerHistory = useHistory();

    const [ isSubmiting, setSubmitingState ] = useState(false);

    async function authenticateUser(signinForm: AdminSigninPayload) {
        setSubmitingState(true);

        try {
            const token = await adminSigninAPI.signin(signinForm);
            jwtTokenStorage.set(token);

            routerHistory.push('/');
        } catch (err) {
            console.debug(err.response);

            if (err.response && err.response.status === 401) {
                toast.warn('Login inválido. Por favor tente novamente');
                return;
            }

            toast.error('Algo deu errado. Por favor tente novamente mais tarde');
        } finally {
            setSubmitingState(false);
        }
    }

    return {
        isSubmiting,
        authenticateUser
    }
}