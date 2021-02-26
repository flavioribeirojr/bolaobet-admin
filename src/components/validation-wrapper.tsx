import { FormikConsumer, useField, useFormikContext } from 'formik';
import React from 'react';
import styled from 'styled-components';

export function ValidationWrapper(props: ValidationWrapperProps) {
    const {
        errors,
        touched
    } = useFormikContext<any>();

    return (
        <Wrapper className={props.className}>
            { props.children }
            {
                (errors[props.name] && touched[props.name]) && (
                    <ValidationMessage>
                        { errors[props.name] }
                    </ValidationMessage>
                )
            }
        </Wrapper>
    )
}

type ValidationWrapperProps = {
    name: string,
    className?: string,
    children: JSX.Element | JSX.Element[]
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const ValidationMessage = styled.p`
    font-size: 0.8em;
    color: #f15757;
    font-weight: bold;
    margin-top: 5px;
`;