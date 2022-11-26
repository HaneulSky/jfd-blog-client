import React, { useEffect } from "react";
import { getArticlesByIds, loadArticlesList } from "../../../store/articles";
import { getCurrentUserData } from "../../../store/user";
import { useSelector, useDispatch } from "react-redux";
import { Box, LinearProgress, Button } from "@mui/material";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import ImageCard from "../../common/imageCard/imageCard";
import styles from "./articlePage.module.css";
import Comments from "../../ui/comments/comments";
import { formatDate } from "../../../utils/formatDate";

const ArticlePage = ({ articleId }) => {
    const dispatch = useDispatch();
    const ArticleById = useSelector(getArticlesByIds(articleId));
    const currentUser = useSelector(getCurrentUserData());
    const history = useHistory();
    const pageTitle = ArticleById ? ArticleById.title : "Loading...";

    useEffect(() => {
        dispatch(loadArticlesList());
    }, []);
    useEffect(() => {
        document.title = pageTitle;
    }, [ArticleById]);

    if (ArticleById) {
        return (
            <>
                <Box elevation={3} className={styles.container}>
                    <div className={styles.buttons}>
                        {currentUser._id.toString() ===
                            ArticleById.userId.toString() && (
                            <Link
                                to={`/articles/${articleId}/edit`}
                                className={`${styles.button} ${styles.editButton}`}
                            >
                                <Button variant="contained">
                                    Редактировать
                                </Button>
                            </Link>
                        )}
                        <Button
                            variant="contained"
                            className={styles.button}
                            onClick={() => history.goBack()}
                        >
                            {" "}
                            <ArrowBackIosNewIcon />
                            Назад
                        </Button>
                    </div>
                    <div className={styles.buttonIcon}>
                        <Button
                            variant="contained"
                            className={styles.button}
                            onClick={() => history.goBack()}
                        >
                            {" "}
                            <ArrowBackIosNewIcon />
                        </Button>
                        {currentUser._id.toString() ===
                            ArticleById.userId.toString() && (
                            <Link to={`/articles/${articleId}/edit`}>
                                <BorderColorRoundedIcon />
                            </Link>
                        )}
                    </div>
                    <div>
                        {ArticleById.urlImage && (
                            <ImageCard
                                image={ArticleById.urlImage}
                                articleTitle={ArticleById.title}
                            ></ImageCard>
                        )}
                    </div>
                    <div className={styles.articleContainer}>
                        <h2 className={styles.title}>{ArticleById.title}</h2>

                        <p className={styles.text}>{ArticleById.content}</p>
                        {ArticleById.link ? (
                            <Button
                                className={styles.buttonToSource}
                                href={ArticleById.link}
                                variant="outlined"
                                target="_blank"
                            >
                                Источник
                            </Button>
                        ) : null}
                        <p className={styles.date}>
                            Дата публикации:{" "}
                            {formatDate(ArticleById.created_at)}
                        </p>
                    </div>
                </Box>
                <div>
                    <Comments />
                </div>
            </>
        );
    } else {
        return <LinearProgress sx={{ mt: 6 }} color="info" />;
    }
};

ArticlePage.propTypes = {
    articleId: PropTypes.string
};

export default ArticlePage;
