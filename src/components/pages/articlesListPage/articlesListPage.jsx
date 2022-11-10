import React, { useEffect, useState } from "react";
import Article from "../../ui/articleCard/article";
// import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import { getArticles, loadArticlesList } from "../../../store/articles";
import { LinearProgress } from "@mui/material";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/Pagination";
import PaginationProvider from "../../../hooks/usePagination";
import style from "./articlesListPage.module.css";

const ArticlesListPage = () => {
    const dispatch = useDispatch();
    const articles = useSelector(getArticles());
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    useEffect(() => {
        dispatch(loadArticlesList());
    }, []);

    useEffect(() => {
        document.title = "Главная myBlog";
    }, []);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const articlesCrop = paginate(articles, currentPage, pageSize);

    if (!articles) {
        return <LinearProgress sx={{ mt: 6 }} color="info" />;
    }

    return (
        <>
            <div className={style.container}>
                {articles &&
                    articlesCrop.map((article) => (
                        <Article key={article._id} {...article} />
                    ))}
            </div>
            <PaginationProvider>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {articles && (
                        <Pagination
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    )}
                </div>
            </PaginationProvider>
        </>
    );
};

export default ArticlesListPage;
