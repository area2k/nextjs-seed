import Cookies from 'js-cookie'
import Router from 'next/router'

export const clearCookies = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
  Cookies.remove('quilttToken')
}

export const logout = () => {
  clearCookies()

  Router.push({ pathname: '/login', query: { to: Router.pathname } })
}
