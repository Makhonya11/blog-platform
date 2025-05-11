import axios from 'axios'
import { ArticleRequest, ArticleResponse } from '../types/types'
export const _APIBASE = 'https://blog-platform.kata.academy/api'
export const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const auth = (token: string | null): object => {
  return {
    headers: {
      Authorization: `Token ${token}`,
    },
  }
}

export const getArticles = async (
  token: string | null,
  offset = 0
): Promise<{ articles: ArticleResponse[]; articlesCount: number }> => {
  const headers = (await token) ? auth(token) : {}
  try {
    const response = await axios.get(`${_APIBASE}/articles?limit=5&offset=${offset}`, headers)
    return response.data
  } catch (err) {
    throw err
  }
}

export const getArticle = async (slug: string, token: string | null): Promise<ArticleResponse> => {
  const headers = (await token) ? auth(token) : {}
  try {
    const response = await axios.get(`${_APIBASE}/articles/${slug}`, headers)
    return response.data.article
  } catch (err) {
    throw err
  }
}
export const createArticle = async (
  article: { article: ArticleRequest },
  token: string | null
): Promise<ArticleResponse> => {
  try {
    const response = await axios.post(`${_APIBASE}/articles`, article, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data.article
  } catch (err) {
    throw err
  }
}

export const editeArticle = async (
  article: { article: ArticleRequest | {} },
  token: string | null,
  slug: string
): Promise<ArticleResponse> => {
  try {
    const response = await axios.put(`${_APIBASE}/articles/${slug}`, article, auth(token))
    return response.data.article
  } catch (err) {
    throw err
  }
}
export const deleteArticle = async (slug: string, token: string | null): Promise<void> => {
  try {
    await axios.delete(`${_APIBASE}/articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    throw err
  }
}
export const likeSwitcher = async (slug: string, token: string | null, isLiked: boolean): Promise<ArticleResponse> => {
  try {
    if (!isLiked) {
      const response = await axios.post(`${_APIBASE}/articles/${slug}/favorite`, null, auth(token))
      return response.data.article
    } else {
      const response = await axios.delete(`${_APIBASE}/articles/${slug}/favorite`, auth(token))
      return response.data.article
    }
  } catch (err) {
    throw err
  }
}
