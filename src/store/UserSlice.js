import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'
import { register, login, editProfile, getCurrentUser } from '../utilites/blogAPI'

export const registerUser = createAsyncThunk('user/registerUser', async (data, {rejectWithValue}) => {
  try {
    const userData = await register(data)
    localStorage.setItem('authToken', userData.token)
    return userData
  } catch (err) {
    console.log(err.response.data.errors)
    return rejectWithValue(err.response.data.errors)
  }
})
export const loginUser = createAsyncThunk('user/login', async (data, {rejectWithValue}) => {
  try {
    const userData = await login(data)

      localStorage.setItem('authToken', userData.token)
        return userData 

  } catch (err) {
    console.log(err.response.data.errors)
    return rejectWithValue(err.response.data.errors)
  } 
  })

  export const updateProfile = createAsyncThunk('user/updateProfile', 
    async({data, token}, {rejectWithValue}) => {
      try {
        const userData = await editProfile(data, token)
        return userData
      } catch (err) {
        return rejectWithValue(err.response.data.errors)
      }
    }
  )

  export const getUser = createAsyncThunk('user/getUser', async (token,) => {
    const userData = await getCurrentUser(token)
    console.log(userData)
    return userData
  })



const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged:false,
    currentUser: {},
    errors: {},
  },
  reducers: {
    logOut: (state) => {
        state.isLogged = !state.isLogged
        state.currentUser = {}
    },
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(updateProfile.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
      .addMatcher(
        isAnyOf (registerUser.fulfilled, loginUser.fulfilled, getUser.fulfilled ), 
        (state, action) => {
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
        (state, action) => {
          state.errors = action.payload
        }
      )
  },
})
export const {logOut} = userSlice.actions
export const userReducer = userSlice.reducer