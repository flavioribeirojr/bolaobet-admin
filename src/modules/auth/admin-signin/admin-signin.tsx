import { faLock, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';
import { AuthInput } from '../../../components/auth-input';
import { AuthTemplate } from '../../../templates/auth/auth';
import { ReactComponent as ShieldImage }  from '../../../asset/icons/SVG/Protection.svg';

export function AdminSignin() {
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
                    <LoginCardForm>
                        <AuthInput
                            name="email"
                            type="email"
                            icon={faUserCircle}
                            placeholder="Digite seu email"
                        />
                        <AuthInput
                            name="password"
                            type="password"
                            icon={faLock}
                            placeholder="Digite sua senha"
                        />
                        <LoginCardFormButton>
                            Acessar
                        </LoginCardFormButton>

                        <LoginCardFormLogo />
                    </LoginCardForm>
                    <LoginCardFooter>
                        BolaoBet© { (new Date()).getFullYear() } | Todos os direitos reservados
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
`;

const LoginCardFooter = styled.p`
    font-size: .8em;
    color: #9e9e9e;
    text-align: center;
    margin-top: auto;
`;