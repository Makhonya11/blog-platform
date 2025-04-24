import { configureStore } from "@reduxjs/toolkit";
import { articlesReducer } from "./ArticlesSlice";

const store = configureStore ({
    reducer: {
        articles:articlesReducer,
    },

})

export default store