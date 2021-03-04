import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const PageNav = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

export const PageTitle = styled.h2`
    color: white;
    font-weight: 800;
    font-size: 22px;
`;

export const PageNavOptions = styled.div`
    margin-left: auto;
`;

export const PageNavLink = styled(Link)`
    display: inline-block;
    border: none;
    border-radius: 25px;
    padding: 8px 20px;
    text-decoration: none;
    font-size: 0.9em;
    font-weight: 900;
    background-color: white;

    ${ (props: { color: string }) => css`
        color: ${props.color};
    `}
`;