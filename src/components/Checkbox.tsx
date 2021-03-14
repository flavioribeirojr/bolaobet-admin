import React from 'react';
import styled from 'styled-components';

export function Checkbox(props: CheckboxProps) {
    return (
        <div className={`pretty p-default p-curve ${props.className || ''}`}>
            { props.input }
            <div className={`state ${ props.color ? `p-${props.color}` : '' }`}>
                <CheckboxContent>
                    { props.children }
                </CheckboxContent>
            </div>
        </div>
    );
}

type CheckboxProps = {
    children: JSX.Element | JSX.Element[] | string,
    input: JSX.Element,
    color?: 'primary' | 'success' | 'info' | 'warning' | 'danger',
    className?: string
}

const CheckboxContent = styled.label`
    &::before {
        top: 0!important;
        background-color: white!important;
    }

    &::after {
        top: 0!important;
    }
`;