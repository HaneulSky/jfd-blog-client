import React from "react";
import PropTypes from "prop-types";
import styles from "./searchInput.module.css";

const SearchInput = ({ searchQuery, handleSearchQuery }) => {
    return (
        <input
            className={styles.searchInput}
            type="text"
            name="search"
            placeholder="поиск..."
            value={searchQuery}
            onChange={handleSearchQuery}
        />
    );
};

SearchInput.propTypes = {
    searchQuery: PropTypes.string,
    handleSearchQuery: PropTypes.func
};

export default SearchInput;
