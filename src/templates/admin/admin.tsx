import React from 'react';
import styled from 'styled-components';
import { Header } from './header';
import { Sidebar } from './sidebar';

export function AdminTemplate({ children }: AdminTemplateProps) {
    return (
        <ScreenGrid>
            <Sidebar />

            <Content>
                <Header />
                <MainContent>
                    { children }
                </MainContent>
            </Content>
        </ScreenGrid>
    );
}

const ScreenGrid = styled.div`
    display: flex;
`;

type AdminTemplateProps = {
    children: JSX.Element[]
}

const Content = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.main`
    flex-grow: 1;
    margin-top: -90px;
    padding: 0 50px;
`;