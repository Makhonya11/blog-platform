import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArticles, getArticle } from "../utilites/blogAPI";

export const fetchArticles = createAsyncThunk (
    'articles/fetchArticles',
    async(offset) => {
        const data = await getArticles(offset)
        return data
    }
)
export const fetchArticle = createAsyncThunk(
    'articles/fetchArticle', 
    async(slug) => {
        const data = await getArticle(slug)
        console.log(data.slug)
        return data
    }
)


const articlesSlice = createSlice (
    {
        name: 'articles',
        initialState: {
            isLoading:false,
            isError: false,
            list: [],
            total: null,
            currentArticle: null,
        },
        reducers: {
        },
        extraReducers: (builder) => {
            builder
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.isLoading = false
                state.list = action.payload.articles
                state.total = action.payload.articlesCount
                })
            .addCase(fetchArticle.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.currentArticle = action.payload
                    })
            .addMatcher(
                    (action) => action.type.endsWith('/pending'),
                        (state) => {
                          state.isLoading = true;
                        }
                      )
            .addMatcher(
                        (action) => action.type.endsWith('/rejected'),
                        (state, action) => {
                          state.isLoading = false;
                          state.isError = action.error.message;
                        }
                      )
        },
    }
   
)


export const articlesReducer = articlesSlice.reducer