import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getArticles,
  getArticle,
  likeSwitcher,
  deleteArticle,
  editeArticle,
  createArticle,
} from '../utilites/articleAPI'
import { ArticleRequest, ArticleResponse, ArticlesState } from '../types/types'

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({
    token,
    currentStartCount,
  }: {
    token: string | null
    currentStartCount: number
  }): Promise<{ articles: ArticleResponse[]; articlesCount: number }> => {
    const data = await getArticles(token, currentStartCount)
    return data
  }
)
export const fetchArticle = createAsyncThunk(
  'articles/fetchArticle',
  async ({ slug, token }: { slug: string; token: string | null }): Promise<ArticleResponse> => {
    const data = await getArticle(slug, token)
    return data
  }
)

export const fetchLikeSwitcher = createAsyncThunk(
  'articles/fetchLikeSwitcher',
  async ({
    slug,
    token,
    favorited,
  }: {
    slug: string
    token: string | null
    favorited: boolean
  }): Promise<ArticleResponse> => {
    const data = await likeSwitcher(slug, token, favorited)
    return data
  }
)

export const fetchEditArticle = createAsyncThunk(
  'articles/fetchEditArticle',
  async ({
    newData,
    token,
    slug,
  }: {
    newData: { article: ArticleRequest | {} }
    token: string | null
    slug: string
  }): Promise<ArticleResponse> => {
    const data = await editeArticle(newData, token, slug)
    return data
  }
)

export const fetchDeleteArticle = createAsyncThunk(
  'articles/fetchDeleteArticle',
  async ({ slug, token }: { slug: string; token: string | null }): Promise<void> => {
    await deleteArticle(slug, token)
  }
)

export const fetchCreateArticle = createAsyncThunk(
  'articles/fetchCreateArticle',
  async ({
    article,
    token,
  }: {
    article: { article: ArticleRequest }
    token: string | null
  }): Promise<ArticleResponse> => {
    const data = await createArticle(article, token)
    return data
  }
)

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    isLoading: false,
    isError: false,
    list: [],
    total: null,
    currentArticle: null,
  } as ArticlesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload.articles
        state.total = action.payload.articlesCount
      })
      .addCase(fetchLikeSwitcher.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentArticle = action.payload
        state.list = state.list.map((item) => (item.slug === action.payload.slug ? action.payload : item))
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentArticle = action.payload
      })
      .addCase(fetchEditArticle.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentArticle = action.payload
      })
      .addCase(fetchDeleteArticle.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(fetchCreateArticle.fulfilled, (state) => {
        state.isLoading = false
      })
      .addMatcher(
        (action) => action.type.startsWith('articles/') && action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('articles/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false
        }
      )
  },
})

export const articlesReducer = articlesSlice.reducer
