import { createSlice, createAction } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { getCurrentUserId } from "./user";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (comment) => comment._id !== action.payload
            );
        }
    }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const {
    commentsReceved,
    commentsRequestFiled,
    commentsRequested,
    commentCreated,
    commentRemoved
} = actions;

const createCommentRequested = createAction("comments/createCommentRequested");
const createCommentFailed = createAction("comments/createCommentFailed");

export const loadCommentsList = (articleId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(articleId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};

export const createComment = (payload) => async (dispatch, getState) => {
    dispatch(createCommentRequested());
    try {
        const { content } = await commentService.createComment({
            ...payload,
            userId: getCurrentUserId()(getState())
        });
        dispatch(commentCreated(content));
    } catch (error) {
        createCommentFailed(error.message);
    }
};

export const removeComment = (id) => async (dispatch) => {
    try {
        await commentService.removeComment(id);
        dispatch(commentRemoved(id));
    } catch (error) {
        commentsRequestFiled(error.message);
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
