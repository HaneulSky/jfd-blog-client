import articlesReducer from "./articles";
import userReducer from "./user";
import imagesReducer from "./images";
import commentsReducer from "./comments";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    user: userReducer,
    articles: articlesReducer,
    images: imagesReducer,
    comments: commentsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
