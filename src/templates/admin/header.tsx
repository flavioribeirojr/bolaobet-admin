import React from 'react';
import styled from 'styled-components';
import AvatarImage from '../../asset/images/avatar.png';

export function Header() {
    return (
        <HeaderBackground>
            <Navigation>
                <UserContext>
                    <UserPicture src={AvatarImage} />
                    <UserName>
                        Quentin Tarantino
                    </UserName>
                </UserContext>
            </Navigation>
        </HeaderBackground>
    );
}

const HeaderBackground = styled.header`
    height: 210px;
    background-color: #38d794;
`;

const Navigation = styled.nav`
    display: flex;
    align-items: center;
    padding: 15px;
`;

const UserContext = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`;

const UserPicture = styled.img`
    width: 35px;
    height: 35px;
    object-fit: cover;
    margin-right: 10px;
`;

const UserName = styled.p`
    color: white;
    font-weight: 600;
    font-size: 14px;
`;