import React from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

function PaginationWrapper(props: PaginationProps) {
    const totalPages = Math.ceil(props.count / props.perPage);

    if (totalPages < 2) {
        return null;
    }

    return (
        <ReactPaginate
            containerClassName={props.className}
            previousLabel=""
            previousClassName="pagination-prev"
            nextLabel=""
            nextClassName="pagination-next"
            breakLabel="..."
            breakClassName="break-me"
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={({ selected }) => props.onPageChange(selected)}
        />
    );
}

type PaginationProps = {
    perPage: number;
    count: number;
    onPageChange: (page: number) => any;
    className?: string;
}

const StyledReactPaginate = styled(PaginationWrapper)`
    padding-left: 0;
    list-style: none;
    display: inline-flex;
    align-items: center;

    >li {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #8898aa;
        background-color: white;
        width: 35px;
        height: 35px;
        border-radius: 100%;
        border: 1px solid #e8e8e8;
        font-size: .8em;
        cursor: pointer;

        &.selected {
            background-color: #5e72e4;
            color: white;
            font-weight: 700;
            border-color: #5e72e4;
        }

        &:not(:last-of-type) {
            margin-right: 10px;
        }

        &.pagination-prev::before {
            font-family: "Font Awesome 5 Free";
            font-weight: 900;
            content: "\f104";
        }

        &.pagination-next::before {
            font-family: "Font Awesome 5 Free";
            font-weight: 900;
            content: "\f105";
        }
    }
`;

export function Pagination(props: PaginationProps) {
    return <StyledReactPaginate {...props} />
}