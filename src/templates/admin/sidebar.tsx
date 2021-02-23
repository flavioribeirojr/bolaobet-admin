import React, { useState } from 'react';
import { faBars, faCommentDollar, faUserTag, faWallet, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import { SidebarItem } from './sidebar-item';
import { faFutbol } from '@fortawesome/free-regular-svg-icons';

export function Sidebar() {
    const [ isSidebarCollapsed, setSidebarCollapse ] = useState(false);

    return (
        <Aside collapsed={isSidebarCollapsed}>
            <TitleBar collapsed={isSidebarCollapsed}>
                <Title collapsed={isSidebarCollapsed}>
                    BolaoBET
                </Title>

                <SidebarToggleButton onClick={() => setSidebarCollapse(!isSidebarCollapsed)}>
                    <SidebarToggleIcon icon={faBars} />
                </SidebarToggleButton>
            </TitleBar>
            <nav>
                <SidebarItem
                    title="Apostas"
                    link="/apostas"
                    icon={faCommentDollar}
                    iconColor="#5e72e4"
                    collapsed={isSidebarCollapsed}
                />
                <SidebarItem
                    title="Cambistas"
                    link="/cambistas"
                    icon={faUserTag}
                    iconColor="#1ebdd7"
                    collapsed={isSidebarCollapsed}
                    isCurrentlyAvailable={false}
                />
                <SidebarItem
                    title="Jogadores"
                    link="/jogadores"
                    icon={faFutbol}
                    iconColor="#ff881e"
                    collapsed={isSidebarCollapsed}
                    isCurrentlyAvailable={false}
                />
                <SidebarItem
                    title="Financeiro"
                    link="/financeiro"
                    icon={faWallet}
                    iconColor="#36c136"
                    collapsed={isSidebarCollapsed}
                    isCurrentlyAvailable={false}
                />
            </nav>
            <SidebarFooterButton collapsed={isSidebarCollapsed}>
                <SidebarFooterButtonIcon collapsed={isSidebarCollapsed} icon={faPowerOff} /> { !isSidebarCollapsed && 'Encerrar Sessão' }
            </SidebarFooterButton>
        </Aside>
    );
}

const Aside = styled.aside`
    background-color: white;
    height: 100vh;
    width: 15%;
    box-shadow: 0 -5px 10px #e7e7e7;
    position: relative;
    display: flex;
    flex-direction: column;
    transition: width .4s linear;

    ${ (props: AsideProps) => props.collapsed && css
        `
            width: 5%;
            overflow: hidden;
        `
    }
`;

type AsideProps  = {
    collapsed?: boolean;
}

const TitleBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    padding: 0 15px;

    ${ (props: AsideProps) => props.collapsed && css`justify-content: center;` }
`;

const Title = styled.h1`
    font-size: 1.5rem;
    color: #ff3636;

    ${ (props: AsideProps) => props.collapsed && css`display: none;` }
`;

const SidebarToggleButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;

    &:active {
        outline: none;
    }
`;

const SidebarToggleIcon = styled(FontAwesomeIcon)`
    font-size: 14px;
    color: #1f1f1f;
`;

const SidebarFooterButton = styled.button`
    cursor: pointer;
    border: none;
    border-top: 1px solid #e7e7e7;
    background-color: transparent;
    margin-top: auto;
    width: 100%;
    height: 50px;
    padding: 15px;
    outline: none;
    text-align: left;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #686868;

    ${(props: { collapsed: boolean }) => props.collapsed && css`
        justify-content: center;
    `}
`;

const SidebarFooterButtonIcon = styled(FontAwesomeIcon)`
    color: #4d4d4d;
    font-size: 18px;
    margin-right: 10px;

    ${(props: { collapsed: boolean }) => props.collapsed && css`
        margin-right: 0;
    `}
`;