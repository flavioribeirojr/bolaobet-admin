import styled from 'styled-components';
import CurrencyInput from 'react-currency-input-field';

export const MoneyInput = styled(CurrencyInput)`
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
`;