import React from "react";
import { useParams } from "react-router-dom";
import ArticlePage from "../components/pages/articlePage";
import EditArticlePage from "../components/pages/editArticlePage";
import AdminPage from "../components/pages/adminPage";
import ArticlesLoader from "../components/ui/hoc/articlesLoader";

const Articles = () => {
    const params = useParams();
    console.log(params);
    const { articleId, edit } = params;

    return (
        <>
            <ArticlesLoader>
                {articleId ? (
                    edit ? (
                        <EditArticlePage />
                    ) : (
                        <ArticlePage articleId={articleId} />
                    )
                ) : (
                    <AdminPage articleId={articleId} />
                )}
            </ArticlesLoader>
        </>
    );
};

export default Articles;
