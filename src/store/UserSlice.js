import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { register, login } from '../utilites/blogAPI'

export const registerUser = createAsyncThunk('user/registerUser', async (data) => {
  const userData = await register(data)
  console.log(userData)
  return userData
})
export const loginUser = createAsyncThunk('user/login', async (data) => {
    const userData = await login(data)
    console.log(userData)
    return userData
  })

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged:false,
    currentUser: {},
  },
  reducers: {
    logOut: (state) => {
        state.isLogged = !state.isLogged
        state.currentUser = {}
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.currentUser = action.payload
        state.isLogged = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload
        state.isLogged = true
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          //state.isLoading = true
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state) => {
          //state.isLoading = true
        }
      )
  },
})
export const {logOut} = userSlice.actions
export const userReducer = userSlice.reducer