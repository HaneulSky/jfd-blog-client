import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getArticlesLoadingStatus,
    loadArticlesList
} from "../../../store/articles";
import PropTypes from "prop-types";

const ArticlesLoader = ({ children }) => {
    const dataStatus = useSelector(getArticlesLoadingStatus());
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dataStatus) dispatch(loadArticlesList());
    }, []);

    // if (!dataStatus) return "Loading";

    return children;
};

ArticlesLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ArticlesLoader;
