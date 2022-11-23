import React from "react";
import ArticlesListPage from "../components/pages/articlesListPage/articlesListPage";
import Information from "../components/common/information";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../store/user";

const Main = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    return (
        <>
            {isLoggedIn && <ArticlesListPage />}
            {!isLoggedIn && <Information />}
        </>
    );
};

export default Main;
