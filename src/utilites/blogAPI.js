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


export const getArticles = async (token, offset=0) => {
  console.log(token)
  const headers = await token
  ? {
    headers: {
      Authorization: `Token ${token}`,
    },
  }
  :{}
  try {
     const response = await axios.get(
       `${_APIBASE}/articles?limit=5&offset=${offset}`,
       headers
       )
     return response.data
  } catch (err) {
    console.error(err)
  }
}

export const getArticle = async (slug, token) => {
  console.log(token)
  const headers = await token
  ? {
    headers: {
      Authorization: `Token ${token}`,
    },
  }
  :{}
  try {
    const response = await axios.get(`${_APIBASE}/articles/${slug}`,
    headers
    )
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
    await axios.delete(
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
export const likeSwitcher = async (slug, token, isLiked) => {
  console.log(slug)
  const config =  {
    headers: {
      Authorization: `Token ${token}`,
    }
  }

  try {
    if (!isLiked) {
      const response = await axios.post(
        `${_APIBASE}/articles/${slug}/favorite`,
        null,
     config
      )
      return response.data.article
    } else {
      const response = await axios.delete(
        `${_APIBASE}/articles/${slug}/favorite`,
      config
      )
      return response.data.article
    }
    //console.log(response.data.article)
  } catch (err) {
    console.error(err)
  }
}


