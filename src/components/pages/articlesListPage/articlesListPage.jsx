import React, { useEffect, useState } from "react";
import Article from "../../ui/articleCard/article";
// import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import { getArticles, loadArticlesList } from "../../../store/articles";
import { LinearProgress } from "@mui/material";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/Pagination";
import PaginationProvider from "../../../hooks/usePagination";
import SearchInput from "../../common/searchInput/searchInput";
import style from "./articlesListPage.module.css";

const ArticlesListPage = () => {
    const dispatch = useDispatch();
    const articles = useSelector(getArticles());
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
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
    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
    };

    function filterArticles(articles) {
        const filteredArticles = searchQuery
            ? articles.filter(
                  (article) =>
                      article.title
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : articles;
        return filteredArticles;
    }

    const filteredArticles = filterArticles(articles);
    const count = articles ? filteredArticles.length : null;

    const articlesCrop = paginate(filteredArticles, currentPage, pageSize);

    if (!articles) {
        return <LinearProgress sx={{ mt: 6 }} color="info" />;
    }

    return (
        <>
            <SearchInput
                handleSearchQuery={handleSearchQuery}
                value={searchQuery}
            />
            <div className={style.container}>
                {articles &&
                    articlesCrop.map((article) => (
                        <Article key={article._id} {...article} />
                    ))}
            </div>
            <PaginationProvider count={count}>
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
