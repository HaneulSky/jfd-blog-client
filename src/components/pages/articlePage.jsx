import React, { useEffect } from "react";
import { getArticlesByIds, loadArticlesList } from "../../store/articles";
import { getCurrentUserData } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, LinearProgress, Button } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ImageCard from "../common/imageCard";

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
                sx={{
                    display: "flex",
                    width: 80 + "%",
                    mx: "auto",
                    mt: 5,
                    mb: 5
                }}
            >
                <ImageCard
                    image={ArticleById.urlImage}
                    articleTitle={ArticleById.title}
                ></ImageCard>
                <div style={{ width: 60 + "%", marginLeft: 40 }}>
                    {currentUser._id.toString() ===
                        ArticleById.userId.toString() && (
                        <Link to={`/articles/${articleId}/edit`}>
                            <Button variant="contained">Редактировать</Button>
                        </Link>
                    )}
                    <Typography
                        sx={{ mt: 3 }}
                        variant="h2"
                        gutterBottom
                        component="div"
                    >
                        {ArticleById.title}
                    </Typography>

                    <Typography
                        sx={{ my: 5, whiteSpace: "pre-line" }}
                        variant="body1"
                        gutterBottom
                    >
                        {ArticleById.content}
                    </Typography>
                    {ArticleById.link ? (
                        <Button
                            style={{ textDecoration: "none", color: "inherit" }}
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
