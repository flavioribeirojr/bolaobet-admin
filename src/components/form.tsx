import React from 'react';
import { useField } from 'formik';
import styled, { css } from 'styled-components';
import { Spinner } from './spinner';

export const FormRow = styled.div`
    display: grid;
    column-gap: 10px;
    margin-bottom: 25px;

    ${(props: { templateColumns: string }) => css`
        grid-template-columns: ${props.templateColumns};
    `}
`;

export const FormField = styled.div``;

export const FormLabel = styled.label`
    color: rgb(73,72,72);
    font-size: .875rem;
    font-weight: 600;
    display: block;
    margin-bottom: 10px;
`;

export function FormError(props: FormErrorProps) {
    const [ field, fieldMeta ] = useField(props.field);

    if (fieldMeta.error && fieldMeta.touched) {
        return (
            <StyledFormError>
                { fieldMeta.error }
            </StyledFormError>
        );
    }

    return null;
}

type FormErrorProps = {
    field: string
}

const StyledFormError = styled.p`
    font-size: 13px;
    font-weight: 600;
    color: red;
    margin-top: 6px;
`;

export const FormInput = styled.input`
    display: block;
    width: 100%;
    height: calc(1.5em + 1.25rem + 2px);
    padding: .625rem .75rem;
    font-weight: 400;
    line-height: 1.5;
    color: #8898aa;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #dee2e6;
    border-radius: .25rem;
    box-shadow: 0 3px 2px rgba(233,236,239,.05);

    &:focus {
        color: #8898aa;
        background-color: #fff;
        border-color: #5e72e4;
        outline: 0;
        box-shadow: 0 3px 9px rgba(50,50,9,0),3px 4px 8px rgba(94,114,228,.1);
    }

    &:disabled {
        background-color: #f6f6f6;
    }
`;

export const SubmitButton = styled.button`
    text-transform: none;
    transition: all .15s ease;
    letter-spacing: .025em;
    font-size: .875rem;
    color: #fff;
    background-color: #2dce89;
    border-color: #2dce89;
    box-shadow: 0 4px 6px rgba(50,50,93,.11),0 1px 3px rgba(0,0,0,.08);
    border: 1px solid transparent;
    padding: .625rem 1.25rem;
    line-height: 1.5;
    border-radius: .25rem;
    cursor: pointer;
    margin-top: 20px;
    width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SubmitButtonSpinner = styled(Spinner)`
    width: 30px;
    height: 30px;
`;