export interface UserResponse {
  bio?: string
  email: string
  image?: string | null
  token: string
  username: string
}

export interface UserRequest {
  user: {
    bio: string
    email: string
    image: string | null
    username: string
    password: string
  }
}

export interface ArticleResponse {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: {
    bio: string
    image: string | null
    username: string
    following: false
  }
}

export interface ArticleRequest {
  title: string
  description: string
  body: string
  tagList: string[]
}

export interface ArticlesState {
  isLoading: boolean
  isError: boolean
  list: ArticleResponse[]
  total: number | null
  currentArticle: ArticleResponse | null
}

export interface UserState {
  userLoading: boolean
  isLogged: boolean
  currentUser: UserResponse | null
  errors: object | string
}

export interface Store {
  articles: ArticlesState
  user: UserState
}
