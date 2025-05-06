import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { getArticles, getArticle, addLike, removeLike } from "../utilites/blogAPI";

export const fetchArticles = createAsyncThunk (
    'articles/fetchArticles',
    async({offset, token}) => {
        const data = await getArticles(offset, token)
        console.log(data)
        return data
    }
)
export const fetchArticle = createAsyncThunk(
    'articles/fetchArticle', 
    async({slug, token}) => {
        const data = await getArticle(slug, token)
        console.log(data)
        return data
    }
)

export const fetchAddLike = createAsyncThunk(
    'articles/fetchAddLike', 
    async({slug, token}) => {
        const data = await addLike(slug, token)
        console.log(data)
        return data
    }
)
export const fetchRemoveLike = createAsyncThunk(
    'articles/fetchRemoveLike', 
    async({slug, token}) => {
        const data = await addLike(slug, token)
        console.log(data)
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
            .addMatcher(
                isAnyOf(fetchArticle.fulfilled, fetchAddLike.fulfilled, fetchRemoveLike.fulfilled,) ,
                (state, action) => {
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