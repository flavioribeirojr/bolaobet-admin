import React from 'react';
import styled from 'styled-components';
import { JsxElement } from 'typescript';
import SoccerWallpaper from '../../asset/images/soccer_wallpaper.jpg';

export function AuthTemplate({ children }: AuthTemplateProps) {
    return (
        <AuthBackground>
            { children }
        </AuthBackground>
    );
}

type AuthTemplateProps = {
    children?: JSX.Element | JSX.Element[]
}

const AuthBackground = styled.main`
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-image: url(${SoccerWallpaper});
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0, 0.5);
        z-index: 0;
    }
`;