import { configureStore } from '@reduxjs/toolkit'
import { articlesReducer } from './ArticlesSlice'
import { userReducer } from './UserSlice'

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
