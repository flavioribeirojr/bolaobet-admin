import styled, { css } from 'styled-components';

export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;

    thead {
        th {
            background-color: #f6f9fc;
            color: #8898aa;
            padding: .75rem 1.5rem;
            font-size: .7em;
            border-top: 1px solid #e9ecef;
            border-bottom: 1px solid #e9ecef;
            text-align: left;
            font-weight: 600;
            text-transform: uppercase;
        }
    }

    tbody {
        td {
            padding: 1rem 1.5rem;
            color: #525f7f;
            border-top: 1px solid #e9ecef;
            padding: .75rem 1.5rem;
            font-size: .9em;
            text-align: left;
        }
    }

    ${ (props: { selectable?: boolean }) => props.selectable && css`
        tbody tr {
            transition: background-color .1s linear;
            cursor: pointer;

            &:hover {
                background-color: #f8f8f8;
            }
        }
    `}
`;