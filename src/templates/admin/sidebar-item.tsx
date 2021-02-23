import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled, { css } from 'styled-components';

export function SidebarItem({ icon, iconColor, title, collapsed, isCurrentlyAvailable = true }: SidebarItemProps) {
    return (
        <NavigationLink collapsed={collapsed}>
            <Icon
                icon={icon}
                color={iconColor}
                collapsed={collapsed}
            />

            <NavigationTitle collapsed={collapsed}>
                { title }
            </NavigationTitle>
            {
                isCurrentlyAvailable && (
                    <NavigationButton collapsed={collapsed}>
                        <NavigationButtonIcon icon={faAngleRight} />
                    </NavigationButton>
                )
            }
            {
                !isCurrentlyAvailable && (
                    <ComingSoonBadge collapsed={collapsed}>
                        <ComingSoonIcon icon={faExclamationCircle} />
                        {
                            !collapsed && <ComingSoonText>EM BREVE</ComingSoonText>
                        }
                    </ComingSoonBadge>
                )
            }
        </NavigationLink>
    )
}

type SidebarItemProps = {
    icon: IconProp,
    iconColor: string,
    link: string,
    title: string,
    isCurrentlyAvailable?: boolean,
    collapsed?: boolean
}

type NavigationLinkProps = {
    collapsed?: boolean;
}

const NavigationLink = styled.a`
    display: grid;
    grid-template-columns: 40px auto auto;
    align-items: center;
    padding: 16px;
    background-color: transparent;
    position: relative;
    transition: background-color .4s linear;

    &:hover {
        background-color: #e5e5e563;
    }

    ${ (props: NavigationLinkProps) => props.collapsed && css`justify-content: center;grid-template-columns: auto;` }
`;

const NavigationTitle = styled.span`
    color: rgba(0,0,0,.6);
    font-size: 15px;

    ${ (props: NavigationLinkProps) => props.collapsed && css`display: none;` }
`;

type IconProps = {
    collapsed?: boolean;
    color: string;
}

const Icon = styled(FontAwesomeIcon)`
    font-size: 20px;

    ${(props: IconProps) => css`color: ${props.color};${props.collapsed && css`margin-right: 0;`}`}
`;

const NavigationButton = styled.button`
    background-color: transparent;
    border: none;
    margin-left: auto;

    ${ (props: NavigationLinkProps) => props.collapsed && css`display: none;` }
`;

const NavigationButtonIcon = styled(FontAwesomeIcon)`
    color: #d0d0d0;
    font-size: 16px;
`;

const ComingSoonBadge = styled.div`
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;

    ${(props: { collapsed?: boolean }) => props.collapsed && css`
        top: 8px;
        right: 15px;
    `}
`;

const ComingSoonIcon = styled(FontAwesomeIcon)`
    color: #ff3636;
    margin-right: 8px;
    font-size: 13px;
`;

const ComingSoonText = styled.p`
    font-weight: 800;
    font-size: 11px;
    color: #ff3636;
`;