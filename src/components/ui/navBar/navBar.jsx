import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserData, getIsLoggedIn, loadUser } from "../../../store/user";
import { Button, IconButton } from "@mui/material";
import navBarStyles from "./navBar.module.css";

const NavBar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUser = useSelector(getCurrentUserData());
    useEffect(() => {
        dispatch(loadUser());
    }, [isLoggedIn]);

    return (
        <AppBar position="static">
            <Toolbar className={navBarStyles.navBar}>
                <Typography className={navBarStyles.linkContainer} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link
                        className={navBarStyles.link}
                        to="/"
                    >
                        Главная
                    </Link>
                </Typography>

                {isLoggedIn && currentUser && (
                    <>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                            className={navBarStyles.linkContainer}
                        >
                            <Link
                                className={navBarStyles.link}
                                to={`/${currentUser._id}`}
                            >
                                Мои статьи
                            </Link>
                        </Typography>

                        <Link
                            className={navBarStyles.linkContainer}
                            to="/addArticle"
                        >
                            <Button className={navBarStyles.button} variant="contained" color="info">
                                Добавить статью
                            </Button>
                            <AddCircleOutlineIcon className={navBarStyles.iconButton} />
                        </Link>
                    </>
                )}

                {currentUser ? (
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, ml: 6 }}
                        className={navBarStyles.linkContainer}
                    >
                        <p
                            className={navBarStyles.link}
                        >
                            {currentUser.name}

                        <Link to="/logout">
                            <IconButton aria-label="exit">
                                <ExitToAppIcon />
                            </IconButton>
                        </Link></p>
                    </Typography>
                ) : (
                    <Link
                        className={navBarStyles.link}
                        to="/login"
                    >
                        Войти
                    </Link>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
