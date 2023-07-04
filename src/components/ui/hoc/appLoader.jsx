import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIsLoggedIn } from "../../../store/user";
import {
    getArticlesLoadingStatus,
    loadArticlesList
} from "../../../store/articles";
import PropTypes from "prop-types";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const articlesLoadingStatus = useSelector(getArticlesLoadingStatus());
    useEffect(() => {
        dispatch(loadArticlesList()); // articles
    }, [isLoggedIn]); // isLoggedIn

    if (articlesLoadingStatus) return "loading";

    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
