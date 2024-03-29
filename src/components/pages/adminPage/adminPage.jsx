import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import {
    getCurrentUserData,
    loadUser,
    getIsLoggedIn
} from "../../../store/user";
import {
    getArticles,
    getArticlesLoadingStatus,
    loadArticlesList,
    removeArticle
} from "../../../store/articles";
import { LinearProgress, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import adminPageStyles from "./adminPage.module.css";

const backColor = blue[50];

const AdminPage = () => {
    const params = useParams();
    const { userId } = params;
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUser = useSelector(getCurrentUserData());
    const articles = useSelector(getArticles());
    const isLoading = useSelector(getArticlesLoadingStatus());

    useEffect(() => {
        document.title = "Мои статьи";
    }, []);

    useEffect(() => {
        dispatch(loadUser());
        dispatch(loadArticlesList());
    }, [isLoggedIn]);

    const userArticles =
        articles && isLoggedIn
            ? articles.filter((a) => a.userId === currentUser._id)
            : "Loading";

    const handleRemoveArticle = (id) => {
        dispatch(removeArticle(id));
    };

    if (currentUser && userId !== currentUser._id) {
        return <Redirect to="/404" />;
    }

    if (!isLoading && isLoggedIn && articles) {
        return (
            <div className={adminPageStyles.container}>
                {userArticles.map((article) => (
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        key={article._id}
                        sx={{
                            width: 345,
                            height: 130,
                            bgcolor: backColor,
                            marginBottom: 5,
                            p: 1,
                            position: "relative"
                        }}
                    >
                        <Link
                            style={{
                                color: "inherit",
                                textDecoration: "none"
                            }}
                            to={`/articles/${article._id}`}
                        >
                            {article.title}
                        </Link>
                        <IconButton
                            aria-label="exit"
                            style={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                color: "inherit"
                            }}
                            onClick={() => handleRemoveArticle(article._id)}
                        >
                            <HighlightOffIcon />
                        </IconButton>

                        <Link
                            aria-label="exit"
                            style={{
                                position: "absolute",
                                bottom: 5,
                                right: 35,
                                color: "inherit",
                                textDecoration: "none"
                            }}
                            to={`/articles/${article._id}/edit`}
                        >
                            <EditIcon />
                        </Link>
                    </Typography>
                ))}
            </div>
        );
    } else {
        return <LinearProgress sx={{ mt: 6 }} color="info" />;
    }
};

AdminPage.propTypes = {
    articleId: PropTypes.string
};

export default AdminPage;
