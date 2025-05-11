import { createSlice, createAsyncThunk, isAnyOf, PayloadAction } from '@reduxjs/toolkit'
import { register, login, editProfile, getCurrentUser } from '../utilites/userAPI.js'
import { UserRequest, UserResponse, UserState } from '../types/types.js'

import axios from 'axios'

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: { user: Partial<UserRequest> }, { rejectWithValue }): Promise<UserResponse | object> => {
    try {
      const userData = await register(data)
      localStorage.setItem('authToken', userData.token)
      return userData
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.errors)
      } else return rejectWithValue('Unexpected error')
    }
  }
)
export const loginUser = createAsyncThunk(
  'user/login',
  async (data: { user: Partial<UserRequest> }, { rejectWithValue }): Promise<UserResponse | object> => {
    try {
      const userData = await login(data)
      localStorage.setItem('authToken', userData.token)
      return userData
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.errors)
      } else return rejectWithValue('Unexpected error')
    }
  }
)

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (
    { data, token }: { data: { user: UserRequest | {} }; token: string },
    { rejectWithValue }
  ): Promise<UserResponse | object> => {
    try {
      const userData = await editProfile(data, token)
      return userData
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.errors)
      } else return rejectWithValue('Unexpected error')
    }
  }
)

export const getUser = createAsyncThunk(
  'user/getUser',
  async (token: string, { rejectWithValue }): Promise<UserResponse | object> => {
    try {
      const userData = await getCurrentUser(token)
      return userData
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.errors)
      } else return rejectWithValue('Unexpected error')
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userLoading: false,
    isLogged: false,
    currentUser: null,
    errors: {},
  } as UserState,
  reducers: {
    logOut: (state) => {
      state.isLogged = !state.isLogged
      state.currentUser = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.userLoading = false
        state.currentUser = action.payload
      })
      .addMatcher(isAnyOf(registerUser.fulfilled, loginUser.fulfilled, getUser.fulfilled), (state, action) => {
        state.userLoading = false
        state.currentUser = action.payload
        state.isLogged = true
      })

      .addMatcher(
        (action) => action.type.startsWith('user/') && action.type.endsWith('/pending'),
        (state) => {
          state.userLoading = true
        }
      )
      .addMatcher(
        (action): action is PayloadAction<string> =>
          action.type.startsWith('user/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.userLoading = false
          state.errors = action.payload
        }
      )
  },
})
export const { logOut } = userSlice.actions
export const userReducer = userSlice.reducer
