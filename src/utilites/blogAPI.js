import axios from "axios"

const _APIBASE = 'https://blog-platform.kata.academy/api'

export const register = async (userData) => {
  try {
    const response = await axios.post(
      `${_APIBASE}/users`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data.user
  } catch (err) {
    console.error(err)
  }
}

export const login = async (userData) => {
  try {
    const response = await axios.post(
      `${_APIBASE}/users/login`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data.user
  } catch (err) {
    console.error(err)
  }
}

const editProfile = async (userData, API_KEY) => {
  try {
    const response = await axios.post(
      `_APIBASE/user`,
      {
        userData,
      },
      {
        headers: {
          Authorization: API_KEY,
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data.user
  } catch (err) {
    console.error(err)
  }
}

export const getArticles = async (offset=0) => {
  try {
     const response = await axios.get(`${_APIBASE}/articles?limit=5&offset=${offset}`)
     return response.data
  } catch (err) {
    console.error(err)
  }
}

export const getArticle = async (slug) => {
  try {
    const response = await axios.get(`${_APIBASE}/articles/${slug}`)
    return response.data.article
  } catch (err) {
    console.error(err)
  }
}
