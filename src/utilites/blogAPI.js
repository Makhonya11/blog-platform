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
    throw(err)
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
    throw(err)
  }
}

export const getCurrentUser = async (token) => {
  try {
    const response = await axios.get(
      `${_APIBASE}/user`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    return response.data.user
  } catch (err) {
    console.error(err)
  }
}

export const editProfile = async (userData, token) => {

  try {
    console.log(token)
    const response = await axios.put(
      `${_APIBASE}/user`,
      userData,
      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data.user
  } catch (err) {
    console.error(err)
    throw(err)
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
export const createArticle = async (article, token) => {
  try {
    const response = await axios.post(
      `${_APIBASE}/articles`,
    article, 
    {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      }
    }
    )
    console.log (response.data.article)
  } catch (err) {
    console.error(err)
  }
}

export const editeArticle = async (article, token) => {
  try {
    const response = await axios.put(
      `${_APIBASE}/articles`,
    article, 
    {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      }
    }
    )
    console.log (response.data.article)
  } catch (err) {
    console.error(err)
  }
}
export const deleteArticle = async (slug, token) => {
  try {
    axios.delete(
      `${_APIBASE}/articles/{slug}`,
    {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      }
    }
    )
  } catch (err) {
    console.error(err)
  }
}
export const addLike = async (slug, token) => {
  try {
    const response = axios.post(
      `${_APIBASE}/articles/{slug}/favorite`,
    {
      headers: {
        Authorization: `Token ${token}`,
      }
    }
    )
  } catch (err) {
    console.error(err)
  }
}
export const removeLike = async (slug, token) => {
  try {
    const response = axios.delete(
      `${_APIBASE}/articles/{slug}/favorite`,
    {
      headers: {
        Authorization: `Token ${token}`,
      }
    }
    )
    return response.data.article
  } catch (err) {
    console.error(err)
  }
}

