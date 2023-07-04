import { createAction, createSlice } from "@reduxjs/toolkit";
import imageService from "../services/image.service";
import history from "../utils/history";
import { getCurrentUserId } from "./user";

const imagesSlice = createSlice({
    name: "images",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        imagesRequested: (state) => {
            state.isLoading = true;
        },
        imagesReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        imagesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        imagesCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        imagesRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (article) => article._id !== action.payload
            );
        }
    }
});

const { actions, reducer: imagesReducer } = imagesSlice;
const {
    imagesReceved,
    imagesRequestFiled,
    imagesRequested,
    imageCreated,
    imageRemoved
} = actions;

const imageCreateRequested = createAction("images/imageCreateRequested");
const createImageFailed = createAction("images/createImageFailed");
const removeImageRequested = createAction("images/removeImageRequested");

// function isOutDated(date) {
//     if (Date.now() - date > 10 * 60 * 1000) {
//         return true;
//     }
//     return false;
// }

export const loadImagesList = () => async (dispatch) => {
    dispatch(imagesRequested());
    try {
        const { content } = await imageService.get();
        dispatch(imagesReceved(content));
    } catch (error) {
        dispatch(imagesRequestFiled(error.message));
    }
};

export const createNewImage = (payload) => async (dispatch, getState) => {
    dispatch(imageCreateRequested());
    try {
        const { content } = await imageService.create({
            ...payload,
            userId: getCurrentUserId()(getState()) // articleid
        });
        dispatch(imageCreated(content));
        history.push("/");
    } catch (error) {
        dispatch(createImageFailed(error.message));
    }
};

export const removeImage = (imageId) => async (dispatch) => {
    dispatch(removeImageRequested());
    try {
        await imageService.remove(imageId);
        dispatch(imageRemoved(imageId));
    } catch (error) {
        dispatch(imagesRequestFiled(error.message));
    }
};

export const getImages = () => (state) => state.images.entities;
export const getImagesLoadingStatus = () => (state) =>
    state.images.isLoading;
export const getImagesByIds = (imgId) => (state) => {
    if (state.images.entities) {
        return state.images.entities.find(
            (a) => String(a._id) === String(imgId)
        );
    };
};

export default imagesReducer;
