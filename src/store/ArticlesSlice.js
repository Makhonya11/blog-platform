import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArticles } from "../utilites/blogAPI";

export const fetchArticles = createAsyncThunk (
    'articles/fetchArticles',
    async(_, {dispatch}) => {
        const data = await getArticles()
        dispatch(getArticleList(data.articles))
        console.log(data)
    }
)

const articlesSlice = createSlice (
    {
        name: 'articles',
        initialState: {
            list: [],
        },
        reducers: {
            getArticleList: (state, action)=> {state.list.push(...action.payload)},
        },
    }
   
)

const {getArticleList} = articlesSlice.actions
export const articlesReducer = articlesSlice.reducer