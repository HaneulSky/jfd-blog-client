import React from "react";
import PropTypes from "prop-types";
import { usePagination } from "../../hooks/usePagination";

const Pagination = ({ onPageChange, currentPage }) => {
    const { pages } = usePagination();

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        className={
                            "page-item " +
                            (page === currentPage ? "active" : "")
                        }
                        key={page}
                    >
                        <a
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    onPageChange: PropTypes.func,
    currentPage: PropTypes.number
};

export default Pagination;
