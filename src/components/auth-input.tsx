import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

export function AuthInput(props: AuthInputProps) {
    return (
        <Group>
            <GroupIcon icon={props.icon} />
            <Input
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                autoComplete="off"
                onChange={props.onChange}
            />
        </Group>
    );
}

type AuthInputProps = {
    icon: IconProp,
    name: string,
    type: string,
    placeholder?: string,
    value?: any,
    onChange?: (event: any) => any
}

const Group = styled.div`
    height: 55px;
    border: 2px solid #e2e2e2;
    border-radius: 4px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
`;

const GroupIcon = styled(FontAwesomeIcon)`
    color: #b0b0b0;
    margin-right: 8px;
`;

const Input = styled.input`
    flex-grow: 1;
    border: none;
    color: #696969;
    outline: none;
    font-size: .9em;

    &:invalid {
        box-shadow: none;
    }
`;