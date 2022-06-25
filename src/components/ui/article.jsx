import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getArticlesByIds } from "../../store/articles";

const Article = ({ _id }) => {
    const ArticlesById = useSelector(getArticlesByIds(_id));
    const cutContent = ArticlesById.content
        ? ArticlesById.content.slice(0, 58) + "..."
        : "Loading...";

    return (
        <div className="card" style={{ width: 18 + "rem" }}>
            <div className="card-body">
                <h5 className="card-title">{ArticlesById.title}</h5>
                <p className="card-text">{cutContent}</p>
                <Link
                    size="small"
                    className="btn btn-primary"
                    to={`/articles/${ArticlesById._id}`}
                >
                    Открыть
                </Link>
            </div>
        </div>
    );
};

Article.propTypes = {
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    content: PropTypes.string,
    link: PropTypes.string
};

export default Article;
