import { createAction, createSlice } from "@reduxjs/toolkit";
import articleService from "../services/articles.service";
import history from "../utils/history";
import { getCurrentUserId } from "./user";

const articlesSlice = createSlice({
    name: "articles",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        articlesRequested: (state) => {
            state.isLoading = true;
        },
        articlesReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        articlesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        articleCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        articleRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (article) => article._id !== action.payload
            );
        },
        articleUpdateSuccesed: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
            ] = action.payload;
        }
    }
});

const { actions, reducer: articlesReducer } = articlesSlice;
const {
    articlesReceved,
    articlesRequestFiled,
    articlesRequested,
    articleCreated,
    articleRemoved,
    articleUpdateSuccesed
} = actions;

const articleCreateRequested = createAction("articles/articleCreateRequested");
const createArticleFailed = createAction("articles/createArticleFailed");
const updateArticleRequested = createAction("articles/updateArticleRequested");
const updateArticleFailed = createAction("articles/updateArticleFailed");
const removeArticleRequested = createAction("articles/removeArticleRequested");

// function isOutDated(date) {
//     if (Date.now() - date > 10 * 60 * 1000) {
//         return true;
//     }
//     return false;
// }

export const loadArticlesList = () => async (dispatch) => {
    dispatch(articlesRequested());
    try {
        const { content } = await articleService.get();
        dispatch(articlesReceved(content));
    } catch (error) {
        dispatch(articlesRequestFiled(error.message));
    }
};

export const createNewArticle = (payload) => async (dispatch, getState) => {
    dispatch(articleCreateRequested());
    try {
        const { content } = await articleService.create({
            ...payload,
            userId: getCurrentUserId()(getState())
        });
        dispatch(articleCreated(content));
        history.push("/");
    } catch (error) {
        dispatch(createArticleFailed(error.message));
    }
};

export const removeArticle = (articleId) => async (dispatch) => {
    dispatch(removeArticleRequested());
    try {
        await articleService.remove(articleId);
        dispatch(articleRemoved(articleId));
    } catch (error) {
        dispatch(articlesRequestFiled(error.message));
    }
};

export const updateArticle = (payload) => async (dispatch) => {
    dispatch(updateArticleRequested());
    try {
        const { content } = await articleService.update(payload);
        dispatch(articleUpdateSuccesed(content));
        history.push("/");
    } catch (error) {
        dispatch(updateArticleFailed(error.message));
    }
};

export const getArticles = () => (state) => state.articles.entities;
export const getArticlesLoadingStatus = () => (state) =>
    state.articles.isLoading;
export const getArticlesByIds = (artId) => (state) => {
    if (state.articles.entities) {
        return state.articles.entities.find(
            (a) => a._id === artId
        );
    };
};

export default articlesReducer;
