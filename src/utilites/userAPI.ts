import axios from 'axios'
import { config, _APIBASE, auth } from './articleAPI'
import { UserResponse, UserRequest } from '../types/types'

export const register = async (userData: { user: Partial<UserRequest> }): Promise<UserResponse> => {
  try {
    const response = await axios.post(`${_APIBASE}/users`, userData, config)
    return response.data.user
  } catch (err) {
    throw err
  }
}

export const login = async (userData: { user: Partial<UserRequest> }): Promise<UserResponse> => {
  try {
    const response = await axios.post(`${_APIBASE}/users/login`, userData, config)
    return response.data.user
  } catch (err) {
    throw err
  }
}

export const getCurrentUser = async (token: string): Promise<UserResponse> => {
  try {
    const response = await axios.get(`${_APIBASE}/user`, auth(token))
    return response.data.user
  } catch (err) {
    throw err
  }
}

export const editProfile = async (userData, token: string): Promise<UserResponse> => {
  try {
    const response = await axios.put(`${_APIBASE}/user`, userData, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data.user
  } catch (err) {
    throw err
  }
}
