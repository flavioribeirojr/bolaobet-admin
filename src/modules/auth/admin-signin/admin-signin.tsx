import React from 'react';
import { faLock, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthInput } from '../../../components/auth-input';
import { AuthTemplate } from '../../../templates/auth/auth';
import { ReactComponent as ShieldImage }  from '../../../asset/icons/SVG/Protection.svg';
import { Formik } from 'formik';
import { ValidationWrapper } from '../../../components/validation-wrapper';
import { Spinner } from '../../../components/spinner';
import { useAdminSignin } from './admin-signin.hook';
import * as Yup from 'yup';
import styled from 'styled-components';

const SignupFormValidationSchema = Yup.object().shape({
    email: Yup.string().email('Deve ser um email válido.').required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório')
});

export function AdminSignin() {
    const { authenticateUser, isSubmiting } = useAdminSignin();

    return (
        <AuthTemplate>
            <LoginContainer>
                <LoginInfo>
                    <LoginInfoTitle>
                        Bolao<b>Bet</b>
                    </LoginInfoTitle>
                    <LoginInfoDescription>
                        Gerencia apostas, jogadores e muito mais!
                    </LoginInfoDescription>
                </LoginInfo>
                <LoginCard>
                    <LoginCardTitle>
                        Acesse sua conta usando seu email e senha :)
                    </LoginCardTitle>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={SignupFormValidationSchema}
                        onSubmit={authenticateUser}
                        validateOnBlur
                    >
                        {
                            ({ values, errors, handleChange, handleSubmit }) => (
                                <LoginCardForm onSubmit={handleSubmit}>
                                    <LoginCardFormField name="email">
                                        <AuthInput
                                            name="email"
                                            type="email"
                                            icon={faUserCircle}
                                            placeholder="Digite seu email"
                                            value={values.email}
                                            onChange={handleChange}
                                        />
                                    </LoginCardFormField>
                                    <LoginCardFormField name="password">
                                        <AuthInput
                                            name="password"
                                            type="password"
                                            icon={faLock}
                                            placeholder="Digite sua senha"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                    </LoginCardFormField>
                                    <LoginCardFormButton>
                                        { isSubmiting ? <LoginCardFormButtonSpinner /> : 'Acessar' }
                                    </LoginCardFormButton>

                                    <LoginCardFormLogo />
                                </LoginCardForm>
                            )
                        }
                    </Formik>
                    <LoginCardFooter>
                        BolaoBet © { (new Date()).getFullYear() } | Todos os direitos reservados
                    </LoginCardFooter>
                </LoginCard>
            </LoginContainer>
        </AuthTemplate>
    );
}

const LoginContainer = styled.div`
    display: flex;
    height: 100%;
`;

const LoginInfo = styled.div`
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 3;
`;

const LoginInfoTitle = styled.h3`
    color: white;
    font-size: 4em;
    font-weight: 900;

    b {
        color: #ff3636;
    }
`;

const LoginInfoDescription = styled.p`
    font-weight: 500;
    color: white;
    font-size: 1.5em;
`;

const LoginCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    min-height: 100%;
    background-color: white;
    box-shadow: 0 0 6px #818181;
    padding: 45px;
    position: relative;
    z-index: 3;
    margin-left: auto;
`;

const LoginCardTitle = styled.h3`
    font-size: 1.4em;
    color: #525050;
    font-weight: 800;
    text-align: center;
    margin-bottom: 100px;
`;

const LoginCardForm = styled.form`
    width: 100%;
`;

const LoginCardFormField = styled(ValidationWrapper)`
    margin-bottom: 20px;
`;

const LoginCardFormLogo = styled(ShieldImage)`
    height: 50px;
    display: block;
    margin: 0 auto;
    margin-top: 50px;

    path {
        fill: #76e587;
    }
`;

const LoginCardFormButton = styled.button`
    border: none;
    background: linear-gradient(87deg,#11cdef,#1171ef);
    color: white;
    font-size: 1.1em;
    font-weight: 700;
    width: 100%;
    padding: 13px 0;
    border-radius: 4px;
    margin-top: 20px;
    cursor: pointer;
`;

const LoginCardFormButtonSpinner = styled(Spinner)`
    display: block;
    margin: 0 auto;
    width: 30px;
    height: 30px;
`;

const LoginCardFooter = styled.p`
    font-size: .8em;
    color: #9e9e9e;
    text-align: center;
    margin-top: auto;
`;