import React, { useEffect } from "react";
import { getArticlesByIds, loadArticlesList } from "../../../store/articles";
import { getCurrentUserData } from "../../../store/user";
import { useSelector, useDispatch } from "react-redux";
import { Box, LinearProgress, Button } from "@mui/material";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ImageCard from "../../common/imageCard/imageCard";
import styles from "./articlePage.module.css";

const ArticlePage = ({ articleId }) => {
    const dispatch = useDispatch();
    const ArticleById = useSelector(getArticlesByIds(articleId));
    const currentUser = useSelector(getCurrentUserData());

    useEffect(() => {
        dispatch(loadArticlesList());
    }, []);

    if (ArticleById) {
        return (
            <Box
                elevation={3}
                className={styles.container}
            >
                {currentUser._id.toString() ===
                    ArticleById.userId.toString() && (
                        <Link to={`/articles/${articleId}/edit`} className={styles.editButton}>
                            <Button variant="contained">Редактировать</Button>
                        </Link>
                    )}
                {currentUser._id.toString() ===
                    ArticleById.userId.toString() && (
                    <Link to={`/articles/${articleId}/edit`} className={styles.editButtonIcon}>
                      <BorderColorRoundedIcon />
                    </Link>
                    )}
                <div>
                    { ArticleById.urlImage && <ImageCard
                        image={ArticleById.urlImage}
                        articleTitle={ArticleById.title}
                    ></ImageCard>}
                </div>
                <div className={styles.articleContainer}>
                    <h2 className={styles.title}>
                        {ArticleById.title}
                    </h2>

                    <p className={styles.text}>
                        {ArticleById.content}
                    </p>
                    {ArticleById.link ? (
                        <Button
                            className={styles.buttonToSource}
                            href={ArticleById.link}
                            variant="outlined"
                        >
                            Источник
                        </Button>
                    ) : null}
                </div>
            </Box>
        );
    } else {
        return <LinearProgress sx={{ mt: 6 }} color="info" />;
    }
};

ArticlePage.propTypes = {
    articleId: PropTypes.string
};

export default ArticlePage;
