import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { loadArticlesList } from "../store/articles";

const PaginationContext = React.createContext();

export const usePagination = () => {
    return useContext(PaginationContext);
};

const PaginationProvider = ({ children, count }) => {
    const dispatch = useDispatch();
    const pageSize = 8;

    useEffect(() => {
        dispatch(loadArticlesList());
    }, []);

    const pageCount = Math.ceil(count / pageSize);
    if (pageCount === 1) return null;

    const pages = _.range(1, pageCount + 1);

    return (
        <PaginationContext.Provider value={{ pages }}>
            {children}
        </PaginationContext.Provider>
    );
};

PaginationProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    count: PropTypes.number
};

export default PaginationProvider;
