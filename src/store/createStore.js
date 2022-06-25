import articlesReducer from "./articles";
import userReducer from "./user";
import imagesReducer from "./images";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    user: userReducer,
    articles: articlesReducer,
    images: imagesReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
