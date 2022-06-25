import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserData, getIsLoggedIn, loadUser } from "../../store/user";
import { Button, IconButton } from "@mui/material";

const NavBar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUser = useSelector(getCurrentUserData());
    useEffect(() => {
        dispatch(loadUser());
    }, [isLoggedIn]);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link
                        style={{ color: "inherit", textDecoration: "none" }}
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
                        >
                            <Link
                                style={{
                                    color: "inherit",
                                    textDecoration: "none"
                                }}
                                to={`/${currentUser._id}`}
                            >
                                Мои статьи
                            </Link>
                        </Typography>

                        <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to="/addArticle"
                        >
                            <Button variant="contained" color="info">
                                Добавить статью
                            </Button>
                        </Link>
                    </>
                )}

                {currentUser ? (
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, ml: 6 }}
                    >
                        <Link
                            to="/:userId"
                            style={{ color: "inherit", textDecoration: "none" }}
                        >
                            {currentUser.name}
                        </Link>
                        <Link to="/logout">
                            <IconButton aria-label="exit">
                                <ExitToAppIcon />
                            </IconButton>
                        </Link>
                    </Typography>
                ) : (
                    <Link
                        style={{ color: "inherit", textDecoration: "none" }}
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
