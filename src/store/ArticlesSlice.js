import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { getArticles, getArticle, likeSwitcher  } from "../utilites/blogAPI";

export const fetchArticles = createAsyncThunk (
    'articles/fetchArticles',
    async({ token, currentStartCount}) => {
        const data = await getArticles(token, currentStartCount )
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

export const fetchLikeSwitcher = createAsyncThunk(
    'articles/fetchLikeSwitcher', 
    async({slug, token, favorited}) => {
        const data = await likeSwitcher(slug, token, favorited)
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
                .addCase (fetchLikeSwitcher.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.currentArticle = action.payload
                    state.list = state.list.map(item => item.slug === action.payload.slug?action.payload: item)
                })
            .addMatcher(
                isAnyOf(fetchArticle.fulfilled, fetchLikeSwitcher.fulfilled) ,
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